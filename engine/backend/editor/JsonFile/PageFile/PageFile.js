'use strict';

module.exports = PageFile;

var util = require('util');

var JsonFile = require('../JsonFile');
var Helper   = require('../../../common/helper');

var CheckBoxFieldEditor     = require('../../Editor/FieldEditor/CheckBoxFieldEditor/CheckBoxFieldEditor');
var ComboBoxFieldEditor     = require('../../Editor/FieldEditor/ComboBoxFieldEditor/ComboBoxFieldEditor');
var DatePickerFieldEditor   = require('../../Editor/FieldEditor/DatePickerFieldEditor/DatePickerFieldEditor');
var ImageFieldEditor        = require('../../Editor/FieldEditor/ImageFieldEditor/ImageFieldEditor');
var LabelFieldEditor        = require('../../Editor/FieldEditor/LabelFieldEditor/LabelFieldEditor');
var LinkFieldEditor         = require('../../Editor/FieldEditor/LinkFieldEditor/LinkFieldEditor');
var TextAreaFieldEditor     = require('../../Editor/FieldEditor/TextAreaFieldEditor/TextAreaFieldEditor');
var TextBoxFieldEditor      = require('../../Editor/FieldEditor/TextBoxFieldEditor/TextBoxFieldEditor');
var SqlDataSourceEditor     = require('../../Editor/DataSourceEditor/SqlDataSourceEditor/SqlDataSourceEditor');

