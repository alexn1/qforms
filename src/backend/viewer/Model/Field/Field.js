'use strict';

const path    = require('path');
const qforms = require('../../../qforms');
const Helper = require('../../../common/Helper');
const Model  = require('../Model');

class Field extends Model {

    constructor(data, parent) {
        super(data, parent);
        this.form               = parent;
        this.dirPath            = path.join(parent.dirPath, 'fields', this.name);
        this.customViewFilePath = path.join(this.dirPath, this.name + '.ejs');
    }

    static async create(data, parent) {
        return new Field(data, parent);
    }

    fillDefaultValue(context, row) {
        const column = this.getAttr('column');
        const defaultValue = this.form.replaceThis(context, this.getAttr('defaultValue'));
        const params = this.form.page.application.getParams(context);
        const code = qforms.Helper.templateValue(defaultValue, params);
        let value;
        try {
            value = eval(code);
        } catch (e) {
            throw new Error('[' + this.getFullName() + '] default value error: ' + e.toString());
        }
        if (value === undefined) {
            value = null;
        }
        row[column] = value;
    }

    dumpRowValueToParams(row, params) {
        const name  = this.getFullName();
        const value = row[this.getAttr('column')];
        params[name] = value;
    }

    getFullName() {
        return [
            this.form.page.name,
            this.form.name,
            this.name
        ].join('.');
    }

    calcValue(row) {
        row[this.getAttr('column')] = eval(this.getAttr('value'));
    }

    getApp() {
        return this.parent.parent.parent;
    }

}

module.exports = Field;
