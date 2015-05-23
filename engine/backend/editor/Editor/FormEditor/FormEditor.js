'use strict';

module.exports = FormEditor;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var Editor = require('../Editor');

var CheckBoxFieldEditor      = require('../FieldEditor/CheckBoxFieldEditor/CheckBoxFieldEditor');
var ComboBoxFieldEditor      = require('../FieldEditor/ComboBoxFieldEditor/ComboBoxFieldEditor');
var DatePickerFieldEditor    = require('../FieldEditor/DatePickerFieldEditor/DatePickerFieldEditor');
var ImageFieldEditor         = require('../FieldEditor/ImageFieldEditor/ImageFieldEditor');
var LabelFieldEditor         = require('../FieldEditor/LabelFieldEditor/LabelFieldEditor');
var LinkFieldEditor          = require('../FieldEditor/LinkFieldEditor/LinkFieldEditor');
var TextAreaFieldEditor      = require('../FieldEditor/TextAreaFieldEditor/TextAreaFieldEditor');
var TextBoxFieldEditor       = require('../FieldEditor/TextBoxFieldEditor/TextBoxFieldEditor');
var ButtonControlEditor      = require('../ControlEditor/ButtonControlEditor/ButtonControlEditor');

util.inherits(FormEditor, Editor);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function FormEditor(pageEditor, name) {
    this.pageEditor = pageEditor;
    this.name = name;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.getData = function() {
    return this.pageEditor.pageFile.getFormData(this.name);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.setAttr = function(name, value, callback) {
    this.pageEditor.pageFile.setFormAttr(this.name, name, value);
    this.pageEditor.pageFile.save(callback);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.createField = function(params, callback) {
    var self = this;
    var formFieldData = this.pageEditor.pageFile.newFormField(params);
    this.pageEditor.pageFile.save(function() {
        var fieldEditor = self.getField(params.name);
        callback(fieldEditor);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.getField = function(name) {
    var fieldData = this.pageEditor.pageFile.getFormFieldData(this.name, name);
    return eval('new {class}Editor(this, name)'.replace('{class}', fieldData['@class']));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.getControl = function(name) {
    var controlData = this.pageEditor.pageFile.getFormControlData(this.name, name);
    return eval('new {class}Editor(this, name)'.replace('{class}', controlData['@class']));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.removeField = function(name, callback) {
    this.pageEditor.pageFile.deleteFormField(this.name, name);
    this.pageEditor.pageFile.save(callback);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.createControl = function(params, callback) {
    var self = this;
    this.pageEditor.pageFile.newFormControl(params);
    this.pageEditor.pageFile.save(function() {
        var controlEditor = self.getControl(params.name);
        callback(controlEditor);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.removeControl = function(name, callback) {
    this.pageEditor.pageFile.deleteFormControl(this.name, name);
    this.pageEditor.pageFile.save(callback);
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.createFormDirIfNotExists = function(params, callback) {
    var formDirPath   = path.join(
        this.pageEditor.appEditor.appFile.appInfo.dirPath,
        params.page,
        params.form
    );
    fs.exists(formDirPath, function(exists) {
        if (exists) {
            callback();
        } else {
            fs.mkdir(formDirPath, function(err) {
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
FormEditor.prototype.createEjs = function(params, callback) {
    var self = this;
    var customEjsFilePath = path.join(
        this.pageEditor.appEditor.appFile.appInfo.dirPath,
        params.page,
        params.form,
        params.form + '.ejs'
    );
    var replaceTo     = params.page + '-' + params.form;
    var emptyTemplate = params.form;
    this.createFormDirIfNotExists(params, function() {
        self.createFile(customEjsFilePath, self.defaultEjsFilePath, self.getViewName(), replaceTo, emptyTemplate, function(ejs) {
            callback(ejs);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.createCss = function(params, callback) {
    var self = this;
    var customCssFilePath = path.join(
        this.pageEditor.appEditor.appFile.appInfo.dirPath,
        params.page,
        params.form,
        params.form + '.css'
    );
    var replaceTo     =       params.page + '-' + params.form;
    var emptyTemplate = '.' + params.page + '-' + params.form;
    this.createFormDirIfNotExists(params, function() {
        self.createFile(customCssFilePath, self.defaultCssFilePath, self.getViewName(), replaceTo, emptyTemplate, function(css) {
            callback(css);
        });
    });
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.createJs = function(params, callback) {
    var self = this;
    var customJsFilePath = path.join(
        this.pageEditor.appEditor.appFile.appInfo.dirPath,
        params.page,
        params.form,
        params.form + '.js'
    );
    var templateFilePath = path.join(__dirname, 'Form.js.ejs');
    this.createFormDirIfNotExists(params, function() {
        self.createFile2(customJsFilePath, templateFilePath, {
            page : self.pageEditor.pageFile.getAttr('name'),
            form : self.name,
            _class : self.constructor.name.replace('Editor','')
        }, function(js) {
            callback(js);
        });
    });
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FormEditor.prototype.getCustomFilePath = function(params, ext) {
    return path.join(
        this.pageEditor.appEditor.appFile.appInfo.dirPath,
        params.page,
        params.form,
        params.form + '.' + ext
    );
};