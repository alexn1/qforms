'use strict';

module.exports = FieldEditor;

var util = require('util');
var path = require('path');
var fs   = require('fs');

var qforms = require('../../../../qforms');

var Editor = require('../Editor');

util.inherits(FieldEditor, Editor);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FieldEditor(formEditor, name) {
    this.formEditor = formEditor;
    this.parent     = formEditor;
    this.name       = name;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.getData = function() {
    return this.parent.data.fields[this.name];
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.setData = function(data, callback) {
    this.parent.data.fields[this.name] = data;
    this.formEditor.pageEditor.save(callback);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.setAttr = function(name, value, callback) {
    this.formEditor.setFieldAttr(this.name, name, value);
    this.formEditor.pageEditor.save(callback);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.changeClass = function(newClassName, callback) {
    var data = this.getData();
    var newData = eval("qforms.{newClassName}Editor.createData(data['@attributes'])".replace('{newClassName}', newClassName));
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
        self.createFileByReplace(customEjsFilePath, defaultEjsFilePath, replaceFrom, replaceTo, null, function(ejs) {
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
        self.createFileByReplace(customCssFilePath, defaultCssFilePath, replaceFrom, replaceTo, null, function(ejs) {
            callback(ejs);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.createJs = function(params, callback) {
    var self = this;
    var templateFilePath = path.join(__dirname, 'Field.js.ejs');
    this.getCustomFilePath('js', function(customJsFilePath) {
        self.createFileByParams(customJsFilePath, templateFilePath, {
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
        qforms.helper.createDirIfNotExists(dirPath, function() {
            callback(dirPath);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.getCollectionDirPath2 = function() {
    var self = this;
    return self.parent.getCustomDirPath2().then(function (customDirPath) {
        var dirPath = path.join(customDirPath, 'fields');
        return qforms.helper.createDirIfNotExists2(dirPath).then(function () {
            return dirPath;
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.getCustomDirPath = function(callback) {
    var self = this;
    this.getCollectionDirPath(function(collectionDirPath) {
        var dirPath = path.join(collectionDirPath, self.name);
        qforms.helper.createDirIfNotExists(dirPath, function() {
            callback(dirPath);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.getCustomDirPath2 = function() {
    var self = this;
    self.getCollectionDirPath2().then(function (collectionDirPath) {
        var dirPath = path.join(collectionDirPath, self.name);
        return qforms.helper.createDirIfNotExists2(dirPath).then(function () {
            return dirPath;
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
FieldEditor.prototype.getCustomFilePath2 = function(ext) {
    var self = this;
    self.getCustomDirPath2().then(function (customDirPath) {
        return path.join(customDirPath, self.name + '.' + ext);
    });
};