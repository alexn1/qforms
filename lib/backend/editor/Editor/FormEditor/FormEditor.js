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
    var self = this;
    self.pageEditor = pageEditor;
    self.parent     = pageEditor;
    self.name       = name;
    self.data       = data;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.getData = function() {
    var self = this;
    return self.data;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.setAttr = function(name, value) {
    var self = this;
    self._setAttr(name, value);
    return self.pageEditor.save();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype._setAttr = function(name, value) {
    var self = this;
    self.data['@attributes'][name] = value;
    if (name === 'name') {
        self.parent.data.forms = qforms.helper.replaceKey(self.parent.data.forms, self.name, value);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.newField = function(params) {
    var self = this;
    var name = params['name'];
    if (!self.data.fields) {
        self.data.fields = {};
    }
    if (self.data.fields[name]) {
        throw new Error('Field {name} already exist.'.replace('{name}', name));
    }
    return self.data.fields[name] = eval('qforms.{class}Editor.createData(params);'.replace('{class}', params['class']));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.moveFieldUp2 = function(params) {
    var self = this;
    self.data.fields = qforms.helper.moveObjProp(self.data.fields, params.field, -1);
    return self.pageEditor.save().then(function () {
        return 'ok';
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.moveFieldDown2 = function(params) {
    var self = this;
    self.data.fields = qforms.helper.moveObjProp(self.data.fields, params.field, 1);
    return self.pageEditor.save().then(function () {
        return 'ok';
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.getDataSource = function(name) {
    var self = this;
    var dataSourceData  = self.data.dataSources[name];
    return eval('new qforms.{class}Editor(this, name, dataSourceData)'.replace('{class}', dataSourceData['@class']));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.getField = function(name) {
    var self = this;
    var fieldData = self.data.fields[name];
    return eval('new qforms.{class}Editor(this, name)'.replace('{class}', fieldData['@class']));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.getControl = function(name) {
    var self = this;
    var controlData = self.data.controls[name];
    return eval('new qforms.{class}Editor(this, name)'.replace('{class}', controlData['@class']));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.removeField2 = function(name) {
    var self = this;
    delete self.data.fields[name];
    return self.pageEditor.save();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.createControl2 = function(params) {
    var self = this;
    self.newControl(params);
    return self.pageEditor.save().then(function () {
        var controlEditor = self.getControl(params.name);
        return controlEditor;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.newControl = function(params) {
    var self = this;
    var name = params.name;
    if (!self.data.controls) {
        self.data.controls = {};
    }
    if (self.data.controls[name]) {
        throw new Error('Control {name} already exist.'.repalce('{name}', name));
    }
    return self.data.controls[name] = eval('qforms.{class}Editor.createData(params);'.replace('{class}', params['class']));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.removeControl2 = function(name) {
    var self = this;
    delete self.data.controls[name];
    return self.pageEditor.save();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.createEjs = function(params) {
    var self = this;
    return self.getCustomFilePath2('ejs').then(function (customEjsFilePath) {
        var replaceTo     = params.page + '-' + params.form;
        var emptyTemplate = params.form;
        return self.createFileByReplace(customEjsFilePath, self.defaultEjsFilePath, self.getViewName(), replaceTo, emptyTemplate).then(function (ejs) {
            return ejs;
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.createCss = function(params) {
    var self = this;
    return self.getCustomFilePath2('css').then(function (customCssFilePath) {
        var replaceTo     =       params.page + '-' + params.form;
        var emptyTemplate = '.' + params.page + '-' + params.form;
        return self.createFileByReplace(customCssFilePath, self.defaultCssFilePath, self.getViewName(), replaceTo, emptyTemplate).then(function (css) {
            return css;
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.createJs2 = function(params) {
    var self = this;
    var templateFilePath = path.join(__dirname, 'Form.js.ejs');
    return self.getCustomFilePath2('js').then(function (customJsFilePath) {
        return self.createFileByParams(customJsFilePath, templateFilePath, {
            page  : self.pageEditor.pageFile.getAttr('name'),
            form  : self.name,
            _class: self.constructor.name.replace('Editor', '')
        }).then(function (js) {
            return js;
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.getCollectionDirPath2 = function() {
    var self = this;
    return self.parent.getCustomDirPath2().then(function (customDirPath) {
        var dirPath = path.join(customDirPath, 'forms');
        return qforms.helper.createDirIfNotExists(dirPath).then(function () {
            return dirPath;
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.getCustomDirPath2 = function() {
    var self = this;
    return self.getCollectionDirPath2().then(function (collectionDirPath) {
        var dirPath = path.join(collectionDirPath, self.name);
        return qforms.helper.createDirIfNotExists(dirPath).then(function() {
            return dirPath;
        });
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
            data = qforms.DataSourceEditor.create(params);
            break;
        case 'SqlDataSource':
            data = qforms.SqlDataSourceEditor.create(params);
            break;
        default:
            throw new Error('Unknown data source class.');
    }
    self.data.dataSources[name] = data;
    return self.getDataSource(name);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.newDataSouceKeyColumn = function(params) {
    var self = this;
    var dataSource = params['dataSource'];
    var name       = params['name'];
    if (!self.data.dataSources[dataSource].keyColumns) {
        self.data.dataSources[dataSource].keyColumns = {};
    }
    if (self.data.dataSources[dataSource].keyColumns[name]) {
        throw new Error('Key Column {name} already exist.'.replace('{name}', name));
    }
    return self.data.dataSources[dataSource].keyColumns[name] = {
        '@class'     : 'KeyColumn',
        '@attributes': {
            'name': name
        }
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.newDataSouceParentKeyColumn = function(params) {
    var self = this;
    var dataSource = params['dataSource'];
    var name       = params['name'];
    if (!(self.data.dataSources[dataSource].parentKeyColumns)) {
        self.data.dataSources[dataSource].parentKeyColumns = {};
    }
    if ((self.data.dataSources[dataSource].parentKeyColumns[name])) {
        throw new Error('Parent Key Column {name} already exist.'.replace('{name}', name));
    }
    return self.data.dataSources[dataSource].parentKeyColumns[name] = {
        '@class'     : 'ParentKeyColumn',
        '@attributes': {
            'name': name
        }
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.setDataSourceAttr = function(dataSource, name, value) {
    var self = this;
    self.data.dataSources[dataSource]['@attributes'][name] = value;
    if (name === 'name') {
        self.data.dataSources = qforms.helper.replaceKey(self.data.dataSources, dataSource, value);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.setDataSourceKeyColumnAttr = function(dataSource, keyColumn, name, value) {
    var self = this;
    self.data.dataSources[dataSource].keyColumns[keyColumn]['@attributes'][name] = value;
    if (name === 'name') {
        self.data.dataSources[dataSource].keyColumns = qforms.helper.replaceKey(
            self.data.dataSources[dataSource].keyColumns,
            keyColumn,
            value
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.setDataSourceParentKeyColumnAttr = function(dataSource, parentKeyColumn, name, value) {
    var self = this;
    self.data.dataSources[dataSource].parentKeyColumns[parentKeyColumn]['@attributes'][name] = value;
    if (name === 'name') {
        self.data.dataSources[dataSource].parentKeyColumns = qforms.helper.replaceKey(
            self.data.dataSources[dataSource].parentKeyColumns,
            parentKeyColumn,
            value
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.setFieldAttr = function(field, name, value) {
    var self = this;
    self.data.fields[field]['@attributes'][name] = value;
    if (name === 'name') {
        self.data.fields = qforms.helper.replaceKey(self.data.fields, field, value);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.setControlAttr = function(control, name, value) {
    var self = this;
    self.data.controls[control]['@attributes'][name] = value;
    if (name === 'name') {
        self.data.controls = qforms.helper.replaceKey(self.data.controls, control, value);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.deleteFormDataSource = function(dataSource) {
    var self = this;
    delete self.data.dataSources[dataSource];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.deleteFormDataSourceKeyColumn = function(dataSource, keyColumn) {
    var self = this;
    delete self.data.dataSources[dataSource].keyColumns[keyColumn];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.deleteFormDataSourceParentKeyColumn = function(dataSource, parentKeyColumn) {
    var self = this;
    delete self.data.dataSources[dataSource].parentKeyColumns[parentKeyColumn];
};