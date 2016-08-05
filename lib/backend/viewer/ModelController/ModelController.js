'use strict';

module.exports = ModelController;

var path    = require('path');
var fs      = require('fs');
var _       = require('underscore');
var async   = require('async');
var Promise = require('bluebird');

var server  = require('../../../server');
var qforms  = require('../../../qforms');

////////////////////////////////////////////////////////////////////////////////////////////////////
function ModelController(data, parent) {
    var self = this;
    self.name              = data['@attributes'].name;
    self.data              = data;
    self.parent            = parent;
    self.view              = undefined;
    self.js                = undefined;
    self.createCollections = [];
    self.fillCollections   = [];
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.init = function(callback) {
    var self = this;
    Promise.each(self.createCollections, function (colName) {
        return self.createCollection2(colName);
    }).then(function () {
        return self.getView2();
    }).then(function (view) {
        self.view = view;
        return self.getJs2();
    }).then(function (js) {
        self.js = js;
        callback();
    });

    /*
    async.series([
        function(next) {
            async.eachSeries(self.createCollections, function(colName, next) {
                self.createCollection(colName, next);
            }, next);
        },
        function(next) {
            self.getView(function(view) {
                console.log('view', view);
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
    */
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.init2 = function () {
    var self = this;
    return new Promise(function (resolve) {
        self.init(resolve);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.fill = function(context, callback) {
    var self = this;
    var response = {
        class: self.data['@class'],
        view : self.view,
        js   : self.js
    };
    for (var name in self.data['@attributes']) {
        response[name] = self.data['@attributes'][name];
    }
    self._fillCollections(response, context, function() {
        callback(response);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.fill2 = function(context) {
    var self = this;
    return new Promise(function (resolve) {
        self.fill(context, resolve);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype._fillCollections = function(response, context, callback) {
    var self = this;
    async.eachSeries(self.fillCollections, function(colName, next) {
        if (colName === 'dataSources') {
            self.fillCollectionDefaultFirst(response, colName, context, next);
        } else {
            //self.fillCollection(response, colName, context, next);
            self.fillCollection2(response, colName, context).then(next);
        }
    }, callback);
};

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.createCollection = function(colName, callback) {
    var self = this;
    console.log('ModelController.prototype.createCollection', colName);
    var tasks = _.map(self.data[colName], function(itemData, itemName) {
        return function(next) {
            var _callback = function(obj) {
                self[colName][itemName] = obj;
                self[colName][itemName].init(next);
            };
            var className = '{class}Controller'.replace('{class}', itemData['@class']);
            qforms[className].create(itemData, self, _callback);
        };
    });
    async.series(tasks, callback);
};
*/

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.createCollection2 = function(colName) {
    var self = this;
    console.log('ModelController.prototype.createCollection2', colName);
    return Promise.try(function () {
        if (self.data[colName]) {
            return Promise.each(Object.keys(self.data[colName]), function (itemName) {
                var itemData = self.data[colName][itemName];
                var className = '{class}Controller'.replace('{class}', itemData['@class']);
                return qforms[className].create2(itemData, self).then(function (obj) {
                    self[colName][itemName] = obj;
                    return obj.init2();
                });
            });
        }
    });
};

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.fillCollection = function(response, colName, context, callback) {
    var self = this;
    response[colName] = {};
    var tasks = _.map(self[colName], function(collectionItem, itemName) {
        return function(next) {
            collectionItem.fill(context, function(_response) {
                response[colName][itemName] = _response;
                next();
            });
        }
    });
    async.series(tasks, callback);
};
*/

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.fillCollection2 = function(response, colName, context) {
    var self = this;
    return Promise.try(function () {
        if (self[colName]) {
            response[colName] = {};
            return Promise.each(Object.keys(self[colName]), function (itemName) {
                var collectionItem = self[colName][itemName];
                return collectionItem.fill2(context).then(function (_response) {
                    response[colName][itemName] = _response;
                });
            });
        }
    });
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
ModelController.prototype.getView2 = function() {
    var self = this;
    return new Promise(function (resolve) {
        self.getView(resolve);
    });
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
ModelController.prototype.getJs2 = function() {
    var self = this;
    return new Promise(function (resolve) {
        self.getJs(resolve);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.getClassName = function() {
    return this.constructor.name;
};