'use strict';

module.exports = ApplicationEditor;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var qforms              = require('../../../qforms');
var helper              = require('../../../common/helper');
var Editor              = require('../Editor');
var PageEditor          = require('../PageEditor/PageEditor');
var PageLinkEditor      = require('../PageLinkEditor/PageLinkEditor');
var ApplicationFile     = require('../../JsonFile/ApplicationFile/ApplicationFile');
var PageFile            = require('../../JsonFile/PageFile/PageFile');
var SqlDataSourceEditor = require('../../Editor/DataSourceEditor/SqlDataSourceEditor/SqlDataSourceEditor');

util.inherits(ApplicationEditor, Editor);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ApplicationEditor(appFile) {
    this.appFile            = appFile;
    this.data               = appFile.getData();
    this.defaultEjsFilePath = path.join(
        qforms.get('public'),
        'viewer/class/Controller/ModelController/ApplicationController/view/ApplicationView.ejs'
    );
    this.defaultCssFilePath = path.join(
        qforms.get('public'),
        'viewer/class/Controller/ModelController/ApplicationController/view/ApplicationView.css'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.createData = function(params) {
    return {
        '@class': 'Application',
        '@attributes': {
            formatVer: '0.1',
            name          : params.name,
            caption       : params.name,
            authentication: 'false',
            user          : 'admin',
            password      : 'admin'
        },
        databases: {},
        pageLinks: {}
    };
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.createPage = function(params, callback) {
    var self           = this;
    var pagesDirPath   = path.join(this.appFile.appInfo.dirPath, 'pages');
    var pageDirPath    = path.join(pagesDirPath, params.name);
    var pageFilePath   = path.join(pageDirPath , params.name + '.json');
    var pageData       = PageEditor.createData(params);
    var content        = JSON.stringify(pageData, null, 4);
    var createPageFile = function(_callback) {
        fs.exists(pageFilePath, function(exists) {
            if (exists) {
                throw new Error('Page {name} already exist.'.replace('{name}', params.name));
            } else {
                fs.writeFile(pageFilePath, content, 'utf8', function(err) {
                    if (err) {
                        throw err;
                    } else {
                        _callback();
                    }
                });
            }
        });
    };
    var createPageEditor = function(_callback) {
        createPageFile(function() {
            self.appFile.newPageLink(params);
            self.appFile.save(function() {
                var pageFile = new PageFile(pageFilePath);
                pageFile.init(function() {
                    _callback(new PageEditor(this, pageFile));
                });
            });
        });
    };
    helper.createDirIfNotExists(pagesDirPath, function() {
        fs.exists(pageDirPath, function(exists) {
            if (!exists) {
                fs.mkdir(pageDirPath, function(err) {
                    if (err) {
                        throw err;
                    }
                    createPageEditor(function(pageEditor) {
                        callback(pageEditor);
                    });
                });
            } else {
                createPageEditor(function(pageEditor) {
                    callback(pageEditor);
                });
            }
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getPageLink = function(name) {
    return new PageLinkEditor(this, name);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.setAttr = function(name, value, callback) {
    this.appFile.setAttr(name, value);
    this.appFile.save(callback);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.removePage = function(name, callback) {
    var self = this;
    this.appFile.deletePage(name, function() {
        self.appFile.save(callback);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getPageByFileName = function(relFilePath, callback) {
    var self         = this;
    var pageFilePath = path.join(this.appFile.appInfo.dirPath, relFilePath);
    var pageFile     = new PageFile(pageFilePath);
    pageFile.init(function() {
        callback(new PageEditor(self, pageFile));
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getPage = function(name, callback) {
    var pageLinkData = this.appFile.getPageLinkData(name);
    var relFilePath  = pageLinkData['@attributes'].fileName;
    this.getPageByFileName(relFilePath, callback);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.createEjs = function(params, callback) {
    var customEjsFilePath = this.getCustomFilePath(params, 'ejs');
    this.createFile(customEjsFilePath, this.defaultEjsFilePath, this.getViewName(), params.app, null, function(ejs) {
        callback(ejs);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.createCss = function(params, callback) {
    var customCssFilePath = this.getCustomFilePath(params, 'css');
    var emptyTemplate = '.' + params.app + ' {\n}';
    this.createFile(customCssFilePath, this.defaultCssFilePath, this.getViewName(), params.app, emptyTemplate, function(css) {
        callback(css);
    });
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.createJs = function(params, callback) {
    var customJsFilePath = this.getCustomFilePath(params, 'js');
    var tempalteFilePath = path.join(__dirname, 'Application.js.ejs');
    this.createFile2(customJsFilePath, tempalteFilePath, {
        application: this.appFile.getAttr('name'),
        _class: this.constructor.name.replace('Editor', '')
    }, function(js) {
        callback(js);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getCustomFilePath = function(params, ext) {
    return path.join(this.appFile.appInfo.dirPath, params.app + '.' + ext);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getDataSource = function(name) {
    var dataSourceData  = this.data.dataSources[name];
    return eval('new {class}Editor(this, name, dataSourceData)'.replace('{class}', dataSourceData['@class']));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.movePageLinkUp = function(params, callback) {
    this.data.pageLinks = helper.moveObjProp(this.data.pageLinks, params.page, -1);
    this.appFile.save(function() {
        callback('ok');
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.movePageLinkDown = function(params, callback) {
    this.data.pageLinks = helper.moveObjProp(this.data.pageLinks, params.page, 1);
    this.appFile.save(function() {
        callback('ok');
    });
};