'use strict';

module.exports = HostApp;

var path    = require('path');
var fs      = require('fs');
var util    = require('util');
var domain  = require('domain');
var Promise = require('bluebird');

var qforms  = require('../../../qforms');

var ACTIONS = [
    'page',
    'update',
    'insert',
    'frame',
    '_delete',
    'rpc',
    'logout'
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function HostApp(options) {
    var self = this;
    self.options     = options || {};
    self.route       = null;
    self.application = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype.actionViewer = function (req, res, next) {
    var self = this;
    console.log('HostApp.prototype.actionViewer');
    if (req.params.appDirName && req.params.appFileName) {
        Promise.try(function () {
            var applications = req.app.get('applications');
            var route = [req.params.appDirName, req.params.appFileName].join('/');
            if (applications[route]) {
                if (req.query.debug === '1' && req.method === 'GET') {
                    return applications[route].deinit2().then(function () {
                        return self.createApplication2(req, res).then(function (application) {
                            return applications[route] = application;
                        });
                    });
                } else {
                    return applications[route];
                }
            } else {
                return self.createApplication2(req, res).then(function (application) {
                    return applications[route] = application;
                });
            }
        }).then(function (application) {
            self.application = application;
            self.handle(req, res, next, application);
        });
    } else {
        next();
    }
};

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype.createApplication  = function (req, res, next, route) {
    var self = this;
    console.log('HostApp.prototype.createApplication', route);
    var applications = req.app.get('applications');
    var appFilePath = path.join(req.app.get('appsDirPath'), req.params.appDirName, req.params.appFileName + '.json');


    //var d = domain.create();
    //if (req.app.get('handleException') === true) {
    //    d.on('error', next);
    //}

    //d.run(function() {
        qforms.ApplicationController.create2(appFilePath).then(function (application) {
            return application.init2().then(function () {
                applications[route] = application;
                self.handle(req, res, next, application);
            });
        });
    //});
};
*/

////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype.createApplication2  = function (req, res) {
    var self = this;
    console.log('HostApp.prototype.createApplication2', req.params.appDirName, req.params.appFileName);
    var applications = req.app.get('applications');
    var appFilePath = path.join(req.app.get('appsDirPath'), req.params.appDirName, req.params.appFileName + '.json');
    return qforms.ApplicationController.create2(appFilePath).then(function (application) {
        return application.init2().then(function () {
            return application;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype.handle = function (req, res, next, application) {
    var self = this;
    //console.log('HostApp.prototype.handle', req.method);
    var route = [req.params.appDirName, req.params.appFileName].join('/');
    if (req.method === 'GET') {
        if (application.authentication() && !(req.session.user && req.session.user[route])) {
            self.login(req, res, next, application);
        } else {
            self.index(req, res, next, application);
        }
    }
    if (req.method === 'POST') {
        if (req.body.action === 'login') {
            self.login(req, res, next, application);
        } else {
            if (application.authentication() && !(req.session.user && req.session.user[route])) {
                res.status(500);
                res.end('not authenticated');
            } else {
                if (ACTIONS.indexOf(req.body.action) !== -1) {
                    eval('self.{action}(req, res, next, application)'.replace('{action}', req.body.action));
                } else {
                    throw new Error('unknown action: ' + req.body.action);
                }
            }
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype.login = function (req, res, next, application) {
    var self = this;
    console.log('HostApp.prototype.login');
    var route = [req.params.appDirName, req.params.appFileName].join('/');
    var context = application.createContext({
        req: req
    });
    if (req.method === 'GET') {
        application.getUsers2(context).then(function (users) {
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
        application.authenticate2(context, req.body.username, req.body.password).then(function (authenticate, user) {
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
                application.getUsers2(context).then(function (users) {
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype.logout = function (req, res, next, application) {
    var self = this;
    console.log('HostApp.prototype.logout');
    var route = [req.params.appDirName, req.params.appFileName].join('/');
    if (req.session.user && req.session.user[route]) {
        delete req.session.user[route];
    }
    res.json(null);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype.index = function (req, res, next, application) {
    var self = this;
    console.log('HostApp.prototype.index', application.name);
    var context = application.createContext({
        req: req
    });
    application.fill2(context).then(function (response) {
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype.page = function (req, res, next, application) {
    var self = this;
    console.log('HostApp.prototype.page', req.body.page);
    var context = application.createContext({
        req           : req,
        params        : req.body.params,
        newMode       : req.body.newMode,
        parentPageName: req.body.parentPageName
    });
    application.getPage2(context, req.body.page).then(function (page) {
        return page.fill2(context).then(function (data) {
            application.destroyContext(context);
            res.json({
                data: data
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype.update = function (req, res, next, application) {
    var self = this;
    console.log('HostApp.prototype.update', req.body.page);
    var context = application.createContext({
        req           : req,
        row           : req.body.row,
        parentPageName: req.body.parentPageName
    });
    application.getPage2(context, req.body.page).then(function (page) {
        var dataSource = page.forms[req.body.form].dataSources[req.body.ds];
        return dataSource.database.getConnection2(context).then(function (cnn) {
            cnn.beginTransaction(function(err) {
                if (err) {
                    throw err;
                }
                try {
                    dataSource.update2(context).then(function () {
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype.frame = function (req, res, next, application) {
    var self = this;
    console.log('HostApp.prototype.frame', req.body.page);
    var context = application.createContext({
        req           : req,
        parentPageName: req.body.parentPageName,
        params        : req.body.params
    });
    Promise.try(function () {
        if (req.body.page) {
            return application.getPage2(context, req.body.page).then(function (page) {
                if (req.body.form) {
                    return page.forms[req.body.form].dataSources[req.body.ds];
                } else {
                    return page.dataSources[req.body.ds];
                }
            });
        } else {
            return application.dataSources[req.body.ds];
        }
    }).then(function (dataSource) {
        return dataSource.frame2(context).then(function (response) {
            application.destroyContext(context);
            res.json(response);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype.insert = function (req, res, next, application) {
    var self = this;
    console.log('HostApp.prototype.insert', req.body.page);
    var context = application.createContext({
        req           : req,
        row           : req.body.row,
        parentPageName: req.body.parentPageName
    });
    application.getPage2(context, req.body.page).then(function (page) {
        var dataSource = page.forms[req.body.form].dataSources[req.body.ds];
        return dataSource.database.getConnection2(context).then(function(cnn) {
            cnn.beginTransaction(function(err) {
                if (err) {
                    throw err;
                }
                try {
                    dataSource.insert2(context).then(function (key) {
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype._delete = function (req, res, next, application) {
    var self = this;
    console.log('HostApp.prototype._delete', req.body.page);
    var context = application.createContext({
        req           : req,
        row           : req.body.row,
        parentPageName: req.body.parentPageName
    });
    application.getPage2(context, req.body.page).then(function (page) {
        var dataSource = page.forms[req.body.form].dataSources[req.body.ds];
        return dataSource.database.getConnection2(context).then(function (cnn) {
            cnn.beginTransaction(function(err) {
                if (err) {
                    throw err;
                }
                try {
                    dataSource.delete2(context).then(function () {
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype.rpc = function (req, res, next, application) {
    var self = this;
    console.log('HostApp.prototype.rpc', req.body.page);
    var context = application.createContext({
        req      : req,
        res      : res,
        params   : req.body.params
    });
    application.getPage2(context, req.body.page).then(function (page) {
        page.rpc(context);
    });
};