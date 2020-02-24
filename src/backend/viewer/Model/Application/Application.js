'use strict';

var util          = require('util');
var path          = require('path');
var fs            = require('fs');
var _             = require('underscore');
var child_process = require('child_process');
var Promise       = require('bluebird');

var qforms  = require('../../../../qforms');
var server  = require('../../../../server');
var Model   = require('../Model');


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Application extends Model {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(data, appInfo) {
        super(data, appInfo);
        this.appInfo            = appInfo;
        this.dirPath            = this.appInfo.dirPath;
        this.viewFilePath       = path.join(
            server.get('public'),
            'viewer/class/Controller/ModelController/ApplicationController/view',
            'ApplicationView.ejs'
        );
        this.customViewFilePath = path.join(this.dirPath, this.name + '.ejs');
        this.createCollections  = ['databases', 'dataSources'];
        this.fillCollections    = ['dataSources'];
        this.pages              = {};
        this.css                = [];
        this.text               = qforms.text[this.data['@attributes'].lang || 'en'];
        this.databases          = {};
        this.dataSources        = {};
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    init() {
        return super.init().then(() => {
            return this._createStartupPages().then(() => {
                return qforms.Helper.getFilePaths(this.appInfo.dirPath, '', 'css');
            }).then(filePaths => {
                this.css = filePaths.map(filePath => {
                    return 'view/' + this.appInfo.dirName + '/' + this.appInfo.fileName + '/' + filePath;
                });
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    fill(context) {
        console.log('Application.prototype.fill');
        return super.fill(context).then(response => {
            delete response.user;
            delete response.password;
            delete response.authentication;
            response.env    = server.get('env');
            response.text   = this.text;
            response.params = this.getParams(context);
            return this._buildMenu(context).then(menu => {
                response.menu  = menu;
                response.pages = {};
                var startupPageNames = Object.keys(this.data.pageLinks).filter(pageName => {
                    return this.data.pageLinks[pageName]['@attributes'].startup === 'true';
                });
                return Promise.each(startupPageNames, pageName => {
                    return this.getPage(context, pageName).then(page => {
                        return page.fill(context).then(_response => {
                            response.pages[pageName] = _response;
                        });
                    });
                });
            }).then(() => {
                return response;
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static async create(appFilePath) {
        const appInfo = await qforms.Helper.getAppInfo(appFilePath);
        const json = await qforms.Helper.readFile(appInfo.filePath);
        var data = JSON.parse(json);
        var customClassFilePath = path.join(appInfo.dirPath, appInfo.name + '.backend.js');
        //console.log('customClassFilePath:', customClassFilePath);
        const js = await qforms.Helper.getFileContent(customClassFilePath);
        if (js) {
            var customClass = eval(js);
            return new customClass(data, appInfo);
        } else {
            return new Application(data, appInfo);
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async _buildMenu(context) {
        var menu = {};
        var pageNames = Object.keys(this.data.pageLinks).filter(pageName => {
            return context.user ? this.authorizePage(context.user, pageName) : true;
        });
        return Promise.each(pageNames, pageName => {
            var pageLink = this.data.pageLinks[pageName];
            var pageLinkMenu = pageLink['@attributes'].menu;
            if (pageLinkMenu) {
                var pageFilePath = path.join(this.appInfo.dirPath, pageLink['@attributes'].fileName);
                var pageFile = new qforms.JsonFile(pageFilePath);
                return pageFile.read().then(() => {
                    if (!menu[pageLinkMenu]) {
                        menu[pageLinkMenu] = [];
                    }
                    menu[pageLinkMenu].push({
                        page   : pageLink['@attributes'].name,
                        caption: pageFile.data['@attributes'].caption
                    });
                });
            }
        }).then(() => {
            return menu;
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    deinit() {
        console.log('Application.prototype.deinit: ' + this.name);
        return Promise.each(Object.keys(this.databases), name => {
            var database = this.databases[name];
            return database.deinit();
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    _createPage(pageName) {
        return Promise.try(() => {
            var relFilePath  = this.data.pageLinks[pageName]['@attributes'].fileName;
            var pageFilePath = path.join(this.dirPath, relFilePath);
            return qforms.Helper.readFile(pageFilePath);
        }).then(content => {
            var data = JSON.parse(content);
            return qforms.Page.create(data, this);
        }).then(page => {
            return page.init().then(() => {
                return page;
            });
        });
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    authorizePage(user, pageName) {
        return true;
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async getPage(context, pageName) {
        if (context.user && this.authorizePage(context.user, pageName) === false) {
            throw new Error('Authorization error');
        }
        if (this.pages[pageName]) {
            return this.pages[pageName];
        } else {
            return this._createPage(pageName).then(page => {
                this.pages[pageName] = page;
                return page;
            });
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async createStartupPages() {
        if (this.data.pageLinks) {
            var pageNames = Object.keys(this.data.pageLinks).filter(pageName => {
                return this.data.pageLinks[pageName]['@attributes'].startup === 'true';
            });
            return Promise.each(pageNames, pageName => {
                var pageLink = this.data.pageLinks[pageName];
                var pageName = pageLink['@attributes'].name;
                return this._createPage(pageName).then(page => {
                    this.pages[pageName] = page;
                });
            });
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async authenticate(context, username, password) {
        return username === this.data['@attributes'].user && password === this.data['@attributes'].password;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    authentication() {
        return this.data['@attributes'].authentication === 'true';
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async getUsers(context) {
        return null;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getParams(context) {
        var params = {};
        _.extend(params, context.params);
        if (context.querytime) {
            _.extend(params, context.querytime.params);
        }
        if (context.user) {
            params['username'] = context.user.name;
        }
        return params;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static createContext(context) {
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
        if (context.req) {
            var route = [context.req.params.appDirName, context.req.params.appFileName].join('/');
            if (context.req.session.user && context.req.session.user[route]) {
                context.user = context.req.session.user[route];
            }
        }
        if (context.connections === undefined) {
            context.connections = {};
        }
        return context;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    createContext(context) {
        console.log('Application.prototype.createContext');
        return Application.createContext(context);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static destroyContext(context) {
        /*for (var name in context.connections) {
            //console.log('release connection: ' + name);
            context.connections[name].release();
        }*/
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    destroyContext(context) {
        console.log('Application.prototype.destroyContext');
        return Application.destroyContext(context);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async rpc(context) {
        return {
            result: 'ok'
        };
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async _createStartupPages() {
        if (this.data.pageLinks) {
            var pageNames = Object.keys(this.data.pageLinks).filter(pageName => {
                return this.data.pageLinks[pageName]['@attributes'].startup === 'true';
            });
            return Promise.each(pageNames, pageName => {
                var pageLink = this.data.pageLinks[pageName];
                var pageName = pageLink['@attributes'].name;
                return this._createPage(pageName).then(page => {
                    this.pages[pageName] = page;
                });
            });
        }
    }

}

module.exports = Application;