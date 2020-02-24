'use strict';

var path    = require('path');
var fs      = require('fs');
var util    = require('util');
var Promise = require('bluebird');

var server  = require('../../server');
var qforms  = require('../../qforms');

var ACTIONS = [
    'page',
    'frame',        // select
    'insert',       // insert
    'update',       // update
    '_delete',      // delete
    'rpc',
    'logout'
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class HostApp {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(options) {
        this.options      = options || {};
        this.applications = null;
        this.route        = null;
        this.application  = null;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    init() {
        this.applications = server.get('applications');
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    actionViewer(req, res, next) {
        var self = this;
        console.log('HostApp.prototype.actionViewer');
        if (req.params.appDirName && req.params.appFileName) {
            Promise.try(() => {
                const route = self.route = [req.params.appDirName, req.params.appFileName].join('/');
                const application = self.applications[route];
                if (application) {
                    if (req.query.debug === '1' && req.method === 'GET') {
                        return application.deinit().then(() => {
                            return self.createApplication(req, res).then((application) => {
                                return self.applications[route] = application;
                            });
                        });
                    } else {
                        return application;
                    }
                } else {
                    return self.createApplication(req, res).then((application) => {
                        return self.applications[route] = application;
                    });
                }
            }).then((application) => {
                self.application = application;
                self.handle(req, res, next);
                return null;
            }).catch((err) => {
                next(err);
            });
        } else {
            next();
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async createApplication(req, res) {
        var self = this;
        console.log(`HostApp.prototype.createApplication ${req.params.appDirName}/${req.params.appFileName}`);
        var appFilePath = path.join(req.app.get('appsDirPath'), req.params.appDirName, req.params.appFileName + '.json');
        const application = await qforms.Application.create(appFilePath);
        await application.init();
        return application;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    handle(req, res, next) {
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
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    login(req, res, next) {
        var self = this;
        console.log('HostApp.prototype.login');
        var context = qforms.Application.createContext({req: req});
        if (req.method === 'GET') {
            self.application.getUsers(context).then(users => {
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
            }).catch(err => {
                next(err);
            });
        } else if (req.method === 'POST') {
            self.application.authenticate(context, req.body.username, req.body.password).then((authenticate, user) => {
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
                    self.application.getUsers(context).then(users => {
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
            }).catch(err => {
                next(err);
            });
        } else {
            next();
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    index(req, res, next) {
        var self = this;
        console.log('HostApp.prototype.index', self.application.name);
        var context = qforms.Application.createContext({req: req});
        self.application.fill(context).then(response => {
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
            return null;
        }).catch(err => {
            next(err);
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    page(req, res, next) {
        var self = this;
        console.log('HostApp.prototype.page', req.body.page);
        var context = qforms.Application.createContext({
            req           : req,
            params        : req.body.params,
            newMode       : req.body.newMode,
            parentPageName: req.body.parentPageName
        });
        self.application.getPage(context, req.body.page).then(page => {
            return page.fill(context).then(data => {
                self.application.destroyContext(context);
                res.json({
                    data: data
                });
                return null;
            });
        }).catch(err => {
            next(err);
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    update(req, res, next) {
        var self = this;
        console.log('HostApp.prototype.update', req.body.page);
        var context = qforms.Application.createContext({
            req           : req,
            row           : req.body.row,
            parentPageName: req.body.parentPageName
        });
        self.application.getPage(context, req.body.page).then(page => {
            var dataSource = page.forms[req.body.form].dataSources[req.body.ds];
            return dataSource.database.getConnection(context).then(cnn => {
                return dataSource.database.beginTransaction(cnn).then(() => {
                    return dataSource.update(context);
                }).then(() => {
                    return dataSource.database.commit(cnn);
                }).catch((err) => {
                    console.error(err);
                    return dataSource.database.rollback(cnn, err);
                });
            });
        }).then(() => {
            self.application.destroyContext(context);
            res.json(null);
        }).catch((err) => {
            next(err);
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    frame(req, res, next) {
        var self = this;
        console.log('HostApp.prototype.frame', req.body.page);
        var start = Date.now();
        var context = qforms.Application.createContext({
            req           : req,
            parentPageName: req.body.parentPageName,
            params        : req.body.params
        });
        Promise.try(() => {
            if (req.body.page) {
                return self.application.getPage(context, req.body.page).then(page => {
                    if (req.body.form) {
                        return page.forms[req.body.form].dataSources[req.body.ds];
                    } else {
                        return page.dataSources[req.body.ds];
                    }
                });
            } else {
                return self.application.dataSources[req.body.ds];
            }
        }).then(dataSource => {
            return dataSource.frame(context).then(response => {
                self.application.destroyContext(context);
                var time = Date.now() - start;
                console.log('frame time:', time);
                response.time = time;
                res.json(response);
            });
        }).catch(err => {
            next(err);
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    insert(req, res, next) {
        var self = this;
        console.log('HostApp.prototype.insert', req.body.page);
        var context = qforms.Application.createContext({
            req           : req,
            row           : req.body.row,
            parentPageName: req.body.parentPageName
        });
        self.application.getPage(context, req.body.page).then(page => {
            var dataSource = page.forms[req.body.form].dataSources[req.body.ds];
            return dataSource.database.getConnection(context).then(cnn => {
                return dataSource.database.beginTransaction(cnn).then(() => {
                    return dataSource.insert(context).then(key => {
                        return dataSource.database.commit(cnn).then(() => {
                            return key;
                        });
                    });
                }).catch(err => {
                    console.error(err);
                    return dataSource.database.rollback(cnn, err);
                });
            });
        }).then(key => {
            self.application.destroyContext(context);
            res.json({
                key: key
            });
        }).catch(err => {
            next(err);
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    _delete(req, res, next) {
        var self = this;
        console.log('HostApp.prototype._delete', req.body.page);
        var context = qforms.Application.createContext({
            req           : req,
            row           : req.body.row,
            parentPageName: req.body.parentPageName
        });
        self.application.getPage(context, req.body.page).then(page => {
            var dataSource = page.forms[req.body.form].dataSources[req.body.ds];
            return dataSource.database.getConnection(context).then(cnn => {
                return dataSource.database.beginTransaction(cnn).then(() => {
                    return dataSource.delete(context);
                }).then(() => {
                    return dataSource.database.commit(cnn);
                }).catch(err => {
                    console.error(err);
                    return dataSource.database.rollback(cnn, err);
                });
            });
        }).then(() => {
            self.application.destroyContext(context);
            res.json(null);
        }).catch(err => {
            next(err);
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    rpc(req, res, next) {
        var self = this;
        console.log('HostApp.prototype.rpc', req.body);
        var context = qforms.Application.createContext({
            req   : req,
            res   : res,
            params: req.body.params
        });
        Promise.try(() => {
            if (req.body.page) {
                return self.application.getPage(context, req.body.page);
            } else {
                return self.application;
            }
        }).then(model => {
            return model.rpc(context);
        }).then(result => {
            self.application.destroyContext(context);
            res.json(result);
        }).catch(err => {
            next(err);
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    logout(req, res, next) {
        var self = this;
        console.log('HostApp.prototype.logout');
        if (req.session.user && req.session.user[self.route]) {
            delete req.session.user[self.route];
        }
        res.json(null);
    }

}

module.exports = HostApp;