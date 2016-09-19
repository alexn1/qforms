'use strict';

module.exports = HostApp;

var path    = require('path');
var fs      = require('fs');
var util    = require('util');
var Promise = require('bluebird');

var server  = require('../../../server');
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
    self.options      = options || {};
    self.applications = null;
    self.route        = null;
    self.application  = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype.init = function () {
    var self = this;
    self.applications = server.get('applications');
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype.actionViewer = function (req, res, next) {
    var self = this;
    console.log('HostApp.prototype.actionViewer');
    if (req.params.appDirName && req.params.appFileName) {
        Promise.try(function () {
            self.route = [req.params.appDirName, req.params.appFileName].join('/');
            if (self.applications[self.route]) {
                if (req.query.debug === '1' && req.method === 'GET') {
                    return self.applications[self.route].deinit2().then(function () {
                        return self.createApplication2(req, res).then(function (application) {
                            return self.applications[self.route] = application;
                        });
                    });
                } else {
                    return self.applications[self.route];
                }
            } else {
                return self.createApplication2(req, res).then(function (application) {
                    return self.applications[self.route] = application;
                });
            }
        }).then(function (application) {
            self.application = application;
            self.handle(req, res, next);
        }).catch(function (err) {
            next(err);
        });
    } else {
        next();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype.createApplication2  = function (req, res) {
    var self = this;
    console.log('HostApp.prototype.createApplication2', req.params.appDirName, req.params.appFileName);
    var appFilePath = path.join(req.app.get('appsDirPath'), req.params.appDirName, req.params.appFileName + '.json');
    return qforms.Application.create2(appFilePath).then(function (application) {
        return application.init2().then(function () {
            return application;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype.handle = function (req, res, next) {
    var self = this;
    //console.log('HostApp.prototype.handle', req.method);
    if (req.method === 'GET') {
        if (self.application.authentication() && !(req.session.user && req.session.user[self.route])) {
            self.login(req, res, next);
        } else {
            self.index(req, res, next);
        }
    } else if (req.method === 'POST') {
        if (req.body.action === 'login') {
            self.login(req, res);
        } else {
            if (self.application.authentication() && !(req.session.user && req.session.user[self.route])) {
                //res.status(500);
                //res.end('not authenticated');
                next(new Error('not authenticated'));
            } else {
                if (ACTIONS.indexOf(req.body.action) !== -1) {
                    eval('self.{action}(req, res, next)'.replace('{action}', req.body.action));
                } else {
                    throw new Error('unknown action: ' + req.body.action);
                }
            }
        }
    } else {
        next();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype.login = function (req, res, next) {
    var self = this;
    console.log('HostApp.prototype.login');
    var context = qforms.Application.createContext({req: req});
    if (req.method === 'GET') {
        self.application.getUsers2(context).then(function (users) {
            self.application.destroyContext(context);
            res.render('viewer/login', {
                version       : req.app.get('version'),
                application   : self.application,
                caption       : self.application.data['@attributes'].caption,
                REQUEST_URI   : req.url,
                errMsg        : null,
                username      : null,
                users         : users
            });
        });
    } else if (req.method === 'POST') {
        self.application.authenticate2(context, req.body.username, req.body.password).then(function (authenticate, user) {
            if (authenticate) {
                if (req.session.user === undefined) {
                    req.session.user = {};
                }
                if (user) {
                    req.session.user[self.route] = user;
                } else {
                    req.session.user[self.route] = {name: req.body.username};
                }
                self.application.destroyContext(context);
                res.redirect(req.url);
            } else {
                self.application.getUsers2(context).then(function (users) {
                    self.application.destroyContext(context);
                    res.render('viewer/login', {
                        version    : req.app.get('version'),
                        application: self.application,
                        caption    : self.application.data['@attributes'].caption,
                        REQUEST_URI: req.url,
                        errMsg     : self.application.text.login.WrongUsernameOrPassword,
                        username   : req.body.username,
                        users      : users
                    });
                });
            }
        });
    } else {
        next();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype.index = function (req, res, next) {
    var self = this;
    console.log('HostApp.prototype.index', self.application.name);
    var context = qforms.Application.createContext({
        req: req
    });
    self.application.fill2(context).then(function (response) {
        self.application.destroyContext(context);
        res.render('viewer/view', {
            version       : req.app.get('version'),
            debugApp      : req.query.debug,
            commonClassCss: req.app.get('commonClassCss'),
            commonClassJs : req.app.get('commonClassJs'),
            viewerClassCss: req.app.get('viewerClassCss'),
            viewerClassJs : req.app.get('viewerClassJs'),
            links         : self.application.css,
            caption       : self.application.data['@attributes'].caption,
            data          : response
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype.page = function (req, res, next) {
    var self = this;
    console.log('HostApp.prototype.page', req.body.page);
    var context = qforms.Application.createContext({
        req           : req,
        params        : req.body.params,
        newMode       : req.body.newMode,
        parentPageName: req.body.parentPageName
    });
    self.application.getPage2(context, req.body.page).then(function (page) {
        return page.fill2(context).then(function (data) {
            self.application.destroyContext(context);
            res.json({
                data: data
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype.update = function (req, res, next) {
    var self = this;
    console.log('HostApp.prototype.update', req.body.page);
    var context = qforms.Application.createContext({
        req           : req,
        row           : req.body.row,
        parentPageName: req.body.parentPageName
    });
    self.application.getPage2(context, req.body.page).then(function (page) {
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
                            self.application.destroyContext(context);
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
HostApp.prototype.frame = function (req, res, next) {
    var self = this;
    console.log('HostApp.prototype.frame', req.body.page);
    var context = qforms.Application.createContext({
        req           : req,
        parentPageName: req.body.parentPageName,
        params        : req.body.params
    });
    Promise.try(function () {
        if (req.body.page) {
            return self.application.getPage2(context, req.body.page).then(function (page) {
                if (req.body.form) {
                    return page.forms[req.body.form].dataSources[req.body.ds];
                } else {
                    return page.dataSources[req.body.ds];
                }
            });
        } else {
            return self.application.dataSources[req.body.ds];
        }
    }).then(function (dataSource) {
        return dataSource.frame2(context).then(function (response) {
            self.application.destroyContext(context);
            res.json(response);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype.insert = function (req, res, next) {
    var self = this;
    console.log('HostApp.prototype.insert', req.body.page);
    var context = qforms.Application.createContext({
        req           : req,
        row           : req.body.row,
        parentPageName: req.body.parentPageName
    });
    self.application.getPage2(context, req.body.page).then(function (page) {
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
                            self.application.destroyContext(context);
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
HostApp.prototype._delete = function (req, res, next) {
    var self = this;
    console.log('HostApp.prototype._delete', req.body.page);
    var context = qforms.Application.createContext({
        req           : req,
        row           : req.body.row,
        parentPageName: req.body.parentPageName
    });
    self.application.getPage2(context, req.body.page).then(function (page) {
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
                            self.application.destroyContext(context);
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
HostApp.prototype.rpc = function (req, res, next) {
    var self = this;
    console.log('HostApp.prototype.rpc', req.body.page);
    var context = qforms.Application.createContext({
        req   : req,
        res   : res,
        params: req.body.params
    });
    self.application.getPage2(context, req.body.page).then(function (page) {
        page.rpc(context);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
HostApp.prototype.logout = function (req, res, next) {
    var self = this;
    console.log('HostApp.prototype.logout');
    if (req.session.user && req.session.user[self.route]) {
        delete req.session.user[self.route];
    }
    res.json(null);
};