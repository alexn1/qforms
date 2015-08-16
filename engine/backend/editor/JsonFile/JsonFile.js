'use strict';

module.exports = JsonFile;

var fs = require('fs');

////////////////////////////////////////////////////////////////////////////////////////////////////
function JsonFile(filePath) {
    this.filePath = filePath;
    this.content  = null;
    this.data     = null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
JsonFile.prototype.create = function(callback) {
    var self = this;
    fs.exists(this.filePath, function(exists) {
        if (exists) {
            throw new Error('File {filePath} already exists'.replace('{filePath}', this.filePath));
        } else {
            if (self.data) {
            } else if (self.content) {
                self.data = JSON.parse(self.content);
            } else {
                self.data = {};
            }
            self.content = JSON.stringify(self.data, null, 4);
            fs.writeFile(self.filePath, self.content,'utf8', function(err) {
                if (err) {
                    throw err;
                } else {
                    callback();
                }
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
JsonFile.prototype.read = function(callback) {
    var self = this;
    fs.readFile(this.filePath, 'utf8', function(err, content) {
        if (err) {
            throw err;
        } else {
            self.content = content;
            self.data    = JSON.parse(content);
            callback();
        }
    })
};

////////////////////////////////////////////////////////////////////////////////////////////////////
JsonFile.prototype.setAttr = function(name, value) {
    this.data['@attributes'][name] = value;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
JsonFile.prototype.getAttr = function(name) {
    return this.data['@attributes'][name];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
JsonFile.prototype.save = function(callback) {
    this.content = JSON.stringify(this.data, null, 4);
    fs.writeFile(this.filePath, this.content, function(err) {
        if (err) {
            throw err;
        } else {
            callback();
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
JsonFile.prototype.getData = function() {
    return this.data;
};