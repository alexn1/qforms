'use strict';

module.exports = FieldEditor;

var util = require('util');
var path = require('path');
var fs   = require('fs');

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
FieldEditor.prototype.createFieldDirIfNotExists = function(params, callback) {
    var fieldDirPath   = path.join(
        this.formEditor.pageEditor.appEditor.appFile.appInfo.dirPath,
        params.page,
        params.form,
        params.field
    );
    fs.exists(fieldDirPath, function(exists) {
        if (exists) {
            callback();
        } else {
            fs.mkdir(fieldDirPath, function(err) {
                if (err) {
                    throw err;
                } else {
                    callback();
                }
            });
        }
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.createEjs = function(params, callback) {
    var self = this;
    var formData = this.formEditor.getData();
    var defaultEjsFilePath = path.join(this.defaultViewDirPath, formData['@class'] + this.getViewName() + '.ejs');
    var customEjsFilePath  = path.join(
        this.formEditor.pageEditor.appEditor.appFile.appInfo.dirPath,
        params.page,
        params.form,
        params.field,
        params.field + '.ejs'
    );
    var replaceFrom = formData['@class'] + this.getViewName();
    var replaceTo   = params.page + '-' + params.form + '-' + params.field;
    this.createFieldDirIfNotExists(params, function() {
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
    var customCssFilePath  = path.join(
        this.formEditor.pageEditor.appEditor.appFile.appInfo.dirPath,
        params.page,
        params.form,
        params.field,
        params.field + '.css'
    );
    var replaceFrom = formData['@class'] + this.getViewName();
    var replaceTo   = params.page + '-' + params.form + '-' + params.field;
    this.createFieldDirIfNotExists(params, function() {
        self.createFile(customCssFilePath, defaultCssFilePath, replaceFrom, replaceTo, null, function(ejs) {
            callback(ejs);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.createJs = function(params, callback) {
    var self = this;
    var customJsFilePath  = path.join(
        this.formEditor.pageEditor.appEditor.appFile.appInfo.dirPath,
        params.page,
        params.form,
        params.field,
        params.field + '.js'
    );
    var templateFilePath = path.join(__dirname, 'Field.js.ejs');

    this.createFieldDirIfNotExists(params, function() {
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
FieldEditor.prototype.getCustomFilePath = function(params, ext, callback) {
    return path.join(
        this.formEditor.pageEditor.appEditor.appFile.appInfo.dirPath,
        params.page,
        params.form,
        params.field,
        params.field + '.' + ext
    );
};