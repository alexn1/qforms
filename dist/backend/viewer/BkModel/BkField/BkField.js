"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkField = void 0;
const path_1 = __importDefault(require("path"));
const BkModel_1 = require("../BkModel");
const BkHelper_1 = require("../../../BkHelper");
class BkField extends BkModel_1.BkModel {
    /* static async create(data, parent): Promise<Field> {
        return new Field(data, parent);
    } */
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
        response.ctrlClass = this.getAttr('ctrlClass');
        response.autoFocus = this.getAttr('autoFocus');
    }
    getDirPath() {
        return path_1.default.join(this.parent.getDirPath(), 'fields', this.getName());
    }
    fillDefaultValue(context, row) {
        const column = this.getAttr('column');
        if (!column)
            return;
        const defaultValue = this.getForm().replaceThis(context, this.getAttr('defaultValue'));
        const params = context.getParams();
        const js = BkHelper_1.BkHelper.templateToJsString(defaultValue, params);
        let value;
        try {
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
        return [this.getForm().getPage().getName(), this.getForm().getName(), this.getName()].join('.');
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
        return BkHelper_1.BkHelper.encodeValue(value);
    }
    rawToValue(raw) {
        return BkHelper_1.BkHelper.decodeValue(raw);
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
    valueToDbValue(value) {
        if (this.getDbType() === 'json') {
            return JSON.stringify(value);
        }
        return value;
    }
}
exports.BkField = BkField;
