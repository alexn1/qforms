'use strict';

module.exports = ApplicationController;

var util          = require('util');
var path          = require('path');
var fs            = require('fs');
var _             = require('underscore');
var async         = require('async');
var child_process = require('child_process');
var Promise       = require('bluebird');

var qforms = require('../../../../qforms');
var server = require('../../../../server');

var ModelController = require('../ModelController');

util.inherits(ApplicationController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ApplicationController(data, appInfo) {
    var self = this;
    ApplicationController.super_.call(this, data);
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

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.create = function(appFilePath, callback) {
    ApplicationController.create2(appFilePath).then(function (obj) {
        callback(obj);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.create2 = function(appFilePath) {
    return qforms.helper.getAppInfo2(appFilePath).then(function(appInfo) {
        return qforms.helper.readFile(appInfo.filePath).then(function (content) {
            var data = JSON.parse(content);
            var customClassFilePath = path.join(appInfo.dirPath, appInfo.name + '.backend.js');
            return qforms.helper.getFileContent2(customClassFilePath).then(function (content) {
                if (content) {
                    var customClass = eval(content);
                    return new customClass(data, appInfo);
                } else {
                    return new ApplicationController(data, appInfo);
                }
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype._buildMenu2 = function(context) {
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
                return pageFile.read2().then(function() {
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

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.init = function(callback) {
    var self = this;
    ApplicationController.super_.prototype.init.call(self, function () {
        self._createStartupPages2().then(function () {
            return qforms.helper.getFilePaths(self.appInfo.dirPath, '', 'css');
        }).then(function(filePaths) {
            self.css = filePaths.map(function(filePath) {
                return 'view/' + self.appInfo.dirName + '/' + self.appInfo.fileName + '/' + filePath;
            });
        }).then(function () {
            callback();
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.deinit = function(callback) {
    //console.log('ApplicationController.prototype.deinit:' + this.name);
    async.eachSeries(this.databases, function(database, next) {
        database.deinit(next);
    }, callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype._createPage2 = function(pageName) {
    var self = this;
    return Promise.try(function () {
        var relFilePath  = self.data.pageLinks[pageName]['@attributes'].fileName;
        var pageFilePath = path.join(self.dirPath, relFilePath);
        return qforms.helper.readFile(pageFilePath);
    }).then(function (content) {
        var data = JSON.parse(content);
        return qforms.PageController.create2(data, self);
    }).then(function (page) {
        return new Promise(function (resolve) {
            page.init(function() {
                resolve(page);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.authorizePage = function(user, pageName) {
    var self = this;
    return true;
};

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.getPage = function(context, pageName, callback) {
    var self = this;
    if (context.user) {
        if (self.authorizePage(context.user, pageName) === false) {
            throw new Error('Authorization error');
        }
    }
    if (self.pages[pageName]) {
        callback(self.pages[pageName]);
    } else {
        self._createPage2(pageName).then(function (page) {
            self.pages[pageName] = page;
            callback(page);
        });
    }
};
*/

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.getPage2 = function(context, pageName) {
    var self = this;
    return Promise.try(function () {
        if (context.user && self.authorizePage(context.user, pageName) === false) {
            throw new Error('Authorization error');
        }
        if (self.pages[pageName]) {
            return self.pages[pageName];
        } else {
            return self._createPage2(pageName).then(function (page) {
                self.pages[pageName] = page;
                return page;
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype._createStartupPages2 = function() {
    var self = this;
    return Promise.try(function () {
        if (self.data.pageLinks) {
            var pageNames = Object.keys(self.data.pageLinks).filter(function (pageName) {
                return self.data.pageLinks[pageName]['@attributes'].startup === 'true';
            });
            return Promise.each(pageNames, function(pageName) {
                var pageLink = self.data.pageLinks[pageName];
                var pageName = pageLink['@attributes'].name;
                return self._createPage2(pageName).then(function (page) {
                    self.pages[pageName] = page;
                });
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.fill = function(context, callback) {
    var self = this;
    ApplicationController.super_.prototype.fill.call(this, context, function(response) {
        delete response.user;
        delete response.password;
        delete response.authentication;
        response.env    = server.get('env');
        response.text   = self.text;
        response.params = self.getParams(context);
        self._buildMenu2(context).then(function (menu) {
            response.menu  = menu;
            response.pages = {};
            var startupPageNames = Object.keys(self.data.pageLinks).filter(function (pageName) {
                return self.data.pageLinks[pageName]['@attributes'].startup === 'true';
            });
            return Promise.each(startupPageNames, function (pageName) {
                return self.getPage2(context, pageName).then(function (page) {
                    return page.fill2(context).then(function (_response) {
                        response.pages[pageName] = _response;
                    });
                });
            });
        }).then(function () {
            callback(response);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.authenticate = function(context, username, password, callback) {
    callback(username === this.data['@attributes'].user && password === this.data['@attributes'].password);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.authentication = function() {
    return this.data['@attributes'].authentication === 'true';
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.getUsers = function(context, callback) {
    callback(null);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.getParams = function(context) {
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

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.createContext = function(context) {
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

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.destroyContext = function(context) {
    for (var name in context.connections) {
        //console.log('release: ' + name);
        context.connections[name].release();
    }
};
