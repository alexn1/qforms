'use strict';

module.exports = Form;

var util  = require('util');
var path  = require('path');
var fs    = require('fs');
var async = require('async');

var helper = require('../../../common/helper');
var Model  = require('../Model');

util.inherits(Form, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Form(data, parent) {
    Form.super_.prototype.constructor.call(this, data, parent);
    this.dirPath            = path.join(this.parent.dirPath, this.name);
    this.customViewFilePath = path.join(this.dirPath, this.name + '.ejs');
    this.createCollections  = ['dataSources', 'fields', 'controls'];
    this.fillCollections    = ['dataSources', 'fields', 'controls'];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.fill = function(params, newMode, callback) {
    var self = this;
    Form.super_.prototype.fill.call(this, params, newMode, function(response) {
        if (self.dataSources.default === undefined) {
            response.dataSources.default = self._getSurrogateDataSource();
        }
        callback(response);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype._getSurrogateDataSource = function() {
    var row = {
        id: 1
    };
    for (var name in this.fields) {
        this.fields[name].fillDefaultValue(row);
    }
    return {
        class                : 'DataSource',
        database             : '',
        table                : '',
        keyColumns           : ['id'],
        dumpFirstRowToParams : 'false',
        rows                 : [row]
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.getExpValue = function(value) {
    if (value === "CurrentDate()") {
        value = helper.currentDate();
    } else if (value === "CurrentTime()") {
        value = helper.currentTime();
    }
    return value;
};