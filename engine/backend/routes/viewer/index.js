'use strict';

var path   = require('path');
var fs     = require('fs');
var util   = require('util');
var domain = require('domain');
var config = require('config');

var qforms                = require('../../qforms');
var helper                = require('../../common/helper');
var ApplicationController = require('../../viewer/ModelController/ApplicationController/ApplicationController');

qforms.set('viewerClassCss', helper.getFilePathsSync(path.join(qforms.get('public')), 'viewer/class', 'css'));
qforms.set('viewerClassJs' , helper.getFilePathsSync(path.join(qforms.get('public')), 'viewer/class', 'js'));

////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function(req, res, next) {
    //console.log(util.inspect(req,{depth:0}));
    if (req.params.appDirName && req.params.appFileName) {
        var applications = req.app.get('applications');
        var route = [req.params.appDirName, req.params.appFileName].join('/');
        if (applications[route]) {
            if (req.query.debug === '1' && req.method === 'GET') {
                applications[route].deinit(function() {
                    createApplication(req, res, next, route);
                });
            } else {
                //console.log('old app: ' + route);
                var d = domain.create();
                if (qforms.get('handleException') === 'true') {
                    d.on('error', next);
                }
                d.run(function() {
                    handle(req, res, next, applications[route]);
                });
            }
        } else {
            createApplication(req, res, next, route);
        }
    } else {
        next();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function createApplication(req, res, next, route) {
    //console.log('new app: ' + route);
    var applications = req.app.get('applications');
    var appFilePath = path.join(req.app.get('appsDirPath'), req.params.appDirName, req.params.appFileName + '.json');
    fs.exists(appFilePath, function(exists) {
        if (exists) {
            helper.getAppInfo(appFilePath, function(appInfo) {
                fs.readFile(appInfo.filePath, 'utf8', function(err, content) {
                    if (err) {
                        throw err;
                    } else {
                        var appData = JSON.parse(content);
                        ApplicationController.create(appData, appInfo, function(application) {
                            application.init(function() {
                                applications[route] = application;
                                var d = domain.create();
                                if (qforms.get('handleException') === 'true') {
                                    d.on('error', next);
                                }
                                d.run(function() {
                                    handle(req, res, next, application);
                                });
                            });
                        });
                    }
                });
            });
        } else {
            next();
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function handle(req, res, next, application) {
    var route = [req.params.appDirName, req.params.appFileName].join('/');
    if (req.method === 'GET') {
        if (application.authentication() && !(req.session.user && req.session.user[route])) {
            login(req, res, next, application);
        } else {
            index(req, res, next, application);
        }
    }
    if (req.method === 'POST') {
        if (req.body.action === 'login') {
            login(req, res, next, application);
        } else {
            if (application.authentication() && !(req.session.user && req.session.user[route])) {
                res.status(500);
                res.end('not authenticated');
            } else {
                var actions = [
                    'page',
                    'update',
                    'insert',
                    'frame',
                    '_delete',
                    'rpc',
                    'logout'
                ];
                if (actions.indexOf(req.body.action) !== -1) {
                    eval('{action}(req, res, next, application)'.replace('{action}', req.body.action));
                } else {
                    throw new Error('unknown action: ' + req.body.action);
                }
            }
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function login(req, res, next, application) {
    var route = [req.params.appDirName, req.params.appFileName].join('/');
    if (req.method === 'GET') {
        application.getUsers(function(users) {
            res.render('viewer/login', {
                version       : req.app.get('version'),
                application   : application,
                caption       : application.data['@attributes'].caption,
                commonStyleCss: req.app.get('commonStyleCss'),
                REQUEST_URI   : req.url,
                errMsg        : null,
                username      : null,
                users         : users
            });
        });
    }
    if (req.method === 'POST') {
        application.authenticate(req.body.username, req.body.password, function(authenticate, user) {
            if (authenticate) {
                if (!req.session.user) {
                    req.session.user = {};
                }
                if (user) {
                    req.session.user[route] = user;
                } else {
                    req.session.user[route] = {name: req.body.username};
                }
                res.redirect(req.url);
            } else {
                application.getUsers(function(users) {
                    res.render('viewer/login', {
                        version       : req.app.get('version'),
                        application   : application,
                        caption       : application.data['@attributes'].caption,
                        commonStyleCss: req.app.get('commonStyleCss'),
                        REQUEST_URI   : req.url,
                        errMsg        : application.text.login.WrongUsernameOrPassword,
                        username      : req.body.username,
                        users         : users
                    });
                });
            }
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function logout(req, res, next, application) {
    var route = [req.params.appDirName, req.params.appFileName].join('/');
    if (req.session.user && req.session.user[route]) {
        delete req.session.user[route];
    }
    res.json(null);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function createContext(req, context) {
    if (context === undefined) {
        context = {};
    }
    if (context.params === undefined) {
        context.params = {};
    }
    if (context.querytime === undefined) {
        context.querytime = {};
    }
    if (context.querytime.params === undefined) {
        context.querytime.params = {};
    }
    var route = [req.params.appDirName, req.params.appFileName].join('/');
    if (req.session.user && req.session.user[route]) {
        context.user = req.session.user[route];
    }
    return context;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function index(req, res, next, application) {
    var context = createContext(req);
    application.fill(context, function(response) {
        res.render('viewer/view', {
            version       : req.app.get('version'),
            debug         : req.query.debug,
            commonStyleCss: req.app.get('commonStyleCss'),
            commonClassCss: req.app.get('commonClassCss'),
            commonClassJs : req.app.get('commonClassJs'),
            viewerClassCss: req.app.get('viewerClassCss'),
            viewerClassJs : req.app.get('viewerClassJs'),
            links         : application.css,
            caption       : application.data['@attributes'].caption,
            data          : response
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function page(req, res, next, application) {
    var context = createContext(req, {
        params        : req.body.params,
        newMode       : req.body.newMode,
        parentPageName: req.body.parentPageName
    });
    application.getPage(context, req.body.page, function(page) {
        page.fill(context, function(data) {
            res.json({
                data: data
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function update(req, res, next, application) {
    var context = createContext(req, {
        row           : req.body.row,
        parentPageName: req.body.parentPageName
    });
    application.getPage(context, req.body.page, function(page) {
        page.forms[req.body.form].dataSources[req.body.ds].update(context, function() {
            res.json(null);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function frame(req, res, next, application) {
    var context = createContext(req, {
        parentPageName: req.body.parentPageName,
        params        : req.body.params
    });
    var getDataSource = function(callback) {
        if (req.body.page) {
            application.getPage(context, req.body.page, function(page) {
                if (req.body.form) {
                    callback(page.forms[req.body.form].dataSources[req.body.ds]);
                } else {
                    callback(page.dataSources[req.body.ds]);
                }
            });
        } else {
            callback(application.dataSources[req.body.ds]);
        }
    };
    getDataSource(function(dataSource) {
        dataSource.frame(context, function(response) {
            res.json(response);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function insert(req, res, next, application) {
    var context = createContext(req, {
        row           : req.body.row,
        parentPageName: req.body.parentPageName
    });
    application.getPage(context, req.body.page, function(page) {
        page.forms[req.body.form].dataSources[req.body.ds].insert(context, function(key) {
            res.json({
                key: key
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function _delete(req, res, next, application) {
    var context = createContext(req, {
        row           : req.body.row,
        parentPageName: req.body.parentPageName
    });
    application.getPage(context, req.body.page, function(page) {
        page.forms[req.body.form].dataSources[req.body.ds].delete(context, function() {
            res.json(null);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function rpc(req, res, next, application) {
    var context = createContext(req, {
        params   : req.body.params,
        req      : req,
        res      : res
    });
    application.getPage(context, req.body.page, function(page) {
        page.rpc(context);
    });
};