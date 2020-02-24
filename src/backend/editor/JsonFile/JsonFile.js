'use strict';

var fs      = require('fs');
var qforms  = require('../../../qforms');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class JsonFile {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(filePath) {
        var self = this;
        self.filePath = filePath;
        self.content  = null;
        self.data     = null;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    create() {
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
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    read() {
        var self = this;
        return qforms.Helper.readFile(self.filePath).then(function (content) {
            self.content = content;
            self.data    = JSON.parse(content);
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    setAttr(name, value) {
        var self = this;
        self.data['@attributes'][name] = value;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getAttr(name) {
        var self = this;
        return self.data['@attributes'][name];
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    save() {
        var self = this;
        console.log('JsonFile.prototype.save');
        self.content = JSON.stringify(self.data, null, 4);
        return qforms.Helper.writeFile(self.filePath, self.content);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getData() {
        var self = this;
        return self.data;
    }

}

module.exports = JsonFile;