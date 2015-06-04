"use strict"

var path   = require('path');
var fs     = require('fs');
var util   = require('util');
var domain = require('domain');

var app         = require('../../qforms');
var helper      = require('../../common/helper');
var Application = require('../../viewer/Model/Application/Application');

app.set('viewerClassCss', helper.getFilePathsSync(path.join(app.get('public')), 'viewer/class', 'css'));
app.set('viewerClassJs' , helper.getFilePathsSync(path.join(app.get('public')), 'viewer/class', 'js'));

////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function(req, res, next) {
    //console.log(util.inspect(req,{depth:0}));
    if (req.params.appDirName && req.params.appFileName) {
        var applications = req.app.get('applications');
        var route = req.params.appDirName + '/' + req.params.appFileName;
        if (req.query.debug !== '1' && applications[route]) {
            console.log('old app: ' + route);
            var d = domain.create();
            d.on('error', next);
            d.run(function() {
                handle(req, res, next, applications[route]);
            });
        } else {
            console.log('new app: ' + route);
            var appFilePath = path.join(req.app.get('appsDirPath'), req.params.appDirName, req.params.appFileName + '.json');
            fs.exists(appFilePath, function(exists) {
                if (exists) {
                    helper.getAppInfo(appFilePath, function(appInfo) {
                        fs.readFile(appInfo.filePath, 'utf8', function(err, content) {
                            if (err) {
                                throw err;
                            } else {
                                var appData = JSON.parse(content);
                                Application.create(appData, appInfo, function(application) {
                                    application.init(function() {
                                        applications[route] = application;
                                        var d = domain.create();
                                        d.on('error', next);
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
        }
    } else {
        next();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function handle(req, res, next, application) {
    if (req.method === 'GET') {
        if (application.authentication() && !req.session.username) {
            login(req, res, next, application);
        } else {
            index(req, res, next, application);
        }
    }
    if (req.method === 'POST') {
        if (req.body.action === 'login') {
            login(req, res, next, application);
        } else {
            if (application.authentication() && !req.session.username) {
                throw new Error('not authorized');
            } else {
                eval('{action}(req, res, next, application)'.replace('{action}', req.body.action));
            }
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function login(req, res, next, application) {
    if (req.method === 'GET') {
        application.fill(null, null, function(data) {
            res.render('viewer/login', {
                version       : req.app.get('version'),
                caption       : application.data['@attributes'].caption,
                commonStyleCss: req.app.get('commonStyleCss'),
                REQUEST_URI   : req.url,
                errMsg        : null,
                username      : null
            });
        });
    }
    if (req.method === 'POST') {
        application.authenticate(req.body.username, req.body.password, function(authenticate) {
            if (authenticate) {
                req.session.username = req.body.username;
                res.redirect(req.path);
            } else {
                application.fill(null, null, function(data) {
                    res.render('viewer/login', {
                        version       : req.app.get('version'),
                        caption       : application.data['@attributes'].caption,
                        commonStyleCss: req.app.get('commonStyleCss'),
                        REQUEST_URI   : req.url,
                        errMsg        : 'Wrong username or password',
                        username      : req.body.username
                    });
                });
            }
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function index(req, res, next, application) {
    application.fill(null, null, function(data) {
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
    application.getPage(req.body.page, function(page) {
        page.fill(req.body.params, req.body.newMode, function(data) {
            res.json({
                data:data
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function update(req, res, next, application) {
    application.getPage(req.body.page, function(page) {
        page.forms[req.body.form].dataSources[req.body.ds].update(req.body.row, function() {
            res.json(null);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function refill(req, res, next, application) {
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
        dataSource.refill(req.body.params, function(response) {
            res.json(response.rows);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function insert(req, res, next, application) {
    application.getPage(req.body.page, function(page) {
        page.forms[req.body.form].dataSources[req.body.ds].insert(req.body.row, function(key) {
            res.json({
                key:key
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function _delete(req, res, next, application) {
    application.getPage(req.body.page, function(page) {
        page.forms[req.body.form].dataSources[req.body.ds].delete(req.body.row, function() {
            res.json(null);
        });
    });
};