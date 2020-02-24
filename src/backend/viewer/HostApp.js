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
        console.log('HostApp.prototype.actionViewer');
        if (req.params.appDirName && req.params.appFileName) {
            Promise.try(() => {
                const route = this.route = [req.params.appDirName, req.params.appFileName].join('/');
                const application = this.applications[route];
                if (application) {
                    if (req.query.debug === '1' && req.method === 'GET') {
                        return application.deinit().then(() => {
                            return this.createApplication(req, res).then((application) => {
                                return this.applications[route] = application;
                            });
                        });
                    } else {
                        return application;
                    }
                } else {
                    return this.createApplication(req, res).then((application) => {
                        return this.applications[route] = application;
                    });
                }
            }).then((application) => {
                this.application = application;
                this.handle(req, res, next);
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
        console.log(`HostApp.prototype.createApplication ${req.params.appDirName}/${req.params.appFileName}`);
        var appFilePath = path.join(req.app.get('appsDirPath'), req.params.appDirName, req.params.appFileName + '.json');
        const application = await qforms.Application.create(appFilePath);
        await application.init();
        return application;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    handle(req, res, next) {
        //console.log('HostApp.prototype.handle', req.method);
        if (req.method === 'GET') {
            if (this.application.authentication() && !(req.session.user && req.session.user[this.route])) {
                this.login(req, res, next);
            } else {
                this.index(req, res, next);
            }
        } else if (req.method === 'POST') {
            if (req.body.action === 'login') {
                this.login(req, res);
            } else {
                if (this.application.authentication() && !(req.session.user && req.session.user[this.route])) {
                    //res.status(500);
                    //res.end('not authenticated');
                    next(new Error('not authenticated'));
                } else {
                    if (ACTIONS.indexOf(req.body.action) !== -1) {
                        eval('this.{action}(req, res, next)'.replace('{action}', req.body.action));
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
        console.log('HostApp.prototype.login');
        var context = qforms.Application.createContext({req: req});
        if (req.method === 'GET') {
            this.application.getUsers(context).then(users => {
                this.application.destroyContext(context);
                res.render('viewer/login', {
                    version       : req.app.get('version'),
                    application   : this.application,
                    caption       : this.application.data['@attributes'].caption,
                    REQUEST_URI   : req.url,
                    errMsg        : null,
                    username      : null,
                    users         : users
                });
            }).catch(err => {
                next(err);
            });
        } else if (req.method === 'POST') {
            this.application.authenticate(context, req.body.username, req.body.password).then((authenticate, user) => {
                if (authenticate) {
                    if (req.session.user === undefined) {
                        req.session.user = {};
                    }
                    if (user) {
                        req.session.user[this.route] = user;
                    } else {
                        req.session.user[this.route] = {name: req.body.username};
                    }
                    this.application.destroyContext(context);
                    res.redirect(req.url);
                } else {
                    this.application.getUsers(context).then(users => {
                        this.application.destroyContext(context);
                        res.render('viewer/login', {
                            version    : req.app.get('version'),
                            application: this.application,
                            caption    : this.application.data['@attributes'].caption,
                            REQUEST_URI: req.url,
                            errMsg     : this.application.text.login.WrongUsernameOrPassword,
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
        console.log('HostApp.prototype.index', this.application.name);
        var context = qforms.Application.createContext({req: req});
        this.application.fill(context).then(response => {
            this.application.destroyContext(context);
            res.render('viewer/view', {
                version       : req.app.get('version'),
                debugApp      : req.query.debug,
                commonClassCss: req.app.get('commonClassCss'),
                commonClassJs : req.app.get('commonClassJs'),
                viewerClassCss: req.app.get('viewerClassCss'),
                viewerClassJs : req.app.get('viewerClassJs'),
                links         : this.application.css,
                caption       : this.application.data['@attributes'].caption,
                data          : response
            });
            return null;
        }).catch(err => {
            next(err);
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    page(req, res, next) {
        console.log('HostApp.prototype.page', req.body.page);
        var context = qforms.Application.createContext({
            req           : req,
            params        : req.body.params,
            newMode       : req.body.newMode,
            parentPageName: req.body.parentPageName
        });
        this.application.getPage(context, req.body.page).then(page => {
            return page.fill(context).then(data => {
                this.application.destroyContext(context);
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
        console.log('HostApp.prototype.update', req.body.page);
        var context = qforms.Application.createContext({
            req           : req,
            row           : req.body.row,
            parentPageName: req.body.parentPageName
        });
        this.application.getPage(context, req.body.page).then(page => {
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
            this.application.destroyContext(context);
            res.json(null);
        }).catch((err) => {
            next(err);
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    frame(req, res, next) {
        console.log('HostApp.prototype.frame', req.body.page);
        var start = Date.now();
        var context = qforms.Application.createContext({
            req           : req,
            parentPageName: req.body.parentPageName,
            params        : req.body.params
        });
        Promise.try(() => {
            if (req.body.page) {
                return this.application.getPage(context, req.body.page).then(page => {
                    if (req.body.form) {
                        return page.forms[req.body.form].dataSources[req.body.ds];
                    } else {
                        return page.dataSources[req.body.ds];
                    }
                });
            } else {
                return this.application.dataSources[req.body.ds];
            }
        }).then(dataSource => {
            return dataSource.frame(context).then(response => {
                this.application.destroyContext(context);
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
        console.log('HostApp.prototype.insert', req.body.page);
        var context = qforms.Application.createContext({
            req           : req,
            row           : req.body.row,
            parentPageName: req.body.parentPageName
        });
        this.application.getPage(context, req.body.page).then(page => {
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
            this.application.destroyContext(context);
            res.json({
                key: key
            });
        }).catch(err => {
            next(err);
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    _delete(req, res, next) {
        console.log('HostApp.prototype._delete', req.body.page);
        var context = qforms.Application.createContext({
            req           : req,
            row           : req.body.row,
            parentPageName: req.body.parentPageName
        });
        this.application.getPage(context, req.body.page).then(page => {
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
            this.application.destroyContext(context);
            res.json(null);
        }).catch(err => {
            next(err);
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    rpc(req, res, next) {
        console.log('HostApp.prototype.rpc', req.body);
        var context = qforms.Application.createContext({
            req   : req,
            res   : res,
            params: req.body.params
        });
        Promise.try(() => {
            if (req.body.page) {
                return this.application.getPage(context, req.body.page);
            } else {
                return this.application;
            }
        }).then(model => {
            return model.rpc(context);
        }).then(result => {
            this.application.destroyContext(context);
            res.json(result);
        }).catch(err => {
            next(err);
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    logout(req, res, next) {
        console.log('HostApp.prototype.logout');
        if (req.session.user && req.session.user[this.route]) {
            delete req.session.user[this.route];
        }
        res.json(null);
    }

}

module.exports = HostApp;