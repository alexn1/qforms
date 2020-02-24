'use strict';

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var qforms = require('../../../../qforms');
var Model  = require('../Model');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Field extends Model {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(data, parent) {
        super(data, parent);
        var self = this;
        self.form               = parent;
        self.dirPath            = path.join(parent.dirPath, 'fields', self.name);
        self.customViewFilePath = path.join(self.dirPath, self.name + '.ejs');
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static async create(data, parent) {
        return new Field(data, parent);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    fillDefaultValue(context, row) {
        var self = this;
        var column = self.data['@attributes'].column;
        var defaultValue = self.form.replaceThis(context, self.data['@attributes'].defaultValue);
        var params = self.form.page.application.getParams(context);
        var code = qforms.Helper.templateValue(defaultValue, params);
        try {
            var value = eval(code);
        } catch (e) {
            throw new Error('[' + self.getFullName() + '] default value error: ' + e.toString());
        }
        if (value === undefined) {
            value = null;
        }
        row[column] = value;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    dumpRowValueToParams(row, params) {
        var self = this;
        var name  = self.getFullName();
        var value = row[self.data['@attributes'].column];
        params[name] = value;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getFullName() {
        var self = this;
        return [
            self.form.page.name,
            self.form.name,
            self.name
        ].join('.');
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    calcValue(row) {
        var self = this;
        return Promise.try(() => {
            return eval(self.data['@attributes'].value);
        }).then(value => {
            row[self.data['@attributes'].column] = value;
        });
    }

}

module.exports = Field;