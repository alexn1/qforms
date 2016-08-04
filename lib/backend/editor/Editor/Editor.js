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
Editor.prototype.createFileByReplace = function(newFilePath, templateFilePath, replaceFrom, replaceTo, emptyTemplate, callback) {
    emptyTemplate = emptyTemplate || '';
    fs.exists(newFilePath, function(exists) {
        if (!exists) {
            fs.readFile(templateFilePath, 'utf8', function(err, content) {
                if (err) {
                    throw err;
                } else {
                    content = content.replace(new RegExp(replaceFrom, 'g'), replaceTo);
                    if (content === '') {
                        content = emptyTemplate;
                    }
                    fs.writeFile(newFilePath, content, 'utf8', function(err) {
                        if (err) {
                            throw err;
                        } else {
                            callback(content);
                        }
                    });
                }
            });
        } else {
            throw new Error('File {fileName} already exist.'.replace('{fileName}', path.basename(newFilePath)));
        }
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.createFileByReplace2 = function(newFilePath, templateFilePath, replaceFrom, replaceTo, emptyTemplate) {
    console.log('Editor.prototype.createFileByReplace2');
    emptyTemplate = emptyTemplate || '';
    return qforms.helper.exists(newFilePath).then(function (exists) {
        if (exists) {
            throw new Error('File {fileName} already exist.'.replace('{fileName}', path.basename(newFilePath)));
        } else {
            return qforms.helper.readFile(templateFilePath).then(function (template) {
                var text = template.replace(new RegExp(replaceFrom, 'g'), replaceTo);
                if (text === '') {
                    text = emptyTemplate;
                }
                return qforms.helper.writeFile(newFilePath, text).then(function () {
                    return text;
                });
            });
        }
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.createFileByParams = function(newFilePath, templateFilePath, params, callback) {
    fs.exists(newFilePath, function(exists) {
        if (!exists) {
            fs.readFile(templateFilePath, 'utf8', function(err, template) {
                if (err) {
                    throw err;
                } else {
                    var content = ejs.render(template, params);
                    fs.writeFile(newFilePath, content, 'utf8', function(err) {
                        if (err) {
                            throw err;
                        } else {
                            callback(content);
                        }
                    });
                }
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
Editor.prototype.getFile = function(filePath, callback) {
    var self = this;
    fs.exists(filePath, function(exists) {
        if (exists) {
            fs.readFile(filePath, 'utf8', function(err, content) {
                if (err) {
                    throw err;
                } else {
                    callback(content);
                }
            });
        } else {
            callback();
        }
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.getFile2 = function(filePath) {
    var self = this;
    console.log('Editor.prototype.getFile2');
    return qforms.helper.exists(filePath).then(function (exists) {
        if (exists) {
            return qforms.helper.readFile(filePath);
        }
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.saveFile = function(filePath, content, callback) {
    var self = this;
    fs.exists(filePath, function(exists) {
        if (exists) {
            fs.writeFile(filePath, content, 'utf8', function(err) {
                if (err) {
                    throw err;
                } else {
                    callback();
                }
            });
        } else {
            throw new Error("File {fileName} doesn't exist.".replace('{fileName}', path.basename(filePath)));
        }
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.getCustomFile = function(ext, callback) {
    var self = this;
    self.getCustomFilePath(ext, function(customFilePath) {
        self.getFile(customFilePath, function(content) {
            callback(content);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.getCustomFile2 = function(ext) {
    var self = this;
    console.log('Editor.prototype.getCustomFile2');
    return self.getCustomFilePath2(ext).then(function(customFilePath) {
        return self.getFile2(customFilePath);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.saveCustomFile = function(ext, text, callback) {
    var self = this;
    self.getCustomFilePath(ext, function(customFilePath) {
        self.saveFile(customFilePath, text, callback);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.moveDataSourceUp = function(name) {
    var self = this;
    self.data.dataSources = qforms.helper.moveObjProp(self.data.dataSources, name, -1);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.moveDataSourceDown = function(name) {
    var self = this;
    self.data.dataSources = qforms.helper.moveObjProp(self.data.dataSources, name, 1);
};