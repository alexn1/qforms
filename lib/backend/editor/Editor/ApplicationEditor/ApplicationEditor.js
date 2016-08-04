'use strict';

module.exports = ApplicationEditor;

var util    = require('util');
var path    = require('path');
var fs      = require('fs');
var Promise = require('bluebird');

var qforms = require('../../../../qforms');
var server = require('../../../../server');

var Editor = require('../Editor');

util.inherits(ApplicationEditor, Editor);

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
            password      : 'admin',
            lang          : 'en'
        },
        databases: {},
        pageLinks: {}
    };
};

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.createAppFile = function(appFilePath, params, callback) {
    var appFile = new qforms.JsonFile(appFilePath);
    appFile.data = ApplicationEditor.createData(params);
    appFile.create(function() {
        callback(appFile);
    });
};
*/

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.createAppFile2 = function(appFilePath, params) {
    return Promise.try(function () {
        var appFile = new qforms.JsonFile(appFilePath);
        appFile.data = ApplicationEditor.createData(params);
        return appFile.create2().then(function() {
            return appFile;
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ApplicationEditor(appFile) {
    this.appFile            = appFile;
    this.appInfo            = qforms.helper.getAppInfoFromData(appFile.filePath, appFile.data);
    this.data               = appFile.data;
    this.name               = this.data['@attributes'].name;
    this.defaultEjsFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/ApplicationController/view/ApplicationView.ejs'
    );
    this.defaultCssFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/ApplicationController/view/ApplicationView.css'
    );
}

/*
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.createPage = function(params, callback) {
    var self           = this;
    var pagesDirPath   = path.join(this.appInfo.dirPath, 'pages');
    var pageDirPath    = path.join(pagesDirPath, params.name);
    var pageFilePath   = path.join(pageDirPath , params.name + '.json');
    qforms.helper.createDirIfNotExists(pagesDirPath, function() {
        qforms.helper.createDirIfNotExists(pageDirPath, function() {
            var pageFile = new qforms.JsonFile(pageFilePath);
            pageFile.data = qforms.PageEditor.createData(params);
            pageFile.create(function() {
                self.newPageLink(params);
                self.save(function() {
                    callback(new qforms.PageEditor(this, pageFile));
                });
            });
        });
    });
};
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.createPage2 = function(params) {
    var self           = this;
    var pagesDirPath   = path.join(this.appInfo.dirPath, 'pages');
    var pageDirPath    = path.join(pagesDirPath, params.name);
    var pageFilePath   = path.join(pageDirPath , params.name + '.json');
    var pageFile;
    return qforms.helper.createDirIfNotExists2(pagesDirPath).then(function() {
        return qforms.helper.createDirIfNotExists2(pageDirPath);
    }).then(function() {
        pageFile = new qforms.JsonFile(pageFilePath);
        pageFile.data = qforms.PageEditor.createData(params);
        return pageFile.create2();
    }).then(function() {
        self.newPageLink(params);
        return self.save2();
    }).then(function() {
        return new qforms.PageEditor(self, pageFile);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.save = function(callback) {
    this.appFile.save(callback);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.save2 = function() {
    var self = this;
    return self.appFile.save2();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getPageLink = function(name) {
    return new qforms.PageLinkEditor(this, name);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.setAttr = function(name, value, callback) {
    var self = this;
    self.appFile.setAttr(name, value);
    self.appFile.save(callback);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.setAttr2 = function(name, value) {
    var self = this;
    self.appFile.setAttr(name, value);
    return self.appFile.save2();
};

/*
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.removePage = function(name, callback) {
    var self = this;
    self.deletePage2(name).then(function () {
        return self.save2();
    }).then(function () {
        callback();
    });
};
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.removePage2 = function(name) {
    var self = this;
    return self.deletePage2(name).then(function () {
        return self.save2();
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getPageByFileName = function(relFilePath, callback) {
    var self         = this;
    var pageFilePath = path.join(this.appInfo.dirPath, relFilePath);
    var pageFile     = new qforms.JsonFile(pageFilePath);
    pageFile.read(function() {
        callback(new qforms.PageEditor(self, pageFile));
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getPage = function(name, callback) {
    var pageLinkData = this.getPageLinkData(name);
    var relFilePath  = pageLinkData['@attributes'].fileName;
    this.getPageByFileName(relFilePath, callback);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.createEjs = function(params, callback) {
    var self = this;
    self.getCustomFilePath2('ejs').then(function (customEjsFilePath) {
        return self.createFileByReplace2(customEjsFilePath, self.defaultEjsFilePath, self.getViewName(), self.name, null).then(function (ejs) {
            callback(ejs);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.createEjs2 = function(params) {
    var self = this;
    console.log('ApplicationEditor.prototype.createEjs2');
    return self.getCustomFilePath2('ejs').then(function (customEjsFilePath) {
        return self.createFileByReplace2(customEjsFilePath, self.defaultEjsFilePath, self.getViewName(), self.name, null);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.createCss = function(params, callback) {
    var self = this;
    this.getCustomFilePath('css', function(customCssFilePath) {
        var emptyTemplate = '.' + self.name + ' {\n}';
        self.createFileByReplace(customCssFilePath, self.defaultCssFilePath, self.getViewName(), self.name, emptyTemplate, function(css) {
            callback(css);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.createCss2 = function(params) {
    var self = this;
    console.log('ApplicationEditor.prototype.createCss2');
    return self.getCustomFilePath2('css').then(function(customCssFilePath) {
        var emptyTemplate = '.' + self.name + ' {\n}';
        return self.createFileByReplace2(customCssFilePath, self.defaultCssFilePath, self.getViewName(), self.name, emptyTemplate);
    });
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.createJs = function(params, callback) {
    var self = this;
    this.getCustomFilePath('js', function(customJsFilePath) {
        var tempalteFilePath = path.join(__dirname, 'Application.js.ejs');
        self.createFileByParams(customJsFilePath, tempalteFilePath, {
            application: self.appFile.getAttr('name'),
            _class: self.constructor.name.replace('Editor', '')
        }, function(js) {
            callback(js);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getCustomDirPath = function(callback) {
    callback(this.appInfo.dirPath);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getCustomDirPath2 = function() {
    var self = this;
    return Promise.resolve(self.appInfo.dirPath);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getCustomFilePath = function(ext, callback) {
    callback(path.join(this.appInfo.dirPath, this.name + '.' + ext));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getCustomFilePath2 = function(ext) {
    var self = this;
    console.log('ApplicationEditor.prototype.getCustomFilePath2');
    return Promise.resolve(path.join(self.appInfo.dirPath, self.name + '.' + ext));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getDataSource = function(name) {
    var dataSourceData  = this.data.dataSources[name];
    return eval('new qforms.{class}Editor(this, name, dataSourceData)'.replace('{class}', dataSourceData['@class']));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.movePageLinkUp = function(name) {
    this.data.pageLinks = qforms.helper.moveObjProp(this.data.pageLinks, name, -1);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.movePageLinkDown = function(name) {
    this.data.pageLinks = qforms.helper.moveObjProp(this.data.pageLinks, name, 1);
};


////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.setDatabaseAttr = function(database, name, value) {
    this.data.databases[database]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.databases = qforms.helper.replaceKey(this.data.databases,
            database,
            value
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.setDatabaseParamAttr = function(database, param, name, value) {
    this.data.databases[database].params[param]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.databases[database].params = qforms.helper.replaceKey(
            this.data.databases[database].params,
            param,
            value
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.setPageLinkAttr = function(pageLink, name, value) {
    this.data.pageLinks[pageLink]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.pageLinks = qforms.helper.replaceKey(this.data.pageLinks, pageLink, value);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.newDatabase = function(params) {
    var name = params['name'];
    if (!this.data.databases) {
        this.data.databases = {};
    }
    if (this.data.databases[name]) {
        throw new Error('Database {name} already exist.'.replace('{name}', name));
    }
    var data = {
        '@class' : 'Database',
        '@attributes' : {
            'name' : name
        }
    };
    return this.data.databases[name] = data;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.newDatabaseParam = function(params) {
    var database = params['database'];
    var name     = params['name'];
    var value    = params['value'];

    if (!this.data.databases[database].params) {
        this.data.databases[database].params = {};
    }
    if (this.data.databases[database].params[name]) {
        throw new Error('Param {name} already exist.'.replace('{name}', name));
    }
    return this.data.databases[database].params[name] = {
        '@class' : 'Param',
        '@attributes' : {
            'name' : name,
            'value' : value
        }
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.newPageLink = function(params) {
    var name = params.name;
    if (!this.data.pageLinks) {
        this.data.pageLinks = {};
    }
    if (this.data.pageLinks[name]) {
        throw new Error('Page Link {name} already exists.'.replace('{name}', name));
    }
    return this.data.pageLinks[params.name] = qforms.PageLinkEditor.createData(params);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.deleteDatabase = function(name) {
    delete this.data.databases[name];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.deleteDatabaseParam = function($database, $param) {
    delete this.data.databases[$database].params[$param];
};

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.deletePage = function(name, callback) {
    var self = this;
    var pageFilePath = path.join(
        this.appInfo.dirPath,
        this.data.pageLinks[name]['@attributes'].fileName
    );
    fs.unlink(pageFilePath, function(err) {
        if (err) {
            throw err;
        } else {
            delete self.data.pageLinks[name];
            callback();
        }
    });
};
*/

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.deletePage2 = function(name) {
    var self = this;
    return new Promise(function (resolve, reject) {
        var pageFilePath = path.join(
            self.appInfo.dirPath,
            self.data.pageLinks[name]['@attributes'].fileName
        );
        fs.unlink(pageFilePath, function(err) {
            if (err) {
                reject(err);
            } else {
                delete self.data.pageLinks[name];
                resolve();
            }
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getDatabaseData = function(database) {
    return this.data.databases[database];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getPageLinkData = function(name) {
    return this.data.pageLinks[name];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.newDataSource = function(params) {
    var name   = params['name'];
    var _class = params['class'];
    if (!this.data.dataSources) {
        this.data.dataSources = {};
    }
    if (this.data.dataSources[name]) {
        throw new Error('Data Source {name} already exist.'.replace('{name}', name));
    }
    var data;
    switch (_class) {
        case 'DataSource':
            data = DataSourceEditor.create(params);
            break;
        case 'SqlDataSource':
            data = qforms.SqlDataSourceEditor.create(params);
            break;
        default:
            throw new Error('Unknown data source class.');
    }
    return this.data.dataSources[name] = data;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.deleteDataSource = function(dataSource) {
    delete this.data.dataSources[dataSource];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.setDataSourceAttr = function(dataSource, name, value) {
    this.data.dataSources[dataSource]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.dataSources = qforms.helper.replaceKey(
            this.data.dataSources,
            dataSource,
            value);
    }
};