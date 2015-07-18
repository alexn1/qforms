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
        if (application.authentication() && !(req.session.username && req.session.username[route])) {
            login(req, res, next, application);
        } else {
            index(req, res, next, application);
        }
    }
    if (req.method === 'POST') {
        if (req.body.action === 'login') {
            login(req, res, next, application);
        } else {
            if (application.authentication() && !(req.session.username && req.session.username[route])) {
                throw new Error('not authorized');
            } else {
                var actions = [
                    'page',
                    'update',
                    'insert',
                    'frame',
                    '_delete',
                    '_call',
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
        application.authenticate(req.body.username, req.body.password, function(authenticate) {
            if (authenticate) {
                if (!req.session.username) {
                    req.session.username = {};
                }
                req.session.username[route] = req.body.username;
                res.redirect(req.url);
            } else {
                var args = {
                    querytime : {
                        params : {}
                    }
                };
                if (req.session.username && req.session.username[route]) {
                    args.querytime.params['@username'] = req.session.username[route];
                }
                application.getUsers(function(users) {
                    res.render('viewer/login', {
                        version       : req.app.get('version'),
                        caption       : application.data['@attributes'].caption,
                        commonStyleCss: req.app.get('commonStyleCss'),
                        REQUEST_URI   : req.url,
                        errMsg        : 'Wrong username or password',
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
    if (req.session.username && req.session.username[route]) {
        delete req.session.username[route];
    }
    res.json(null);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function index(req, res, next, application) {
    var route = [req.params.appDirName, req.params.appFileName].join('/');
    var args = {
        params   : {},
        querytime: {
            params: {}
        }
    };
    if (req.session.username && req.session.username[route]) {
        args.querytime.params['@username'] = req.session.username[route];
    }
    application.fill(args, function(data) {
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
            data          : data
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function page(req, res, next, application) {
    var route = [req.params.appDirName, req.params.appFileName].join('/');
    application.getPage(req.body.page, function(page) {
        var args = {
            params   : req.body.params,
            newMode  : req.body.newMode,
            querytime: {
                params: {}
            }
        };
        if (req.session.username && req.session.username[route]) {
            args.querytime.params['@username'] = req.session.username[route];
        }
        page.fill(args, function(data) {
            res.json({
                data: data
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function update(req, res, next, application) {
    var route = [req.params.appDirName, req.params.appFileName].join('/');
    var args = {
        row   : req.body.row,
        params: {},
        querytime : {
            params : {}
        }
    };
    if (req.session.username && req.session.username[route]) {
        args.querytime.params['@username'] = req.session.username[route];
    }
    application.getPage(req.body.page, function(page) {

        var ds = page.forms[req.body.form].dataSources[req.body.ds];
        console.log('data source class:');
        console.log(ds.constructor.name);

        page.forms[req.body.form].dataSources[req.body.ds].update(args, function() {
            res.json(null);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function frame(req, res, next, application) {
    var route = [req.params.appDirName, req.params.appFileName].join('/');
    var args = {
        params   : req.body.params,
        querytime: {
            params: {}
        }
    };
    if (req.session.username && req.session.username[route]) {
        args.querytime.params['@username'] = req.session.username[route];
    }
    var getDataSource = function(callback) {
        if (req.body.page) {
            application.getPage(req.body.page, function(page) {
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
        dataSource.frame(args, function(response) {
            res.json(response);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function insert(req, res, next, application) {
    var route = [req.params.appDirName, req.params.appFileName].join('/');
    var args = {
        row   : req.body.row,
        params: {},
        querytime : {
            params : {}
        }
    };
    if (req.session.username && req.session.username[route]) {
        args.querytime.params['@username'] = req.session.username[route];
    }
    application.getPage(req.body.page, function(page) {
        page.forms[req.body.form].dataSources[req.body.ds].insert(args, function(key) {
            res.json({
                key: key
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function _delete(req, res, next, application) {
    var route = [req.params.appDirName, req.params.appFileName].join('/');
    var args = {
        row   : req.body.row,
        params: {},
        querytime : {
            params : {}
        }
    };
    if (req.session.username && req.session.username[route]) {
        args.querytime.params['@username'] = req.session.username[route];
    }
    application.getPage(req.body.page, function(page) {
        page.forms[req.body.form].dataSources[req.body.ds].delete(args, function() {
            res.json(null);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function _call(req, res, next, application) {
    application.getPage(req.body.page, function(page) {
        page._call({
            req   : req,
            res   : res,
            params: req.body.params
        });
    });
};