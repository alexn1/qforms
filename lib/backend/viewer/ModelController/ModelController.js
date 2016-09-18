'use strict';

module.exports = ModelController;

var path    = require('path');
var fs      = require('fs');
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
ModelController.prototype.init2 = function() {
    var self = this;
    return Promise.each(self.createCollections, function (colName) {
        return self.createCollection2(colName);
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
ModelController.prototype.fill2 = function(context) {
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
        return self._fillCollections2(response, context).then(function () {
            return response;
        });
    });
};


////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype._fillCollections2 = function(response, context) {
    var self = this;
    return Promise.each(self.fillCollections, function (colName) {
        if (colName === 'dataSources') {
            return self.fillCollectionDefaultFirst2(response, colName, context);
        } else {
            return self.fillCollection2(response, colName, context);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.createCollection2 = function(colName) {
    var self = this;
    //console.log('ModelController.prototype.createCollection2', colName);
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
ModelController.prototype.fillCollectionDefaultFirst2 = function(response, colName, context) {
    var self = this;
    //console.log('ModelController.prototype.fillCollectionDefaultFirst2', colName);
    return Promise.try(function () {
        response[colName] = {};
        var defaultArr = Object.keys(self[colName]).filter(function(itemName) {return itemName === 'default';});
        return Promise.each(defaultArr, function (itemName) {
            return self[colName][itemName].fill2(context).then(function (_response) {
                response[colName][itemName] = _response;
            });
        });
    }).then(function () {
        var noDefaultArr = Object.keys(self[colName]).filter(function(itemName) {return itemName !== 'default';});
        return Promise.each(noDefaultArr, function (itemName) {
            return self[colName][itemName].fill2(context).then(function (_response) {
                response[colName][itemName] = _response;
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ModelController.prototype.getView2 = function() {
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
ModelController.prototype.getJs2 = function() {
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
ModelController.prototype.getClassName = function() {
    return this.constructor.name;
};