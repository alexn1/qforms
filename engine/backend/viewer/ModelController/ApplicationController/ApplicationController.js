'use strict';

module.exports = ApplicationController;

var util          = require('util');
var path          = require('path');
var fs            = require('fs');
var _             = require('underscore');
var async         = require('async');
var mysql         = require('mysql');
var child_process = require('child_process');
var xml           = require('xml');

var qforms                  = require('../../../qforms');
var helper               = require('../../../common/helper');
var ModelController      = require('../ModelController');
var PageLinkController   = require('../PageLinkController/PageLinkController');
var PageController       = require('../PageController/PageController');
var DataSourceController = require('../DataSourceController/DataSourceController');
var PageFile             = require('../../../editor/JsonFile/PageFile/PageFile');

util.inherits(ApplicationController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ApplicationController(data, appInfo) {
    ApplicationController.super_.call(this, data);
    this.appInfo            = appInfo;
    this.dirPath            = this.appInfo.dirPath;
    this.viewFilePath       = path.join(
        qforms.get('public'),
        'viewer/class/Controller/ModelController/ApplicationController/view',
        'ApplicationView.ejs'
    );
    this.customViewFilePath = path.join(this.dirPath, this.name + '.ejs');
    this.createCollections  = ['dataSources'];
    this.fillCollections    = ['dataSources'];
    this.pages              = {};
    this.css                = [];
    this.pools              = {};
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.create = function(data, appInfo, callback) {
    var customClassFilePath = path.join(appInfo.dirPath, appInfo.name + '.backend.js');
    helper.getFileContent(customClassFilePath, function(content) {
        if (content) {
            var customClass = eval(content);
            callback(new customClass(data, appInfo));
        } else {
            callback(new ApplicationController(data, appInfo));
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype._buildMenu = function(context, callback) {
    var menu = {};
    var self = this;
    var tasks = _.filter(self.data.pageLinks, function (pageLink) {
        if (context.querytime.params['username']) {
            var userName = context.querytime.params['username'];
            var pageName = pageLink['@attributes'].name;
            return self.authorizePage(userName, pageName);
        } else {
            return true;
        }
    }).map(function(pageLink) {
        var pageLinkName = pageLink['@attributes'].name;
        var pageLinkMenu = pageLink['@attributes'].menu;
        return function(_next) {
            if (pageLinkMenu) {
                var pageFilePath = path.join(self.appInfo.dirPath, pageLink['@attributes'].fileName);
                var pageFile     = new PageFile(pageFilePath);
                pageFile.init(function() {
                    var pageData    = pageFile.getData();
                    var pageCaption = pageData['@attributes'].caption;
                    if (!menu[pageLinkMenu]) {
                        menu[pageLinkMenu] = [];
                    }
                    menu[pageLinkMenu].push({
                        caption: pageCaption,
                        page: pageLinkName
                    });
                    _next();
                });
            } else {
                _next();
            }
        };
    });
    async.series(tasks, function() {
        callback(menu);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.init = function(callback) {
    var self = this;
    ApplicationController.super_.prototype.init.call(this, function() {
        async.series([
            function(next) {
                self._createStartupPages(next);
            },
            function(next) {
                helper.getFilePaths(self.appInfo.dirPath, '', 'css', function(filePaths) {
                    self.css = filePaths.map(function(filePath) {
                        return 'view/' + self.appInfo.dirName + '/' + self.appInfo.fileName + '/' + filePath;
                    });
                    next();
                });
            }
        ], callback);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.deinit = function(callback) {
    console.log('deinit: ' + this.name);
    var pools = _.map(this.pools, function(pool) {return pool;});
    async.eachSeries(pools, function(pool, next) {
        pool.end(next);
    }, callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype._createPage = function(pageName, callback) {
    var self         = this;
    var relFilePath  = this.data.pageLinks[pageName]['@attributes'].fileName;
    var pageFilePath = path.join(this.dirPath, relFilePath);
    fs.readFile(pageFilePath, 'utf8', function(err, content) {
        if (err) {
            throw err;
        } else {
            var data = JSON.parse(content);
            PageController.create(data, self, function(page) {
                page.init(function() {
                    callback(page);
                });
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.authorizePage = function(userName, pageName) {
    return true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.getPage = function(context, pageName, callback) {
    if (context.querytime.params['username']) {
        var userName = context.querytime.params['username'];
        if (this.authorizePage(userName, pageName) === false) {
            throw new Error('Authorization error.');
        }
    }
    var self = this;
    if (this.pages[pageName]) {
        callback(self.pages[pageName]);
    } else {
        this._createPage(pageName, function(page) {
            self.pages[pageName] = page;
            callback(page);
        })
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype._createStartupPages = function(callback) {
    var self = this;
    if (this.data.pageLinks) {
        var tasks = _.filter(this.data.pageLinks, function (pageLink) {
            return pageLink['@attributes'].startup === 'true';
        }).map(function(pageLink) {
            return function(next) {
                var pageName = pageLink['@attributes'].name;
                self._createPage(pageName, function(page) {
                    self.pages[pageName] = page;
                    next();
                })
            };
        });
        async.series(tasks, callback);
    } else {
        callback();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.fill = function(context, callback) {
    var self = this;
    ApplicationController.super_.prototype.fill.call(this, context, function(response) {
        delete response.user;
        delete response.password;
        delete response.authentication;

        // username
        if (context.querytime.params['username']) {
            response.username = context.querytime.params['username'];
        }

        // menu
        self._buildMenu(context, function(menu) {
            response.menu = menu;
            var startupPageNames = _.filter(self.data.pageLinks, function (pageLink) {
                return pageLink['@attributes'].startup === 'true';
            }).map(function(pageLink) {
                return pageLink['@attributes'].name;
            });

            // pages
            response.pages = {};
            async.eachSeries(startupPageNames, function(pageName, next) {
                self.getPage(context, pageName, function(page) {
                    page.fill(context, function(_response) {
                        response.pages[pageName] = _response;
                        next();
                    });
                });
            }, function() {
                callback(response);
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.getPool = function(database) {
    if (!this.pools[database]) {
        //console.log('creating connection pool for: ' + database);
        this.pools[database] = mysql.createPool({
            host        : this.data.databases[database].params.host['@attributes'].value,
            user        : this.data.databases[database].params.user['@attributes'].value,
            database    : this.data.databases[database].params.database['@attributes'].value,
            password    : this.data.databases[database].params.password['@attributes'].value,
            queryFormat : helper.queryFormat
        });
    }
    //console.log('mysql pool connections count: ' + this.pools[database]._allConnections.length);
    return this.pools[database];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.query = function(query, params, callback) {
    this.getPool('default').getConnection(function(err, cnn) {
        if (err) {
            throw err;
        } else {
            cnn.query({sql: query, typeCast: helper.typeCast}, params, function(err, result) {
                cnn.release();
                if (err) {
                    throw err;
                } else {
                    callback(result);
                }
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.authenticate = function(username, password, callback) {
    callback(username === this.data['@attributes'].user && password === this.data['@attributes'].password);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.authentication = function() {
    return this.data['@attributes'].authentication === 'true';
};


////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.getUsers = function(callback) {
    callback(null);
};