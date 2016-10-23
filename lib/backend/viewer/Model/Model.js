'use strict';

module.exports = Model;

var path    = require('path');
var fs      = require('fs');
var Promise = require('bluebird');

var server  = require('../../../server');
var qforms  = require('../../../qforms');

////////////////////////////////////////////////////////////////////////////////////////////////////
function Model(data, parent) {
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
Model.prototype.init = function() {
    var self = this;
    return Promise.each(self.createCollections, function (colName) {
        return self.createCollection(colName);
    }).then(function () {
        return self.getView2();
    }).then(function (view) {
        self.view = view;
        return self.getJs2();
    }).then(function (js) {
        self.js = js;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Model.prototype.fill = function(context) {
    var self = this;
    return Promise.try(function () {
        var response = {
            class: self.data['@class'],
            view : self.view,
            js   : self.js
        };
        for (var name in self.data['@attributes']) {
            response[name] = self.data['@attributes'][name];
        }
        return self._fillCollections(response, context).then(function () {
            return response;
        });
    });
};


////////////////////////////////////////////////////////////////////////////////////////////////////
Model.prototype._fillCollections = function(response, context) {
    var self = this;
    return Promise.each(self.fillCollections, function (colName) {
        if (colName === 'dataSources') {
            return self.fillCollectionDefaultFirst2(response, colName, context);
        } else {
            return self.fillCollection(response, colName, context);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Model.prototype.createCollection = function(colName) {
    var self = this;
    //console.log('Model.prototype.createCollection', colName);
    return Promise.try(function () {
        if (self.data[colName]) {
            return Promise.each(Object.keys(self.data[colName]), function (itemName) {
                var itemData = self.data[colName][itemName];
                var className1 = '{class}Controller'.replace('{class}', itemData['@class']);
                var className2 =                                        itemData['@class'];
                var className = qforms[className1] ? className1 : className2;
                return qforms[className].create(itemData, self).then(function (obj) {
                    self[colName][itemName] = obj;
                    return obj.init();
                });
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Model.prototype.fillCollection = function(response, colName, context) {
    var self = this;
    return Promise.try(function () {
        if (self[colName]) {
            response[colName] = {};
            return Promise.each(Object.keys(self[colName]), function (itemName) {
                var collectionItem = self[colName][itemName];
                return collectionItem.fill(context).then(function (_response) {
                    response[colName][itemName] = _response;
                });
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Model.prototype.fillCollectionDefaultFirst2 = function(response, colName, context) {
    var self = this;
    //console.log('Model.prototype.fillCollectionDefaultFirst2', colName);
    return Promise.try(function () {
        response[colName] = {};
        var defaultArr = Object.keys(self[colName]).filter(function(itemName) {return itemName === 'default';});
        return Promise.each(defaultArr, function (itemName) {
            return self[colName][itemName].fill(context).then(function (_response) {
                response[colName][itemName] = _response;
            });
        });
    }).then(function () {
        var noDefaultArr = Object.keys(self[colName]).filter(function(itemName) {return itemName !== 'default';});
        return Promise.each(noDefaultArr, function (itemName) {
            return self[colName][itemName].fill(context).then(function (_response) {
                response[colName][itemName] = _response;
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Model.prototype.getView2 = function() {
    var self = this;
    return Promise.try(function () {
        if (self.viewFilePath) {
            if (self.customViewFilePath) {
                return qforms.helper.exists(self.customViewFilePath).then(function(exists) {
                    if (exists) {
                        return qforms.helper.readFile(self.customViewFilePath);
                    } else {
                        return qforms.helper.readFile(self.viewFilePath);
                    }
                });
            } else {
                return qforms.helper.readFile(self.viewFilePath);
            }
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Model.prototype.getJs2 = function() {
    var self = this;
    return Promise.try(function () {
        if (self.dirPath) {
            var jsFilePath = path.join(self.dirPath, self.name + '.js');
            return qforms.helper.exists(jsFilePath).then(function (exists) {
                if (exists) {
                    return qforms.helper.readFile(jsFilePath);
                }
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Model.prototype.getClassName = function() {
    var self = this;
    return self.constructor.name;
};