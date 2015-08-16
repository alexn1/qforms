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
var JsonFile            = require('../../JsonFile/JsonFile');
var SqlDataSourceEditor = require('../../Editor/DataSourceEditor/SqlDataSourceEditor/SqlDataSourceEditor');

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
ApplicationEditor.create = function(appFilePath, name, callback) {
    var appFile = new JsonFile(appFilePath);
    appFile.data = ApplicationEditor.createData({name: name});
    appFile.create(callback);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ApplicationEditor(appFile, appInfo) {
    this.appFile            = appFile;
    this.appInfo            = appInfo;
    this.data               = appFile.data;
    this.name               = this.data['@attributes'].name;
    this.defaultEjsFilePath = path.join(
        qforms.get('public'),
        'viewer/class/Controller/ModelController/ApplicationController/view/ApplicationView.ejs'
    );
    this.defaultCssFilePath = path.join(
        qforms.get('public'),
        'viewer/class/Controller/ModelController/ApplicationController/view/ApplicationView.css'
    );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.createPage = function(params, callback) {
    var self           = this;
    var pagesDirPath   = path.join(this.appInfo.dirPath, 'pages');
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
            self.newPageLink(params);
            self.save(function() {
                var pageFile = new JsonFile(pageFilePath);
                pageFile.read(function() {
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
ApplicationEditor.prototype.save = function(callback) {
    this.appFile.save(callback);
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
    this.deletePage(name, function() {
        self.save(callback);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getPageByFileName = function(relFilePath, callback) {
    var self         = this;
    var pageFilePath = path.join(this.appInfo.dirPath, relFilePath);
    var pageFile     = new JsonFile(pageFilePath);
    pageFile.read(function() {
        callback(new PageEditor(self, pageFile));
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
    this.getCustomFilePath('ejs', function(customEjsFilePath) {
        self.createFile(customEjsFilePath, self.defaultEjsFilePath, self.getViewName(), self.name, null, function(ejs) {
            callback(ejs);
        });
    });

};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.createCss = function(params, callback) {
    var self = this;
    this.getCustomFilePath('css', function(customCssFilePath) {
        var emptyTemplate = '.' + self.name + ' {\n}';
        self.createFile(customCssFilePath, self.defaultCssFilePath, self.getViewName(), self.name, emptyTemplate, function(css) {
            callback(css);
        });
    });
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.createJs = function(params, callback) {
    var self = this;
    this.getCustomFilePath('js', function(customJsFilePath) {
        var tempalteFilePath = path.join(__dirname, 'Application.js.ejs');
        self.createFile2(customJsFilePath, tempalteFilePath, {
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
ApplicationEditor.prototype.getCustomFilePath = function(ext, callback) {
    callback(path.join(this.appInfo.dirPath, this.name + '.' + ext));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.getDataSource = function(name) {
    var dataSourceData  = this.data.dataSources[name];
    return eval('new {class}Editor(this, name, dataSourceData)'.replace('{class}', dataSourceData['@class']));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.movePageLinkUp = function(name) {
    this.data.pageLinks = helper.moveObjProp(this.data.pageLinks, name, -1);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.movePageLinkDown = function(name) {
    this.data.pageLinks = helper.moveObjProp(this.data.pageLinks, name, 1);
};


////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.setDatabaseAttr = function(database, name, value) {
    this.data.databases[database]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.databases = helper.replaceKey(this.data.databases,
            database,
            value
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.setDatabaseParamAttr = function(database, param, name, value) {
    this.data.databases[database].params[param]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.databases[database].params = helper.replaceKey(
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
        this.data.pageLinks = helper.replaceKey(this.data.pageLinks, pageLink, value);
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
    var name    = params.name;
    var menu    = params.menu;
    var startup = params.startup;

    if (!this.data.pageLinks) {
        this.data.pageLinks = {};
    }
    if (this.data.pageLinks[name]) {
        throw new Error('Page Link {name} already exist.'.replace('{name}', name));
    }
    return this.data.pageLinks[name] = {
        '@class' : 'PageLink',
        '@attributes' : {
            'name' : name,
            'fileName' : 'pages/{name}/{name}.json'.replace(/\{name\}/g, name),
            'menu' : menu,
            'startup' : startup
        }
    };
};


////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.deleteDatabase = function(name) {
    delete this.data.databases[name];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationEditor.prototype.deleteDatabaseParam = function($database, $param) {
    delete this.data.databases[$database].params[$param];
};

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
            data = SqlDataSourceEditor.create(params);
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
        this.data.dataSources = helper.replaceKey(
            this.data.dataSources,
            dataSource,
            value);
    }
};