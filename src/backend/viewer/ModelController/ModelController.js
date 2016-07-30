'use strict';

module.exports = ModelController;

var path  = require('path');
var fs    = require('fs');
var _     = require('underscore');
var async = require('async');

var server  = require('../../../server');
var qforms  = require('../../../qforms');

////////////////////////////////////////////////////////////////////////////////////////////////////
function ModelController(data, parent) {
    this.name              = data['@attributes'].name;
    this.data              = data;
    this.parent            = parent;
    this.view              = undefined;
    this.js                = undefined;
    this.createCollections = [];
    this.fillCollections   = [];
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.init = function(callback) {
    var self = this;
    async.series([
        function(next) {
            async.eachSeries(self.createCollections, function(colName, next) {
                self.createCollection(colName, next);
            }, next);
        },
        function(next) {
            self.getView(function(view) {
                self.view = view;
                next();
            });
        },
        function(next) {
            self.getJs(function(js) {
                self.js = js;
                next();
            });
        }
    ], callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.fill = function(context, callback) {
    var response = {
        class : this.data['@class'],
        view  : this.view,
        js    : this.js
    };
    for (var name in this.data['@attributes']) {
        response[name] = this.data['@attributes'][name];
    }
    this._fillCollections(response, context, function() {
        callback(response);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype._fillCollections = function(response, context, callback) {
    var self = this;
    async.eachSeries(this.fillCollections, function(colName, next) {
        if (colName === 'dataSources') {
            self.fillCollectionDefaultFirst(response, colName, context, next);
        } else {
            self.fillCollection(response, colName, context, next);
        }
    }, callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.createCollection = function(colName, callback) {
    var self = this;
    var tasks = _.map(this.data[colName], function(itemData, itemName) {
        return function(next) {
            var _callback = function(obj) {
                self[colName][itemName] = obj;
                self[colName][itemName].init(next);
            };
            eval('qforms.{class}Controller.create(itemData, self, _callback)'.replace('{class}', itemData['@class']));
        };
    });
    async.series(tasks, callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.fillCollection = function(response, colName, context, callback) {
    response[colName] = {};
    var tasks = _.map(this[colName], function(collection, itemName) {
        return function(next) {
            collection.fill(context, function(_response) {
                response[colName][itemName] = _response;
                next();
            });
        }
    });
    async.series(tasks, callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.fillCollectionDefaultFirst = function(response, colName, context, callback) {
    var self = this;
    response[colName] = {};
    var defaultArr = Object.keys(this[colName]).filter(function(itemName) {
        return itemName === 'default';
    });
    var noDefaultArr = Object.keys(this[colName]).filter(function(itemName) {
        return itemName !== 'default';
    });
    var tasks1 = _.map(defaultArr, function(itemName) {
        return function(next) {
            self[colName][itemName].fill(context, function(_response) {
                response[colName][itemName] = _response;
                next();
            });
        };
    });
    var tasks2 = _.map(noDefaultArr, function(itemName) {
        return function(next) {
            self[colName][itemName].fill(context, function(_response) {
                response[colName][itemName] = _response;
                next();
            });
        };
    });
    async.series(tasks1.concat(tasks2), callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.getView = function(callback) {
    var self = this;
    var returnView = function(err, view) {
        if (err) {
            throw err;
        } else {
            callback(view);
        }
    };
    if (this.viewFilePath) {
        if (this.customViewFilePath) {
            fs.exists(this.customViewFilePath, function(exists) {
                if (exists) {
                    fs.readFile(self.customViewFilePath, 'utf8', returnView);
                } else {
                    fs.readFile(self.viewFilePath, 'utf8', returnView);
                }
            });
        } else {
            fs.readFile(this.viewFilePath, 'utf8', returnView);
        }
    } else {
        callback();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.getJs = function(callback) {
    if (this.dirPath) {
        var jsFilePath = path.join(this.dirPath, this.name + '.js');
        fs.exists(jsFilePath, function(exists) {
            if (exists) {
                fs.readFile(jsFilePath, 'utf8', function(err, js) {
                    if (err) {
                        throw err;
                    } else {
                        callback(js);
                    }
                });
            } else {
                callback();
            }
        });
    } else {
        callback();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.getClassName = function() {
    return this.constructor.name;
};