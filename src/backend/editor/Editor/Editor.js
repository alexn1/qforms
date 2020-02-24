'use strict';

module.exports = Editor;

var path    = require('path');
var fs      = require('fs');
var ejs     = require('ejs');

var qforms = require('../../../qforms');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Editor() {

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.createFileByReplace = function(newFilePath, templateFilePath, replaceFrom, replaceTo, emptyTemplate) {
    var self = this;
    console.log('Editor.prototype.createFileByReplace');
    emptyTemplate = emptyTemplate || '';
    return qforms.Helper.exists(newFilePath).then(function (exists) {
        if (exists) {
            throw new Error('File {fileName} already exist.'.replace('{fileName}', path.basename(newFilePath)));
        } else {
            return qforms.Helper.readFile(templateFilePath).then(function (template) {
                var text = template.replace(new RegExp(replaceFrom, 'g'), replaceTo);
                if (text === '') {
                    text = emptyTemplate;
                }
                return qforms.Helper.writeFile(newFilePath, text).then(function () {
                    return text;
                });
            });
        }
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.createFileByParams = function(newFilePath, templateFilePath, params) {
    var self = this;
    return qforms.Helper.exists(newFilePath).then(function(exists) {
        if (!exists) {
            return qforms.Helper.readFile(templateFilePath).then(function(template) {
                var content = ejs.render(template, params);
                return qforms.Helper.writeFile(newFilePath, content).then(function () {
                    return content;
                });
            });
        } else {
            throw new Error('File {fileName} already exist.'.replace('{fileName}', path.basename(newFilePath)));
        }
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.getViewName = function() {
    var self = this;
    return self.constructor.name.replace('Editor', '') + 'View';
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.getFile = function(filePath) {
    var self = this;
    console.log('Editor.prototype.getFile');
    return qforms.Helper.exists(filePath).then(function (exists) {
        if (exists) {
            return qforms.Helper.readFile(filePath);
        }
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.saveFile = function(filePath, content) {
    var self = this;
    return qforms.Helper.exists(filePath).then(function (exists) {
        if (exists) {
            return qforms.Helper.writeFile(filePath, content);
        } else {
            throw new Error("File {fileName} doesn't exist.".replace('{fileName}', path.basename(filePath)));
        }
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.getCustomFile = function(ext) {
    var self = this;
    console.log('Editor.prototype.getCustomFile');
    return self.getCustomFilePath(ext).then(function(customFilePath) {
        return self.getFile(customFilePath);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.saveCustomFile = function(ext, text) {
    var self = this;
    return self.getCustomFilePath(ext).then(function (customFilePath) {
        return self.saveFile(customFilePath, text);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.moveDataSourceUp = function(name) {
    var self = this;
    self.data.dataSources = qforms.Helper.moveObjProp(self.data.dataSources, name, -1);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.moveDataSourceDown = function(name) {
    var self = this;
    self.data.dataSources = qforms.Helper.moveObjProp(self.data.dataSources, name, 1);
};