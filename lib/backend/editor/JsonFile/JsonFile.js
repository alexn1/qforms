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

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
JsonFile.prototype.create = function(callback) {
    var self = this;
    fs.exists(this.filePath, function(exists) {
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
*/

////////////////////////////////////////////////////////////////////////////////////////////////////
JsonFile.prototype.create2 = function() {
    var self = this;
    return qforms.helper.exists(self.filePath).then(function (exists) {
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
            return qforms.helper.writeFile(self.filePath, self.content);
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
JsonFile.prototype.read2 = function() {
    var self = this;
    return qforms.helper.readFile(self.filePath).then(function (content) {
        self.content = content;
        self.data    = JSON.parse(content);
    });
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
JsonFile.prototype.save2 = function() {
    var self = this;
    console.log('JsonFile.prototype.save2');
    self.content = JSON.stringify(this.data, null, 4);
    return qforms.helper.writeFile(self.filePath, self.content);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
JsonFile.prototype.getData = function() {
    return this.data;
};