'use strict';

module.exports = Application;

var util          = require('util');
var path          = require('path');
var fs            = require('fs');
var _             = require('underscore');
var child_process = require('child_process');
var Promise       = require('bluebird');

var qforms  = require('../../../../qforms');
var server  = require('../../../../server');
var Model   = require('../Model');

util.inherits(Application, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Application(data, appInfo) {
    var self = this;
    Application.super_.call(this, data);
    self.appInfo            = appInfo;
    self.dirPath            = self.appInfo.dirPath;
    self.viewFilePath       = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/ApplicationController/view',
        'ApplicationView.ejs'
    );
    self.customViewFilePath = path.join(self.dirPath, self.name + '.ejs');
    self.createCollections  = ['databases', 'dataSources'];
    self.fillCollections    = ['dataSources'];
    self.pages              = {};
    self.css                = [];
    self.text               = qforms.text[self.data['@attributes'].lang || 'en'];
    self.databases          = {};
    self.dataSources        = {};
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Application.create = function(appFilePath) {
    return qforms.helper.getAppInfo(appFilePath).then(function(appInfo) {
        return qforms.helper.readFile(appInfo.filePath).then(function (content) {
            var data = JSON.parse(content);
            var customClassFilePath = path.join(appInfo.dirPath, appInfo.name + '.backend.js');
            return qforms.helper.getFileContent(customClassFilePath).then(function (content) {
                if (content) {
                    var customClass = eval(content);
                    return new customClass(data, appInfo);
                } else {
                    return new Application(data, appInfo);
                }
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype._buildMenu = function(context) {
    var self = this;
    return Promise.try(function() {
        var menu = {};
        var pageNames = Object.keys(self.data.pageLinks).filter(function (pageName) {
            return context.user ? self.authorizePage(context.user, pageName) : true;
        });
        return Promise.each(pageNames, function(pageName) {
            var pageLink = self.data.pageLinks[pageName];
            var pageLinkMenu = pageLink['@attributes'].menu;
            if (pageLinkMenu) {
                var pageFilePath = path.join(self.appInfo.dirPath, pageLink['@attributes'].fileName);
                var pageFile = new qforms.JsonFile(pageFilePath);
                return pageFile.read().then(function() {
                    if (!menu[pageLinkMenu]) {
                        menu[pageLinkMenu] = [];
                    }
                    menu[pageLinkMenu].push({
                        page   : pageLink['@attributes'].name,
                        caption: pageFile.data['@attributes'].caption
                    });
                });
            }
        }).then(function () {
            return menu;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.init = function() {
    var self = this;
    return Application.super_.prototype.init.call(self).then(function () {
        return self._createStartupPages().then(function () {
            return qforms.helper.getFilePaths(self.appInfo.dirPath, '', 'css');
        }).then(function(filePaths) {
            self.css = filePaths.map(function(filePath) {
                return 'view/' + self.appInfo.dirName + '/' + self.appInfo.fileName + '/' + filePath;
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.deinit = function() {
    var self = this;
    console.log('Application.prototype.deinit: ' + self.name);
    return Promise.each(Object.keys(self.databases), function (name) {
        var database = self.databases[name];
        return database.deinit();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype._createPage = function(pageName) {
    var self = this;
    return Promise.try(function () {
        var relFilePath  = self.data.pageLinks[pageName]['@attributes'].fileName;
        var pageFilePath = path.join(self.dirPath, relFilePath);
        return qforms.helper.readFile(pageFilePath);
    }).then(function (content) {
        var data = JSON.parse(content);
        return qforms.Page.create(data, self);
    }).then(function (page) {
        return page.init().then(function () {
            return page;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.authorizePage = function(user, pageName) {
    var self = this;
    return true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.getPage = function(context, pageName) {
    var self = this;
    return Promise.try(function () {
        if (context.user && self.authorizePage(context.user, pageName) === false) {
            throw new Error('Authorization error');
        }
        if (self.pages[pageName]) {
            return self.pages[pageName];
        } else {
            return self._createPage(pageName).then(function (page) {
                self.pages[pageName] = page;
                return page;
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype._createStartupPages = function() {
    var self = this;
    return Promise.try(function () {
        if (self.data.pageLinks) {
            var pageNames = Object.keys(self.data.pageLinks).filter(function (pageName) {
                return self.data.pageLinks[pageName]['@attributes'].startup === 'true';
            });
            return Promise.each(pageNames, function(pageName) {
                var pageLink = self.data.pageLinks[pageName];
                var pageName = pageLink['@attributes'].name;
                return self._createPage(pageName).then(function (page) {
                    self.pages[pageName] = page;
                });
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.fill = function(context) {
    var self = this;
    return Application.super_.prototype.fill.call(self, context).then(function (response) {
        delete response.user;
        delete response.password;
        delete response.authentication;
        response.env    = server.get('env');
        response.text   = self.text;
        response.params = self.getParams(context);
        return self._buildMenu(context).then(function (menu) {
            response.menu  = menu;
            response.pages = {};
            var startupPageNames = Object.keys(self.data.pageLinks).filter(function (pageName) {
                return self.data.pageLinks[pageName]['@attributes'].startup === 'true';
            });
            return Promise.each(startupPageNames, function (pageName) {
                return self.getPage(context, pageName).then(function (page) {
                    return page.fill(context).then(function (_response) {
                        response.pages[pageName] = _response;
                    });
                });
            });
        }).then(function () {
            return response;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.authenticate2 = function(context, username, password) {
    var self = this;
    return Promise.resolve(username === self.data['@attributes'].user && password === self.data['@attributes'].password);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.authentication = function() {
    var self = this;
    return self.data['@attributes'].authentication === 'true';
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.getUsers2 = function(context) {
    return Promise.resolve(null);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.getParams = function(context) {
    var self = this;
    var params = {};
    _.extend(params, context.params);
    if (context.querytime) {
        _.extend(params, context.querytime.params);
    }
    if (context.user) {
        params['username'] = context.user.name;
    }
    return params;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.createContext = Application.createContext =  function(context) {
    var self = this;
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.destroyContext = Application.destroyContext = function(context) {
    var self = this;
    for (var name in context.connections) {
        //console.log('release connection: ' + name);
        context.connections[name].release();
    }
};