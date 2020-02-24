'use strict';

var util = require('util');
var path = require('path');
var fs   = require('fs');

var qforms = require('../../../../qforms');
var Editor = require('../Editor');


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class FieldEditor extends Editor {

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(formEditor, name) {
        super();
        var self = this;
        self.formEditor = formEditor;
        self.parent     = formEditor;
        self.name       = name;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getData() {
        var self = this;
        return self.parent.data.fields[self.name];
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    setData(data) {
        var self = this;
        self.parent.data.fields[self.name] = data;
        return self.formEditor.pageEditor.save();
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    setAttr(name, value) {
        var self = this;
        self.formEditor.setFieldAttr(self.name, name, value);
        return self.formEditor.pageEditor.save();
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    changeClass(newClassName) {
        var self = this;
        var data = this.getData();
        var newData = eval("qforms.{newClassName}Editor.createData(data['@attributes'])".replace('{newClassName}', newClassName));
        return self.setData(newData).then(function () {
            return newData;
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    createEjs(params) {
        var self = this;
        var formData = self.formEditor.getData();
        var defaultEjsFilePath = path.join(self.defaultViewDirPath, formData['@class'] + self.getViewName() + '.ejs');
        return self.getCustomFilePath('ejs').then(function (customEjsFilePath) {
            var replaceFrom = formData['@class'] + self.getViewName();
            var replaceTo = params.page + '-' + params.form + '-' + params.field;
            return self.createFileByReplace(customEjsFilePath, defaultEjsFilePath, replaceFrom, replaceTo, null).then(function (ejs) {
                return ejs;
            });
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    createCss(params) {
        var self = this;
        var formData = this.formEditor.getData();
        var defaultCssFilePath = path.join(this.defaultViewDirPath, formData['@class'] + this.getViewName() + '.css');
        return self.getCustomFilePath('css').then(function (customCssFilePath) {
            var replaceFrom = formData['@class'] + self.getViewName();
            var replaceTo   = params.page + '-' + params.form + '-' + params.field;
            return self.createFileByReplace(customCssFilePath, defaultCssFilePath, replaceFrom, replaceTo, null).then(function (ejs) {
                return ejs;
            });
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    createJs(params) {
        var self = this;
        var templateFilePath = path.join(__dirname, 'Field.js.ejs');
        return self.getCustomFilePath('js').then(function (customJsFilePath) {
            return self.createFileByParams(customJsFilePath, templateFilePath, {
                page  : self.formEditor.pageEditor.pageFile.getAttr('name'),
                form  : self.formEditor.name,
                field : self.name,
                _class: self.constructor.name.replace('Editor', '')
            }).then(function (js) {
                return js;
            });
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getCollectionDirPath() {
        var self = this;
        return self.parent.getCustomDirPath().then(function (customDirPath) {
            var dirPath = path.join(customDirPath, 'fields');
            return qforms.Helper.createDirIfNotExists(dirPath).then(function () {
                return dirPath;
            });
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getCustomDirPath() {
        var self = this;
        return self.getCollectionDirPath().then(function (collectionDirPath) {
            var dirPath = path.join(collectionDirPath, self.name);
            return qforms.Helper.createDirIfNotExists(dirPath).then(function () {
                return dirPath;
            });
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getCustomFilePath(ext) {
        var self = this;
        return self.getCustomDirPath().then(function (customDirPath) {
            return path.join(customDirPath, self.name + '.' + ext);
        });
    }

}

module.exports = FieldEditor;