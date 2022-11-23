"use strict";
const path = require('path');
const Model = require("../Model");
const Helper_1 = require("../../../Helper");
class Field extends Model {
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
        response.visible = this.getAttr('visible');
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
        const js = Helper_1.Helper.templateToJsString(defaultValue, params);
        let value;
        try {
            // @ts-ignore
            global.Helper = Helper_1.Helper;
            value = eval(js);
            if (value !== undefined) {
                row[column] = this.valueToRaw(value);
            }
        }
        catch (e) {
            throw new Error(`[${this.getFullName()}] fillDefaultValue eval error: ${e.toString()}`);
        }
    }
    dumpRowValueToParams(row, params) {
        // console.log('Field.dumpRowValueToParams', this.getFullName());
        const fullName = this.getFullName();
        try {
            const column = this.getAttr('column');
            if (!column)
                throw new Error('no column attr');
            const rawValue = row[column];
            // console.log('rawValue:', rawValue);
            const value = rawValue !== undefined ? this.rawToValue(rawValue) : null;
            // console.log('value:', value);
            params[fullName] = value;
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
        return Helper_1.Helper.encodeValue(value);
    }
    rawToValue(raw) {
        return Helper_1.Helper.decodeValue(raw);
    }
    isTimezone() {
        return this.getAttr('timezone') === 'true';
    }
    getDatabaseTableColumn() {
        if (!this.getAttr('column'))
            throw new Error(`${this.getFullName()}: column attr is empty`);
        const defaultDataSource = this.getForm().getDataSource('default');
        if (!defaultDataSource)
            throw new Error(`${this.getFullName()}: no default datasource`);
        return defaultDataSource.getTable().getColumn(this.getAttr('column'));
    }
    getType() {
        if (this.getAttr('column')) {
            return this.getDatabaseTableColumn().getAttr('type');
        }
        if (this.getAttr('type')) {
            return this.getAttr('type');
        }
        throw new Error(`${this.getFullName()}: type attr is empty`);
    }
    getDbType() {
        return this.getDatabaseTableColumn().getAttr('dbType');
    }
    valueToSqlValue(value) {
        if (this.getDbType() === 'json') {
            return JSON.stringify(value);
        }
        return value;
    }
}
module.exports = Field;
