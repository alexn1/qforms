'use strict';

module.exports = Editor;

var path = require('path');
var fs   = require('fs');
var ejs  = require('ejs');

var helper = require('../../common/helper');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Editor() {

};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.createFile = function(newFilePath, templateFilePath, replaceFrom, replaceTo, emptyTemplate, callback) {
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
Editor.prototype.getViewName = function() {
    return this.constructor.name.replace('Editor', '') + 'View';
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.getFile = function(filePath, callback) {
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
Editor.prototype.saveFile = function(filePath, content, callback) {
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
Editor.prototype.createFile2 = function(newFilePath, templateFilePath, params, callback) {
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
Editor.prototype.getCustomFile = function(params, ext, callback) {
    this.getFile(this.getCustomFilePath(params, ext), function(content) {
        callback(content);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.saveCustomFile = function(params, ext, callback) {
    this.saveFile(this.getCustomFilePath(params, ext), params.text, callback);
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.moveDataSourceUp = function(name) {
    this.data.dataSources = helper.moveObjProp(this.data.dataSources, name, -1);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.moveDataSourceDown = function(name) {
    this.data.dataSources = helper.moveObjProp(this.data.dataSources, name, 1);
};