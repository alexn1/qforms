'use strict';

module.exports = FormEditor;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var qforms = require('../../../../qforms');

var Editor = require('../Editor');

util.inherits(FormEditor, Editor);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function FormEditor(pageEditor, name, data) {
    this.pageEditor = pageEditor;
    this.parent     = pageEditor;
    this.name       = name;
    this.data       = data;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.getData = function() {
    return this.data;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.setAttr = function(name, value, callback) {
    this._setAttr(name, value);
    this.pageEditor.save(callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype._setAttr = function(name, value) {
    this.data['@attributes'][name] = value;
    if (name === 'name') {
        this.parent.data.forms = qforms.helper.replaceKey(this.parent.data.forms,
            this.name,
            value);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.newField = function(params) {
    var name = params['name'];
    if (!this.data.fields) {
        this.data.fields = {};
    }
    if (this.data.fields[name]) {
        throw new Error('Field {name} already exist.'.replace('{name}', name));
    }
    return this.data.fields[name] = eval('qforms.{class}Editor.createData(params);'.replace('{class}', params['class']));
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.moveFieldUp = function(params, callback) {
    this.data.fields = qforms.helper.moveObjProp(this.data.fields, params.field, -1);
    this.pageEditor.save(function() {
        callback('ok');
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.moveFieldDown = function(params, callback) {
    this.data.fields = qforms.helper.moveObjProp(this.data.fields, params.field, 1);
    this.pageEditor.save(function() {
        callback('ok');
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.getDataSource = function(name) {
    var dataSourceData  = this.data.dataSources[name];
    return eval('new qforms.{class}Editor(this, name, dataSourceData)'.replace('{class}', dataSourceData['@class']));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.getField = function(name) {
    var fieldData = this.data.fields[name];
    return eval('new qforms.{class}Editor(this, name)'.replace('{class}', fieldData['@class']));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.getControl = function(name) {
    var controlData = this.data.controls[name];
    return eval('new qforms.{class}Editor(this, name)'.replace('{class}', controlData['@class']));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.removeField = function(name, callback) {
    delete this.data.fields[name];
    this.pageEditor.save(callback);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.createControl = function(params, callback) {
    var self = this;
    this.newControl(params);
    this.pageEditor.save(function() {
        var controlEditor = self.getControl(params.name);
        callback(controlEditor);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.newControl = function(params) {
    var name   = params.name;
    if (!this.data.controls) {
        this.data.controls = {};
    }
    if (this.data.controls[name]) {
        throw new Error('Control {name} already exist.'.repalce('{name}', name));
    }
    return this.data.controls[name] = eval('qforms.{class}Editor.createData(params);'.replace('{class}', params['class']));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.removeControl = function(name, callback) {
    delete this.data.controls[name];
    this.pageEditor.save(callback);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.createEjs = function(params, callback) {
    var self = this;
    this.getCustomFilePath('ejs', function(customEjsFilePath) {
        var replaceTo         = params.page + '-' + params.form;
        var emptyTemplate     = params.form;
        self.createFileByReplace(customEjsFilePath, self.defaultEjsFilePath, self.getViewName(), replaceTo, emptyTemplate, function(ejs) {
            callback(ejs);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.createCss = function(params, callback) {
    var self = this;
    this.getCustomFilePath('css', function(customCssFilePath) {
        var replaceTo         =       params.page + '-' + params.form;
        var emptyTemplate     = '.' + params.page + '-' + params.form;
        self.createFileByReplace(customCssFilePath, self.defaultCssFilePath, self.getViewName(), replaceTo, emptyTemplate, function(css) {
            callback(css);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.createJs = function(params, callback) {
    var self = this;
    var templateFilePath = path.join(__dirname, 'Form.js.ejs');
    this.getCustomFilePath('js', function(customJsFilePath) {
        self.createFileByParams(customJsFilePath, templateFilePath, {
            page : self.pageEditor.pageFile.getAttr('name'),
            form : self.name,
            _class : self.constructor.name.replace('Editor', '')
        }, function(js) {
            callback(js);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.createJs2 = function(params) {
    var self = this;
    var templateFilePath = path.join(__dirname, 'Form.js.ejs');
    return self.getCustomFilePath2('js').then(function (customJsFilePath) {
        return self.createFileByParams2(customJsFilePath, templateFilePath, {
            page  : self.pageEditor.pageFile.getAttr('name'),
            form  : self.name,
            _class: self.constructor.name.replace('Editor', '')
        }).then(function (js) {
            return js;
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.getCollectionDirPath = function(callback) {
    this.parent.getCustomDirPath(function(customDirPath) {
        var dirPath = path.join(customDirPath, 'forms');
        qforms.helper.createDirIfNotExists(dirPath, function() {
            callback(dirPath);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.getCollectionDirPath2 = function() {
    var self = this;
    self.parent.getCustomDirPath2().then(function (customDirPath) {
        var dirPath = path.join(customDirPath, 'forms');
        return qforms.helper.createDirIfNotExists2(dirPath).then(function () {
            return dirPath;
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.getCustomDirPath = function(callback) {
    var self = this;
    this.getCollectionDirPath(function(collectionDirPath) {
        var dirPath = path.join(collectionDirPath, self.name);
        qforms.helper.createDirIfNotExists(dirPath, function() {
            callback(dirPath);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.getCustomDirPath2 = function() {
    var self = this;
    return self.getCollectionDirPath2().then(function (collectionDirPath) {
        var dirPath = path.join(collectionDirPath, self.name);
        return qforms.helper.createDirIfNotExists2(dirPath).then(function() {
            return dirPath;
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.getCustomFilePath = function(ext, callback) {
    var self = this;
    this.getCustomDirPath(function(customDirPath) {
        callback(path.join(customDirPath, self.name + '.' + ext));
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.getCustomFilePath2 = function(ext) {
    var self = this;
    return self.getCustomDirPath2().then(function (customDirPath) {
        return path.join(customDirPath, self.name + '.' + ext);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.newDataSource = function(params) {
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
            data = qforms.DataSourceEditor.create(params);
            break;
        case 'SqlDataSource':
            data = qforms.SqlDataSourceEditor.create(params);
            break;
        default:
            throw new Error('Unknown data source class.');
    }
    this.data.dataSources[name] = data;
    return this.getDataSource(name);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.newDataSouceKeyColumn = function(params) {
    var dataSource = params['dataSource'];
    var name       = params['name'];
    if (!this.data.dataSources[dataSource].keyColumns) {
        this.data.dataSources[dataSource].keyColumns = {};
    }
    if (this.data.dataSources[dataSource].keyColumns[name]) {
        throw  new Error('Key Column {name} already exist.'.replace('{name}', name));
    }
    return this.data.dataSources[dataSource].keyColumns[name] = {
        '@class':'KeyColumn',
        '@attributes': {
            'name':name
        }
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.newDataSouceParentKeyColumn = function(params) {
    var dataSource = params['dataSource'];
    var name       = params['name'];
    if (!(this.data.dataSources[dataSource].parentKeyColumns)) {
        this.data.dataSources[dataSource].parentKeyColumns = {};
    }
    if ((this.data.dataSources[dataSource].parentKeyColumns[name])) {
        throw new Error('Parent Key Column {name} already exist.'.replace('{name}', name));
    }
    return this.data.dataSources[dataSource].parentKeyColumns[name] = {
        '@class' : 'ParentKeyColumn',
        '@attributes' : {
            'name' : name
        }
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.setDataSourceAttr = function(dataSource, name, value) {
    this.data.dataSources[dataSource]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.dataSources = qforms.helper.replaceKey(
            this.data.dataSources,
            dataSource,
            value);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.setDataSourceKeyColumnAttr = function(dataSource, keyColumn, name, value) {
    this.data.dataSources[dataSource].keyColumns[keyColumn]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.dataSources[dataSource].keyColumns = qforms.helper.replaceKey(
            this.data.dataSources[dataSource].keyColumns,
            keyColumn,
            value);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.setDataSourceParentKeyColumnAttr = function(dataSource, parentKeyColumn, name, value) {
    this.data.dataSources[dataSource].parentKeyColumns[parentKeyColumn]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.dataSources[dataSource].parentKeyColumns = qforms.helper.replaceKey(
            this.data.dataSources[dataSource].parentKeyColumns,
            parentKeyColumn,
            value);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.setFieldAttr = function(field, name, value) {
    this.data.fields[field]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.fields = qforms.helper.replaceKey(
            this.data.fields,
            field,
            value
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.setControlAttr = function(control, name, value) {
    this.data.controls[control]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.controls = qforms.helper.replaceKey(
            this.data.controls,
            control,
            value
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.deleteFormDataSource = function(dataSource) {
    delete this.data.dataSources[dataSource];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.deleteFormDataSourceKeyColumn = function(dataSource, keyColumn) {
    delete this.data.dataSources[dataSource].keyColumns[keyColumn];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.deleteFormDataSourceParentKeyColumn = function(dataSource, parentKeyColumn) {
    delete this.data.dataSources[dataSource].parentKeyColumns[parentKeyColumn];
};

