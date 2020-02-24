'use strict';

var path    = require('path');
var fs      = require('fs');
var Promise = require('bluebird');

var server  = require('../../../server');
var qforms  = require('../../../qforms');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Model {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(data, parent) {
        this.name              = data['@attributes'].name;
        this.data              = data;
        this.parent            = parent;
        this.view              = undefined;
        this.js                = undefined;
        this.createCollections = [];
        this.fillCollections   = [];
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    init() {
        return Promise.each(this.createCollections, colName => {
            return this.createCollection(colName);
        }).then(() => {
            return this.getView();
        }).then(view => {
            this.view = view;
            return this.getJs();
        }).then(js => {
            this.js = js;
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    fill(context) {
        console.log('Model.prototype.fill', this.constructor.name, this.name);
        return Promise.try(() => {
            var response = {
                class: this.data['@class'],
                view : this.view,
                js   : this.js
            };
            for (var name in this.data['@attributes']) {
                response[name] = this.data['@attributes'][name];
            }
            return this._fillCollections(response, context).then(() => {
                return response;
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    _fillCollections(response, context) {
        return Promise.each(this.fillCollections, colName => {
            if (colName === 'dataSources') {
                return this.fillCollectionDefaultFirst(response, colName, context);
            } else {
                return this.fillCollection(response, colName, context);
            }
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    createCollection(colName) {
        //console.log('Model.prototype.createCollection', colName);
        return Promise.try(() => {
            if (this.data[colName]) {
                return Promise.each(Object.keys(this.data[colName]), itemName => {
                    var itemData = this.data[colName][itemName];
                    var className1 = '{class}Controller'.replace('{class}', itemData['@class']);
                    var className2 =                                        itemData['@class'];
                    var className = qforms[className1] ? className1 : className2;
                    return qforms[className].create(itemData, this).then(obj => {
                        this[colName][itemName] = obj;
                        return obj.init();
                    });
                });
            }
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    fillCollection(response, colName, context) {
        return Promise.try(() => {
            if (this[colName]) {
                response[colName] = {};
                return Promise.each(Object.keys(this[colName]), itemName => {
                    var collectionItem = this[colName][itemName];
                    return collectionItem.fill(context).then(_response => {
                        response[colName][itemName] = _response;
                    });
                });
            }
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    fillCollectionDefaultFirst(response, colName, context) {
        //console.log('Model.prototype.fillCollectionDefaultFirst', colName);
        return Promise.try(() => {
            response[colName] = {};
            var defaultArr = Object.keys(this[colName]).filter(itemName => {return itemName === 'default';});
            return Promise.each(defaultArr, itemName => {
                return this[colName][itemName].fill(context).then(_response => {
                    response[colName][itemName] = _response;
                });
            });
        }).then(() => {
            var noDefaultArr = Object.keys(this[colName]).filter(itemName => {return itemName !== 'default';});
            return Promise.each(noDefaultArr, itemName => {
                return this[colName][itemName].fill(context).then(_response => {
                    response[colName][itemName] = _response;
                });
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getView() {
        return Promise.try(() => {
            if (this.viewFilePath) {
                if (this.customViewFilePath) {
                    return qforms.Helper.exists(this.customViewFilePath).then(exists => {
                        if (exists) {
                            return qforms.Helper.readFile(this.customViewFilePath);
                        } else {
                            return qforms.Helper.readFile(this.viewFilePath);
                        }
                    });
                } else {
                    return qforms.Helper.readFile(this.viewFilePath);
                }
            }
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getJs() {
        return Promise.try(() => {
            if (this.dirPath) {
                var jsFilePath = path.join(this.dirPath, this.name + '.js');
                return qforms.Helper.exists(jsFilePath).then(exists => {
                    if (exists) {
                        return qforms.Helper.readFile(jsFilePath);
                    }
                });
            }
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getClassName() {
        return this.constructor.name;
    }

}

module.exports = Model;