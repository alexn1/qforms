'use strict';

const path    = require('path');
const qforms = require('../../../qforms');
const Helper = require('../../../common/Helper');
const Model  = require('../Model');

class Field extends Model {
    static async create(data, parent) {
        return new Field(data, parent);
    }

    // constructor(data, parent) {
    //     super(data, parent);
    // }

    getCustomViewFilePath() {
        return path.join(this.getDirPath(), `${this.getName()}.ejs`);
    }

    getDirPath() {
        return path.join(this.parent.getDirPath(), 'fields', this.getName());
    }

    fillDefaultValue(context, row) {
        const column = this.getAttr('column');
        const defaultValue = this.getForm().replaceThis(context, this.getAttr('defaultValue'));
        const params = this.getForm().getPage().getApp().getParams(context);
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
            this.getForm().getPage().getName(),
            this.getForm().getName(),
            this.getName()
        ].join('.');
    }

    calcValue(row) {
        row[this.getAttr('column')] = eval(this.getAttr('value'));
    }

    getApp() {
        return this.parent.parent.parent;
    }

    getForm() {
        return this.parent;
    }

}

module.exports = Field;
