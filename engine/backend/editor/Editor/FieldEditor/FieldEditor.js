'use strict';

module.exports = FieldEditor;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var helper = require('../../../common/helper');
var Editor = require('../Editor');

util.inherits(FieldEditor, Editor);

var CheckBoxFieldEditor      = require('./CheckBoxFieldEditor/CheckBoxFieldEditor');
var ComboBoxFieldEditor      = require('./ComboBoxFieldEditor/ComboBoxFieldEditor');
var DatePickerFieldEditor    = require('./DatePickerFieldEditor/DatePickerFieldEditor');
var ImageFieldEditor         = require('./ImageFieldEditor/ImageFieldEditor');
var LabelFieldEditor         = require('./LabelFieldEditor/LabelFieldEditor');
var LinkFieldEditor          = require('./LinkFieldEditor/LinkFieldEditor');
var TextAreaFieldEditor      = require('./TextAreaFieldEditor/TextAreaFieldEditor');
var TextBoxFieldEditor       = require('./TextBoxFieldEditor/TextBoxFieldEditor');

////////////////////////////////////////////////////////////////////////////////////////////////////
function FieldEditor(formEditor, name) {
    this.formEditor = formEditor;
    this.name = name;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.getData = function() {
    return this.formEditor.pageEditor.pageFile.getFormFieldData(this.formEditor.name, this.name);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.setData = function(data, callback) {
    this.formEditor.pageEditor.pageFile.setFormFieldData(this.formEditor.name, this.name, data);
    this.formEditor.pageEditor.pageFile.save(callback);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.setAttr = function(name, value, callback) {
    this.formEditor.pageEditor.pageFile.setFormFieldAttr(this.formEditor.name, this.name, name, value);
    this.formEditor.pageEditor.pageFile.save(callback);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.changeClass = function(newClassName, callback) {
    var data = this.getData();
    var newData = eval("{newClassName}Editor.createData(data['@attributes'])".replace('{newClassName}', newClassName));
    this.setData(newData, function() {
        callback(newData);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.createCustomDirIfNotExists = function(params, callback) {
    var fieldsDirPath  = this.getCollectionPath(params);
    var fieldDirPath   = this.getCustomDirPath(params);
    helper.createDirIfNotExists(fieldsDirPath, function() {
        helper.createDirIfNotExists(fieldDirPath, callback);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.createEjs = function(params, callback) {
    var self = this;
    var formData           = this.formEditor.getData();
    var defaultEjsFilePath = path.join(this.defaultViewDirPath, formData['@class'] + this.getViewName() + '.ejs');
    var customEjsFilePath  = this.getCustomFilePath(params, 'ejs');
    var replaceFrom        = formData['@class'] + this.getViewName();
    var replaceTo          = params.page + '-' + params.form + '-' + params.field;
    this.createCustomDirIfNotExists(params, function() {
        self.createFile(customEjsFilePath, defaultEjsFilePath, replaceFrom, replaceTo, null, function(ejs) {
            callback(ejs);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.createCss = function(params, callback) {
    var self = this;
    var formData = this.formEditor.getData();
    var defaultCssFilePath = path.join(this.defaultViewDirPath, formData['@class'] + this.getViewName() + '.css');
    var customCssFilePath  = this.getCustomFilePath(params, 'css');
    var replaceFrom = formData['@class'] + this.getViewName();
    var replaceTo   = params.page + '-' + params.form + '-' + params.field;
    this.createCustomDirIfNotExists(params, function() {
        self.createFile(customCssFilePath, defaultCssFilePath, replaceFrom, replaceTo, null, function(ejs) {
            callback(ejs);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.createJs = function(params, callback) {
    var self = this;
    var customJsFilePath  = this.getCustomFilePath(params, 'js');
    var templateFilePath = path.join(__dirname, 'Field.js.ejs');
    this.createCustomDirIfNotExists(params, function() {
        self.createFile2(customJsFilePath, templateFilePath, {
            page  : self.formEditor.pageEditor.pageFile.getAttr('name'),
            form  : self.formEditor.name,
            field : self.name,
            _class: self.constructor.name.replace('Editor', '')
        }, function(js) {
            callback(js);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.getCollectionPath = function(params) {
    return path.join(
        this.formEditor.pageEditor.appEditor.appFile.appInfo.dirPath,
        'pages',
        params.page,
        'forms',
        params.form,
        'fields'
    );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.getCustomDirPath = function(params) {
    return path.join(this.getCollectionPath(params), params.field);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.getCustomFilePath = function(params, ext) {
    return path.join(this.getCustomDirPath(params), params.field + '.' + ext);
};