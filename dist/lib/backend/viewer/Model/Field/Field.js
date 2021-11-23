"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path = require('path');
const Model_1 = __importDefault(require("../Model"));
const Helper = require('../../../Helper');
class Field extends Model_1.default {
    static async create(data, parent) {
        return new Field(data, parent);
    }
    // constructor(data, parent) {
    //     super(data, parent);
    // }
    fillAttributes(response) {
        response.class = this.getClassName();
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
        response.column = this.getAttr('column');
        response.defaultValue = this.getAttr('defaultValue');
        response.value = this.getAttr('value');
        response.param = this.getAttr('param');
        response.visible = this.getAttr('isVisible');
        response.type = this.getAttr('type');
        response.width = this.getAttr('width');
        response.cssBlock = this.getAttr('cssBlock');
        response.viewClass = this.getAttr('viewClass');
        response.autoFocus = this.getAttr('autoFocus');
    }
    getDirPath() {
        return path.join(this.parent.getDirPath(), 'fields', this.getName());
    }
    fillDefaultValue(context, row) {
        const column = this.getAttr('column');
        if (!column)
            return;
        const defaultValue = this.getForm().replaceThis(context, this.getAttr('defaultValue'));
        const params = context.getParams();
        const js = Helper.templateToJsString(defaultValue, params);
        let value;
        try {
            value = eval(js);
            if (value !== undefined) {
                row[column] = this.valueToRaw(value);
            }
        }
        catch (e) {
            throw new Error(`[${this.getFullName()}] fillDefaultValue: ${e.toString()}`);
        }
    }
    dumpRowValueToParams(row, params) {
        // console.log('Field.dumpRowValueToParams', this.getFullName());
        const fullName = this.getFullName();
        try {
            const column = this.getAttr('column');
            if (!column)
                throw new Error('no column attr');
            const value = row[column];
            // console.log('value:', value);
            params[fullName] = value !== undefined ? Helper.decodeValue(value) : null;
        }
        catch (err) {
            // console.log('row:', row);
            err.message = `${fullName}: ${err.message}`;
            throw err;
        }
    }
    getFullName() {
        return [
            this.getForm().getPage().getName(),
            this.getForm().getName(),
            this.getName()
        ].join('.');
    }
    getApp() {
        return this.parent.parent.parent;
    }
    getPage() {
        return this.parent.parent;
    }
    getForm() {
        return this.parent;
    }
    isParam() {
        return this.isAttr('param') && this.getAttr('param') === 'true';
    }
    valueToRaw(value) {
        return Helper.encodeValue(value);
    }
    rawToValue(raw) {
        return Helper.decodeValue(raw);
    }
    isTimezone() {
        return this.getAttr('timezone') === 'true';
    }
}
module.exports = Field;
