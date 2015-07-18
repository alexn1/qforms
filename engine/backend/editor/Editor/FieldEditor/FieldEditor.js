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
    this.parent     = formEditor;
    this.name       = name;
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
FieldEditor.prototype.createEjs = function(params, callback) {
    var self = this;
    var formData           = this.formEditor.getData();
    var defaultEjsFilePath = path.join(this.defaultViewDirPath, formData['@class'] + this.getViewName() + '.ejs');
    this.getCustomFilePath('ejs', function(customEjsFilePath) {
        var replaceFrom        = formData['@class'] + self.getViewName();
        var replaceTo          = params.page + '-' + params.form + '-' + params.field;
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
    this.getCustomFilePath('css', function(customCssFilePath) {
        var replaceFrom = formData['@class'] + self.getViewName();
        var replaceTo   = params.page + '-' + params.form + '-' + params.field;
        self.createFile(customCssFilePath, defaultCssFilePath, replaceFrom, replaceTo, null, function(ejs) {
            callback(ejs);
        });
    });

};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.createJs = function(params, callback) {
    var self = this;
    var templateFilePath = path.join(__dirname, 'Field.js.ejs');
    this.getCustomFilePath('js', function(customJsFilePath) {
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
FieldEditor.prototype.getCollectionDirPath = function(callback) {
    this.parent.getCustomDirPath(function(customDirPath) {
        var dirPath = path.join(customDirPath, 'fields');
        helper.createDirIfNotExists(dirPath, function() {
            callback(dirPath);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.getCustomDirPath = function(callback) {
    var self = this;
    this.getCollectionDirPath(function(collectionDirPath) {
        var dirPath = path.join(collectionDirPath, self.name);
        helper.createDirIfNotExists(dirPath, function() {
            callback(dirPath);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.getCustomFilePath = function(ext, callback) {
    var self = this;
    this.getCustomDirPath(function(customDirPath) {
        callback(path.join(customDirPath, self.name + '.' + ext));
    });
};