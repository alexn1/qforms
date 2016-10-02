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
    var self = this;
    self.appFile            = appFile;
    self.appInfo            = qforms.helper.getAppInfoFromData(appFile.filePath, appFile.data);
    self.data               = appFile.data;
    self.name               = self.data['@attributes'].name;
    self.defaultEjsFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/ApplicationController/view/ApplicationView.ejs'
    );
    self.defaultCssFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/ApplicationController/view/ApplicationView.css'
    );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.createPage2 = function(params) {
    var self = this;
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
ApplicationEditor.prototype.save2 = function() {
    var self = this;
    console.log('ApplicationEditor.prototype.save2');
    return self.appFile.save2();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getPageLink = function(name) {
    var self = this;
    return new qforms.PageLinkEditor(self, name);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.setAttr2 = function(name, value) {
    var self = this;
    console.log('ApplicationEditor.prototype.setAttr2');
    self.appFile.setAttr(name, value);
    return self.appFile.save2();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.removePage2 = function(name) {
    var self = this;
    return self.deletePage2(name).then(function () {
        return self.save2();
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getPageByFileName2 = function(relFilePath) {
    var self = this;
    var pageFilePath = path.join(this.appInfo.dirPath, relFilePath);
    var pageFile = new qforms.JsonFile(pageFilePath);
    return pageFile.read2().then(function () {
        return new qforms.PageEditor(self, pageFile);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getPage2 = function(name) {
    var self = this;
    var pageLinkData = self.getPageLinkData(name);
    var relFilePath = pageLinkData['@attributes'].fileName;
    return self.getPageByFileName2(relFilePath);
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
ApplicationEditor.prototype.createCss2 = function(params) {
    var self = this;
    console.log('ApplicationEditor.prototype.createCss2');
    return self.getCustomFilePath2('css').then(function(customCssFilePath) {
        var emptyTemplate = '.' + self.name + ' {\n}';
        return self.createFileByReplace2(customCssFilePath, self.defaultCssFilePath, self.getViewName(), self.name, emptyTemplate);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.createJs2 = function(params) {
    var self = this;
    return self.getCustomFilePath2('js').then(function (customJsFilePath) {
        var tempalteFilePath = path.join(__dirname, 'Application.js.ejs');
        return self.createFileByParams2(customJsFilePath, tempalteFilePath, {
            application: self.appFile.getAttr('name'),
            _class     : self.constructor.name.replace('Editor', '')
        }).then(function (js) {
            return js;
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getCustomDirPath2 = function() {
    var self = this;
    return Promise.resolve(self.appInfo.dirPath);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getCustomFilePath2 = function(ext) {
    var self = this;
    console.log('ApplicationEditor.prototype.getCustomFilePath2');
    return Promise.resolve(path.join(self.appInfo.dirPath, self.name + '.' + ext));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getDataSource = function(name) {
    var self = this;
    var dataSourceData  = self.data.dataSources[name];
    return eval('new qforms.{class}Editor(this, name, dataSourceData)'.replace('{class}', dataSourceData['@class']));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.movePageLinkUp = function(name) {
    var self = this;
    self.data.pageLinks = qforms.helper.moveObjProp(self.data.pageLinks, name, -1);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.movePageLinkDown = function(name) {
    var self = this;
    self.data.pageLinks = qforms.helper.moveObjProp(self.data.pageLinks, name, 1);
};


////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.setDatabaseAttr = function(database, name, value) {
    var self = this;
    self.data.databases[database]['@attributes'][name] = value;
    if (name === 'name') {
        self.data.databases = qforms.helper.replaceKey(self.data.databases, database, value);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.setDatabaseParamAttr = function(database, param, name, value) {
    var self = this;
    self.data.databases[database].params[param]['@attributes'][name] = value;
    if (name === 'name') {
        self.data.databases[database].params = qforms.helper.replaceKey(self.data.databases[database].params, param, value);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.setPageLinkAttr = function(pageLink, name, value) {
    var self = this;
    self.data.pageLinks[pageLink]['@attributes'][name] = value;
    if (name === 'name') {
        self.data.pageLinks = qforms.helper.replaceKey(self.data.pageLinks, pageLink, value);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.newDatabase = function(params) {
    var self = this;
    var name = params['name'];
    if (!self.data.databases) {
        self.data.databases = {};
    }
    if (self.data.databases[name]) {
        throw new Error('Database {name} already exist.'.replace('{name}', name));
    }
    var data = {
        '@class'      : 'Database',
        '@attributes' : {
            'name' : name
        }
    };
    return self.data.databases[name] = data;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.newDatabaseParam = function(params) {
    var self = this;
    var database = params['database'];
    var name     = params['name'];
    var value    = params['value'];
    if (!self.data.databases[database].params) {
        self.data.databases[database].params = {};
    }
    if (self.data.databases[database].params[name]) {
        throw new Error('Param {name} already exist.'.replace('{name}', name));
    }
    return self.data.databases[database].params[name] = {
        '@class'      : 'Param',
        '@attributes' : {
            'name' : name,
            'value': value
        }
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.newPageLink = function(params) {
    var self = this;
    var name = params.name;
    if (!self.data.pageLinks) {
        self.data.pageLinks = {};
    }
    if (self.data.pageLinks[name]) {
        throw new Error('Page Link {name} already exists.'.replace('{name}', name));
    }
    return self.data.pageLinks[params.name] = qforms.PageLinkEditor.createData(params);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.deleteDatabase = function(name) {
    var self = this;
    delete self.data.databases[name];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.deleteDatabaseParam = function($database, $param) {
    var self = this;
    delete self.data.databases[$database].params[$param];
};

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
    var self = this;
    return self.data.databases[database];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getPageLinkData = function(name) {
    var self = this;
    return self.data.pageLinks[name];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.newDataSource = function(params) {
    var self = this;
    var name   = params['name'];
    var _class = params['class'];
    if (!self.data.dataSources) {
        self.data.dataSources = {};
    }
    if (self.data.dataSources[name]) {
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
    return self.data.dataSources[name] = data;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.deleteDataSource = function(dataSource) {
    var self = this;
    delete self.data.dataSources[dataSource];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.setDataSourceAttr = function(dataSource, name, value) {
    var self = this;
    self.data.dataSources[dataSource]['@attributes'][name] = value;
    if (name === 'name') {
        self.data.dataSources = qforms.helper.replaceKey(self.data.dataSources, dataSource, value);
    }
};