util.inherits(PageFile, JsonFile);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageFile(filePath) {
    PageFile.super_.call(this, filePath);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.setFormAttr = function(form,name,value) {
    this.data.forms[form]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.forms = Helper.replaceKey(this.data.forms,
            form,
            value);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.setFormDataSourceAttr = function(form,dataSource,name,value) {
    this.data.forms[form].dataSources[dataSource]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.forms[form].dataSources = Helper.replaceKey(
            this.data.forms[form].dataSources,
            dataSource,
            value);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.setDataSourceAttr = function(dataSource, name, value) {
    this.data.dataSources[dataSource]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.dataSources = Helper.replaceKey(
            this.data.dataSources,
            dataSource,
            value);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.setFormDataSourceKeyColumnAttr = function(form,dataSource,keyColumn,name,value) {
    this.data.forms[form].dataSources[dataSource].keyColumns[keyColumn]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.forms[form].dataSources[dataSource].keyColumns = Helper.replaceKey(
            this.data.forms[form].dataSources[dataSource].keyColumns,
            keyColumn,
            value);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.setFormDataSourceParentKeyColumnAttr = function(form,dataSource,parentKeyColumn,name,value) {
    this.data.forms[form].dataSources[dataSource].parentKeyColumns[parentKeyColumn]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.forms[form].dataSources[dataSource].parentKeyColumns = Helper.replaceKey(
            this.data.forms[form].dataSources[dataSource].parentKeyColumns,
            parentKeyColumn,
            value);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.setFormFieldAttr = function(form,field,name,value) {
    this.data.forms[form].fields[field]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.forms[form].fields = Helper.replaceKey(
            this.data.forms[form].fields,
            field,
            value
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.setFormControlAttr = function(form,control,name,value) {
    this.data.forms[form].controls[control]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.forms[form].controls = Helper.replaceKey(
            this.data.forms[form].controls,
            control,
            value
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.newForm = function(params) {
    var name   = params['name'];
    var _class = params['class'];
    if (!this.data.forms) {
        this.data.forms = {};
    }
    if (this.data.forms[name]) {
        throw new Error('Form {name} already exist.'.replace('{name}',name));
    }
    var data;
    switch (_class) {
        case 'TableForm':
            data = {
                "@class"        : 'TableForm',
                "@attributes"   : {
                    name              : name,
                    caption           : params.caption ? params.caption : name,
                    editMethod        : 'disabled',
                    itemEditPage      : '',
                    itemCreatePage    : '',
                    newRowMode        : 'disabled',
                    deleteRowMode     : 'disabled'
                },
                dataSources   : {},
                fields        : {},
                controls      : {}
            };
            break;
        case 'RowForm':
            data = {
                "@class":'RowForm',
                "@attributes": {
                    "name":name,
                    "caption":params.caption ? params.caption : name
                },
                'dataSources' : {},
                'fields' : {},
                'controls' : {}
            };
            break;
        case "TreeForm":
            data = {
                "@class":"TreeForm",
                "@attributes": {
                    "name":name,
                    "caption":(params.caption) && params.caption ? params.caption : name,
                    "itemEditPage":''
                },
                'dataSources' : {},
                'fields' : {},
                'controls' : {}
            };
            break;
    }
    return this.data.forms[name] = data;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.newFormControl = function(params) {
    var form   = params['form'];
    var name   = params['name'];
    var _class = params['class'];
    if (!this.data.forms[form].controls) {
        this.data.forms[form].controls = {};
    }
    if (this.data.forms[form].controls[name]) {
        throw new Error('Control {name} already exist.'.repalce('{name}', name));
    }
    var data;
    switch (_class) {
        case "ButtonControl":
            data = {
                "@class":"ButtonControl",
                "@attributes": {
            'name':name,
            'caption' : (params.caption) && params.caption ? params.caption : name,
            'isVisible':"true",
            'width':"0"
                }
            };
            break;
    }
    return this.data.forms[form].controls[name] = data;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.newFormField = function(params) {
    var form   = params['form'];
    var name   = params['name'];
    var _class = params['class'];

    if (!this.data.forms[form].fields) {
        this.data.forms[form].fields = {};
    }
    if (this.data.forms[form].fields[name]) {
        throw new Error('Field {name} already exist.'.replace('{name}', name));
    }
    var data;
    switch (_class) {
        case "TextBoxField":
            data = TextBoxFieldEditor.createData(params);
            break;
        case "LinkField":
            data = LinkFieldEditor.createData(params);
            break;
        case "ComboBoxField":
            data = ComboBoxFieldEditor.createData(params);
            break;
        case "TextAreaField":
            data = TextAreaFieldEditor.createData(params);
            break;
        case "ImageField":
            data = ImageFieldEditor.createData(params);
            break;
        case "LabelField":
            data = LabelFieldEditor.createData(params);
            break;
        case "DatePickerField":
            data = DatePickerFieldEditor.createData(params);
            break;
        case "CheckBoxField":
            data = CheckBoxFieldEditor.createData(params);
            break;
    }
    return this.data.forms[form].fields[name] = data;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.newDataSource = function(params) {
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
        case "SqlDataSource":
            data = SqlDataSourceEditor.create(params);
            break;
        default:
            throw new Error('Unknown data source class.');
    }
    return this.data.dataSources[name] = data;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.newFormDataSource = function(params) {
    var form   = params['form'];
    var name   = params['name'];
    var _class = params['class'];
    if (!this.data.forms[form].dataSources) {
        this.data.forms[form].dataSources = {};
    }
    if (this.data.forms[form].dataSources[name]) {
        throw new Error('Data Source {name} already exist.'.replace('{name}', name));
    }
    var data;
    switch (_class) {
        case "SqlDataSource":
            data = SqlDataSourceEditor.create(params);
            break;
        default:
            throw new Error('Unknown data source class.');
    }
    return this.data.forms[form].dataSources[name] = data;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.newFormDataSouceKeyColumn = function(params) {
    var form       = params['form'];
    var dataSource = params['dataSource'];
    var name       = params['name'];
    if (!this.data.forms[form].dataSources[dataSource].keyColumns) {
        this.data.forms[form].dataSources[dataSource].keyColumns = {};
    }
    if (this.data.forms[form].dataSources[dataSource].keyColumns[name]) {
        throw  new Error('Key Column {name} already exist.'.replace('{name}', name));
    }
    return this.data.forms[form].dataSources[dataSource].keyColumns[name] = {
        "@class":"KeyColumn",
        "@attributes": {
            'name':name
        }
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.newFormDataSouceParentKeyColumn = function(params) {
    var form       = params['form'];
    var dataSource = params['dataSource'];
    var name       = params['name'];
    if (!(this.data.forms[form].dataSources[dataSource].parentKeyColumns)) {
        this.data.forms[form].dataSources[dataSource].parentKeyColumns = {};
    }
    if ((this.data.forms[form].dataSources[dataSource].parentKeyColumns[name])) {
        throw new Error('Parent Key Column {name} already exist.'.replace('{name}', name));
    }
    return this.data.forms[form].dataSources[dataSource].parentKeyColumns[name] = {
        "@class" : "ParentKeyColumn",
        "@attributes" : {
        'name' : name
        }
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.deleteForm = function(name) {
    delete this.data.forms[name];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.deleteFormField = function(form,field) {
    delete this.data.forms[form].fields[field];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.deleteFormControl = function(form,name) {
    delete this.data.forms[form].controls[name];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.deleteFormDataSource = function(form,dataSource) {
    delete this.data.forms[form].dataSources[dataSource];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.deleteDataSource = function(dataSource) {
    delete this.data.dataSources[dataSource];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.deleteFormDataSourceKeyColumn = function(form,dataSource,keyColumn) {
    delete this.data.forms[form].dataSources[dataSource].keyColumns[keyColumn];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.deleteFormDataSourceParentKeyColumn = function(form,dataSource,parentKeyColumn) {
    delete this.data.forms[form].dataSources[dataSource].parentKeyColumns[parentKeyColumn];
};


////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.getForms = function() {
    return this.data.forms;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.setForms = function(forms) {
    this.data.forms = forms;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.getFormData = function(name) {
    return this.data.forms[name];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.getFormFields = function(name) {
    return this.data.forms[name].fields;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.setFormFields = function(name, fields) {
    this.data.forms[name].fields = fields;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.getFormFieldData = function(form,name) {
    return this.data.forms[form].fields[name];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.setFormFieldData = function(form,name,data) {
    this.data.forms[form].fields[name] = data;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageFile.prototype.getFormControlData = function(form,name) {
    return this.data.forms[form].controls[name];
};