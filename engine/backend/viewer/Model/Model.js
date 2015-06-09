'use strict';

module.exports = Model;

var path  = require('path');
var fs    = require('fs');
var _     = require('underscore');
var async = require('async');

var app             = require('../../qforms');
var PageLink        = require('./PageLink/PageLink');
var Page            = require('./Page/Page');
var TableForm       = require('./Form/TableForm/TableForm');
var TreeForm        = require('./Form/TreeForm/TreeForm');
var RowForm         = require('./Form/RowForm/RowForm');
var DataSource      = require('./DataSource/DataSource');
var SqlDataSource   = require('./DataSource/SqlDataSource/SqlDataSource');
var TextBoxField    = require('./Field/TextBoxField/TextBoxField');
var ComboBoxField   = require('./Field/ComboBoxField/ComboBoxField');
var DatePickerField = require('./Field/DatePickerField/DatePickerField');
var CheckBoxField   = require('./Field/CheckBoxField/CheckBoxField');
var ImageField      = require('./Field/ImageField/ImageField');
var LabelField      = require('./Field/LabelField/LabelField');
var LinkField       = require('./Field/LinkField/LinkField');
var TextAreaField   = require('./Field/TextAreaField/TextAreaField');
var ButtonControl   = require('./Control/ButtonControl/ButtonControl');

////////////////////////////////////////////////////////////////////////////////////////////////////
function Model(data, parent) {
    this.name              = data['@attributes'].name;
    this.data              = data;
    this.parent            = parent;
    this.view              = undefined;
    this.js                = undefined;
    this.createCollections = [];
    this.fillCollections   = [];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Model.prototype.init = function(callback) {
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
Model.prototype.fill = function(args, callback) {
    var response = {
        class : this.data['@class'],
        view  : this.view,
        js    : this.js
    };
    for (var name in this.data['@attributes']) {
        response[name] = this.data['@attributes'][name];
    }
    this._fillCollections(response, args, function() {
        callback(response);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Model.prototype._fillCollections = function(response, args, callback) {
    var self = this;
    async.eachSeries(this.fillCollections, function(colName, next) {
        if (colName === 'dataSources') {
            self.fillCollectionDefaultFirst(response, colName, args, next);
        } else {
            self.fillCollection(response, colName, args, next);
        }
    }, callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Model.prototype.createCollection = function(colName, callback) {
    var self = this;
    this[colName] = {};
    var tasks = _.map(this.data[colName], function(itemData, itemName) {
        return function(next) {
            var _callback = function(obj) {
                self[colName][itemName] = obj;
                self[colName][itemName].init(next);
            };
            eval('{class}.create(itemData, self, _callback)'.replace('{class}', itemData['@class']));
        };
    });
    async.series(tasks, callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Model.prototype.fillCollection = function(response, colName, args, callback) {
    response[colName] = {};
    var tasks = _.map(this[colName], function(collection, itemName) {
        return function(next) {
            collection.fill(args, function(_response) {
                response[colName][itemName] = _response;
                next();
            });
        }
    });
    async.series(tasks, callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Model.prototype.fillCollectionDefaultFirst = function(response, colName, args, callback) {
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
            self[colName][itemName].fill(args, function(_response) {
                response[colName][itemName] = _response;
                next();
            });
        };
    });
    var tasks2 = _.map(noDefaultArr, function(itemName) {
        return function(next) {
            self[colName][itemName].fill(args, function(_response) {
                response[colName][itemName] = _response;
                next();
            });
        };
    });
    async.series(tasks1.concat(tasks2), callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Model.prototype.getView = function(callback) {
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
Model.prototype.getJs = function(callback) {
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
Model.prototype.getClassName = function() {
    return this.constructor.name;
};