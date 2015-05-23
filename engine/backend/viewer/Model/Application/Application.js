'use strict';

module.exports = Application;

var util  = require('util');
var path  = require('path');
var fs    = require('fs');
var _     = require('underscore');
var async = require('async');
var mysql = require('mysql');

var app              = require('../../../qforms');
var helper           = require('../../../common/helper');
var Model            = require('../Model');
var PageLink         = require('../PageLink/PageLink');
var Page             = require('../Page/Page');
var DataSource       = require('../DataSource/DataSource');
var PageFile         = require('../../../editor/JsonFile/PageFile/PageFile');

util.inherits(Application, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Application(data, appInfo) {
    Application.super_.prototype.constructor.call(this, data);
    this.appInfo            = appInfo;
    this.dirPath            = this.appInfo.dirPath;
    this.viewFilePath       = path.join(
        app.get('public'),
        'viewer/class/Controller/ModelController/ApplicationController/view',
        'ApplicationView.ejs'
    );
    this.customViewFilePath = path.join(this.dirPath, this.name + '.ejs');
    this.createCollections  = ['pageLinks', 'dataSources'];
    this.fillCollections    = ['pageLinks'];
    this.menu               = {};
    this.pages              = {};
    this.css                = [];
    this.pools              = {};
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.init = function(callback) {
    var self = this;
    Application.super_.prototype.init.call(this, function() {
        async.series([
            function(next) {
                var tasks = _.map(self.data.pageLinks, function(pageLink) {
                    var pageLinkName = pageLink['@attributes'].name;
                    var pageLinkMenu = pageLink['@attributes'].menu;
                    return function(_next) {
                        if (pageLinkMenu) {
                            var pageFilePath = path.join(self.appInfo.dirPath, pageLink['@attributes'].fileName);
                            var pageFile     = new PageFile(pageFilePath);
                            pageFile.init(function() {
                                var pageData    = pageFile.getData();
                                var pageCaption = pageData['@attributes'].caption;
                                if (!self.menu[pageLinkMenu]) {
                                    self.menu[pageLinkMenu] = [];
                                }
                                self.menu[pageLinkMenu].push({
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
                async.series(tasks, next);
            },
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
Application.prototype.deinit = function(callback) {
    console.log('deinit: ' + this.name);
    var pools = _.map(this.pools, function(pool) {return pool;});
    async.eachSeries(pools, function(pool, next) {
        pool.end(next);
    }, callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype._createPage = function(pageName, callback) {
    var self         = this;
    var relFilePath  = this.data.pageLinks[pageName]['@attributes'].fileName;
    var pageFilePath = path.join(this.dirPath, relFilePath);
    fs.readFile(pageFilePath, 'utf8', function(err, content) {
        if (err) {
            throw err;
        } else {
            var data = JSON.parse(content);
            var page = new Page(data, self);
            page.init(function() {
                callback(page);
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.getPage = function(pageName, callback) {
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
Application.prototype._createStartupPages = function(callback) {
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
Application.prototype.fill = function(params, newMode, callback) {
    var self = this;
    Application.super_.prototype.fill.call(this, params, newMode, function(response) {
        response.menu = self.menu;
        var startupPageNames = _.filter(self.data.pageLinks, function (pageLink) {
            return pageLink['@attributes'].startup === 'true';
        }).map(function(pageLink) {
            return pageLink['@attributes'].name;
        });
        response.pages = {};
        async.eachSeries(startupPageNames, function(pageName, next) {
            self.getPage(pageName, function(page) {
                page.fill(params, newMode, function(_response) {
                    response.pages[pageName] = _response;
                    next();
                });
            });
        }, function() {
            callback(response);
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.getPool = function(database) {
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
    console.log('mysql pool connections count: ' + this.pools[database]._allConnections.length);
    return this.pools[database];
};