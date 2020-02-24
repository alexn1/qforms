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
        this.form               = parent;
        this.dirPath            = path.join(parent.dirPath, 'fields', this.name);
        this.customViewFilePath = path.join(this.dirPath, this.name + '.ejs');
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static async create(data, parent) {
        return new Field(data, parent);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    fillDefaultValue(context, row) {
        var column = this.data['@attributes'].column;
        var defaultValue = this.form.replaceThis(context, this.data['@attributes'].defaultValue);
        var params = this.form.page.application.getParams(context);
        var code = qforms.Helper.templateValue(defaultValue, params);
        try {
            var value = eval(code);
        } catch (e) {
            throw new Error('[' + this.getFullName() + '] default value error: ' + e.toString());
        }
        if (value === undefined) {
            value = null;
        }
        row[column] = value;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    dumpRowValueToParams(row, params) {
        var name  = this.getFullName();
        var value = row[this.data['@attributes'].column];
        params[name] = value;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getFullName() {
        return [
            this.form.page.name,
            this.form.name,
            this.name
        ].join('.');
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    calcValue(row) {
        return Promise.try(() => {
            return eval(this.data['@attributes'].value);
        }).then(value => {
            row[this.data['@attributes'].column] = value;
        });
    }

}

module.exports = Field;