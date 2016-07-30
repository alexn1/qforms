'use strict';

var path   = require('path');
var fs     = require('fs');
var util   = require('util');
var domain = require('domain');

var qforms = require('../../../qforms');
var server = require('../../../server');

////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function(req, res, next) {
    //console.log(util.inspect(req,{depth:0}));
    console.log('viewer.index');
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
                if (server.get('handleException') === true) {
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
    console.log('createApplication: ' + route);
    var applications = req.app.get('applications');
    var appFilePath = path.join(req.app.get('appsDirPath'), req.params.appDirName, req.params.appFileName + '.json');

    var d = domain.create();
    if (server.get('handleException') === true) {
        d.on('error', next);
    }
    d.run(function() {
        qforms.ApplicationController.create(appFilePath, function(application) {
            application.init(function() {
                applications[route] = application;
                handle(req, res, next, application);
            });
        });
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function handle(req, res, next, application) {
    console.log('handle: ', req.method);
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
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function login(req, res, next, application) {
    console.log('login');
    var route = [req.params.appDirName, req.params.appFileName].join('/');
    var context = application.createContext({
        req: req
    });
    if (req.method === 'GET') {
        application.getUsers(context, function(users) {
            application.destroyContext(context);
            res.render('viewer/login', {
                version       : req.app.get('version'),
                application   : application,
                caption       : application.data['@attributes'].caption,
                REQUEST_URI   : req.url,
                errMsg        : null,
                username      : null,
                users         : users
            });
        });
    }
    if (req.method === 'POST') {
        application.authenticate(context, req.body.username, req.body.password, function(authenticate, user) {
            if (authenticate) {
                if (req.session.user === undefined) {
                    req.session.user = {};
                }
                if (user) {
                    req.session.user[route] = user;
                } else {
                    req.session.user[route] = {
                        name: req.body.username
                    };
                }
                application.destroyContext(context);
                res.redirect(req.url);
            } else {
                application.getUsers(context, function(users) {
                    application.destroyContext(context);
                    res.render('viewer/login', {
                        version       : req.app.get('version'),
                        application   : application,
                        caption       : application.data['@attributes'].caption,
                        REQUEST_URI   : req.url,
                        errMsg        : application.text.login.WrongUsernameOrPassword,
                        username      : req.body.username,
                        users         : users
                    });
                });
            }
        });
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function logout(req, res, next, application) {
    console.log('logout');
    var route = [req.params.appDirName, req.params.appFileName].join('/');
    if (req.session.user && req.session.user[route]) {
        delete req.session.user[route];
    }
    res.json(null);
}


////////////////////////////////////////////////////////////////////////////////////////////////////
function index(req, res, next, application) {
    console.log('index');
    var context = application.createContext({
        req: req
    });
    application.fill(context, function(response) {
        application.destroyContext(context);
        res.render('viewer/view', {
            version       : req.app.get('version'),
            debugApp      : req.query.debug,
            commonClassCss: req.app.get('commonClassCss'),
            commonClassJs : req.app.get('commonClassJs'),
            viewerClassCss: req.app.get('viewerClassCss'),
            viewerClassJs : req.app.get('viewerClassJs'),
            links         : application.css,
            caption       : application.data['@attributes'].caption,
            data          : response
        });
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function page(req, res, next, application) {
    console.log('page');
    var context = application.createContext({
        req           : req,
        params        : req.body.params,
        newMode       : req.body.newMode,
        parentPageName: req.body.parentPageName
    });
    application.getPage(context, req.body.page, function(page) {
        page.fill(context, function(data) {
            application.destroyContext(context);
            res.json({
                data: data
            });
        });
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function update(req, res, next, application) {
    console.log('update');
    var context = application.createContext({
        req           : req,
        row           : req.body.row,
        parentPageName: req.body.parentPageName
    });
    application.getPage(context, req.body.page, function(page) {
        var dataSource = page.forms[req.body.form].dataSources[req.body.ds];
        dataSource.database.getConnection(context, function(cnn) {
            cnn.beginTransaction(function(err) {
                if (err) {
                    throw err;
                }
                try {
                    dataSource.update(context, function() {
                        cnn.commit(function(err) {
                            if (err) {
                                throw err;
                            }
                            application.destroyContext(context);
                            res.json(null);
                        });
                    });
                } catch(err) {
                    cnn.rollback(function() {
                        throw err;
                    });
                }
            });
        });
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function frame(req, res, next, application) {
    console.log('frame');
    var context = application.createContext({
        req           : req,
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
            application.destroyContext(context);
            res.json(response);
        });
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function insert(req, res, next, application) {
    console.log('insert');
    var context = application.createContext({
        req           : req,
        row           : req.body.row,
        parentPageName: req.body.parentPageName
    });
    application.getPage(context, req.body.page, function(page) {
        var dataSource = page.forms[req.body.form].dataSources[req.body.ds];
        dataSource.database.getConnection(context, function(cnn) {
            cnn.beginTransaction(function(err) {
                if (err) {
                    throw err;
                }
                try {
                    dataSource.insert(context, function(key) {
                        cnn.commit(function() {
                            if (err) {
                                throw err;
                            }
                            application.destroyContext(context);
                            res.json({
                                key: key
                            });
                        });
                    });
                } catch(err) {
                    cnn.rollback(function() {
                        throw err;
                    });
                }
            });
        });
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function _delete(req, res, next, application) {
    console.log('_delete');
    var context = application.createContext({
        req           : req,
        row           : req.body.row,
        parentPageName: req.body.parentPageName
    });
    application.getPage(context, req.body.page, function(page) {
        var dataSource = page.forms[req.body.form].dataSources[req.body.ds];
        dataSource.database.getConnection(context, function(cnn) {
            cnn.beginTransaction(function(err) {
                if (err) {
                    throw err;
                }
                try {
                    dataSource.delete(context, function() {
                        cnn.commit(function(err) {
                            if (err) {
                                throw err;
                            }
                            application.destroyContext(context);
                            res.json(null);
                        });
                    });
                } catch (err) {
                    cnn.rollback(function() {
                        throw err;
                    });
                }
            });
        });
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function rpc(req, res, next, application) {
    console.log('rpc');
    var context = application.createContext({
        req      : req,
        res      : res,
        params   : req.body.params
    });
    application.getPage(context, req.body.page, function(page) {
        page.rpc(context);
    });
}