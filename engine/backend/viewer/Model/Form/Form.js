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
    Form.super_.call(this, data, parent);
    this.page               = parent;
    this.dirPath            = path.join(this.parent.dirPath, this.name);
    this.customViewFilePath = path.join(this.dirPath,        this.name + '.ejs');
    this.createCollections  = ['dataSources', 'fields', 'controls'];
    this.fillCollections    = ['dataSources', 'fields', 'controls'];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.fill = function(args, callback) {
    var self = this;
    Form.super_.prototype.fill.call(this, args, function(response) {
        if (self.dataSources.default === undefined) {
            var dataSourceResponse = self._getSurrogateDataSourceResponse();
            this.dumpRowToParams(dataSourceResponse.rows[0], args.queryTime.params);
            response.dataSources.default = dataSourceResponse;
        }
        callback(response);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype._getSurrogateDataSourceResponse = function() {
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

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.dumpRowToParams = function(row, params) {
    for (var name in this.fields) {
        this.fields[name].dumpRowValueToParams(row, params);
    }
    //console.log(params);
};