'use strict';

module.exports = JsonFile;

var fs      = require('fs');
var qforms  = require('../../../qforms');

////////////////////////////////////////////////////////////////////////////////////////////////////
function JsonFile(filePath) {
    var self = this;
    self.filePath = filePath;
    self.content  = null;
    self.data     = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
JsonFile.prototype.create = function() {
    var self = this;
    return qforms.Helper.exists(self.filePath).then(function (exists) {
        if (exists) {
            throw new Error('File {filePath} already exists'.replace('{filePath}', self.filePath));
        } else {
            if (self.data) {
            } else if (self.content) {
                self.data = JSON.parse(self.content);
            } else {
                self.data = {};
            }
            self.content = JSON.stringify(self.data, null, 4);
            return qforms.Helper.writeFile(self.filePath, self.content);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
JsonFile.prototype.read = function() {
    var self = this;
    return qforms.Helper.readFile(self.filePath).then(function (content) {
        self.content = content;
        self.data    = JSON.parse(content);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
JsonFile.prototype.setAttr = function(name, value) {
    var self = this;
    self.data['@attributes'][name] = value;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
JsonFile.prototype.getAttr = function(name) {
    var self = this;
    return self.data['@attributes'][name];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
JsonFile.prototype.save = function() {
    var self = this;
    console.log('JsonFile.prototype.save');
    self.content = JSON.stringify(self.data, null, 4);
    return qforms.Helper.writeFile(self.filePath, self.content);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
JsonFile.prototype.getData = function() {
    var self = this;
    return self.data;
};