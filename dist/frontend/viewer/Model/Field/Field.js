"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = void 0;
const Model_1 = require("../Model");
const common_1 = require("../../../common");
const RowForm_1 = require("../Form/RowForm/RowForm");
class Field extends Model_1.Model {
    // constructor(data, parent) {
    //     super(data, parent);
    // }
    init() { }
    replaceThis(value) {
        return value.replace(/\{([@\w\.]+)\}/g, (text, name) => {
            if (name.indexOf('.') === -1)
                return text;
            let arr = name.split('.');
            if (arr[0] === 'this')
                arr[0] = this.getPage().getName();
            return `{${arr.join('.')}}`;
        });
    }
    fillDefaultValue(row) {
        // console.log('Field.fillDefaultValue', this.getFullName());
        const column = this.getAttr('column');
        if (!column)
            return;
        const defaultValue = this.replaceThis(this.getAttr('defaultValue'));
        const js = common_1.Helper.templateToJsString(defaultValue, this.getPage().getParams());
        if (typeof js !== 'string')
            throw new Error(`${this.getFullName()}: defaultValue must be templated to js string`);
        // console.log('js', this.getFullName(), js);
        // module.Helper
        try {
            const value = eval(js);
            if (value !== undefined) {
                row[column] = this.valueToRaw(value);
            }
        }
        catch (err) {
            throw new Error(`[${this.getFullName()}] fillDefaultValue: ${err.toString()}`);
        }
    }
    valueToPageParams(row) {
        // console.log('Field.valueToPageParams', this.getFullName());
        if (this.isParam()) {
            // we need to dump value to param without meta info such as timezone prop
            const value = this.getValue(row);
            const rawValue = this.valueToRaw(value);
            // console.log('value:', value);
            // console.log('rawValue:', rawValue);
            const paramValue = rawValue !== undefined ? common_1.Helper.decodeValue(rawValue) : undefined;
            this.getPage().setParam(this.getFullName(), paramValue);
        }
    }
    isChanged(row) {
        // console.log('Field.isChanged', this.getFullName());
        if (!this.getAttr('column'))
            throw new Error(`${this.getFullName()}: field has no column`);
        return this.getDefaultDataSource().isRowColumnChanged(row, this.getAttr('column'));
    }
    hasColumn() {
        return !!this.getAttr('column');
    }
    getValue(row) {
        // console.log('Field.getValue', this.getFullName(), row);
        if (!row && this.getParent() instanceof RowForm_1.RowForm) {
            row = this.getForm().getRow();
        }
        if (!row) {
            throw new Error(`${this.getFullName()}: need row`);
        }
        let rawValue;
        if (this.getAttr('column')) {
            rawValue = this.getRawValue(row);
        }
        else if (this.getAttr('value')) {
            const js = this.getAttr('value');
            try {
                rawValue = eval(js);
            }
            catch (err) {
                console.error(err);
                throw new Error(`${this.getFullName()}: value eval error: ${err.message}`);
            }
        }
        else {
            throw new Error(`${this.getFullName()}: no column and no value in field`);
        }
        // use rawValue
        if (rawValue === undefined)
            return undefined;
        if (rawValue === null)
            throw new Error(`[${this.getFullName()}]: null is wrong raw value`);
        try {
            return this.rawToValue(rawValue);
        }
        catch (err) {
            console.log('raw value decode error:', this.getFullName(), rawValue);
            throw err;
        }
    }
    setValue(row, value) {
        // console.log('Field.setValue', this.getFullName(), value);
        if (!this.getAttr('column'))
            throw new Error(`field has no column: ${this.getFullName()}`);
        const rawValue = this.valueToRaw(value);
        this.getForm().getDefaultDataSource().setValue(row, this.getAttr('column'), rawValue);
        this.valueToPageParams(row);
    }
    rawToValue(rawValue) {
        return common_1.Helper.decodeValue(rawValue);
    }
    valueToRaw(value) {
        return common_1.Helper.encodeValue(value);
    }
    getRawValue(row) {
        if (!this.hasColumn())
            throw new Error(`${this.getFullName()}: no column`);
        return this.getForm().getDefaultDataSource().getValue(row, this.getAttr('column'));
    }
    getDefaultDataSource() {
        return this.getForm().getDefaultDataSource();
    }
    getType() {
        if (this.getAttr('type')) {
            return this.getAttr('type');
        }
        if (this.getAttr('column')) {
            const dataSource = this.getDefaultDataSource();
            if (dataSource.isSurrogate()) {
                return dataSource.getType(this.getAttr('column'));
            }
            throw new Error('field type empty');
        }
        throw new Error('field type and column empty');
    }
    getForm() {
        return this.getParent();
    }
    getPage() {
        return this.getForm().getPage();
    }
    getApp() {
        return this.getForm().getApp();
    }
    isReadOnly() {
        return this.getData().readOnly === 'true';
    }
    isNotNull() {
        return this.getData().notNull === 'true';
    }
    isNullable() {
        return this.getData().notNull === 'false';
    }
    getWidth() {
        const width = parseInt(this.getData().width);
        if (isNaN(width))
            return null;
        if (width === 0)
            return 100;
        return width;
    }
    getFullName() {
        return `${this.getPage().getName()}.${this.getForm().getName()}.${this.getName()}`;
    }
    isParam() {
        return this.getData().param === 'true';
    }
    validateOnChange() {
        if (this.getData().validateOnChange !== undefined) {
            return this.getData().validateOnChange === 'true';
        }
        return true;
    }
    validateOnBlur() {
        if (this.getData().validateOnBlur !== undefined) {
            return this.getData().validateOnBlur === 'true';
        }
        return false;
    }
    getCaption() {
        const caption = this.getAttr('caption');
        if (caption === '') {
            const columnName = this.getAttr('column');
            if (columnName && this.getForm().hasDefaultPersistentDataSource()) {
                const ds = this.getForm().getDataSource('default');
                if (ds.getAttr('table')) {
                    const column = ds.getTable().getColumn(columnName);
                    return column.getCaption();
                }
            }
        }
        return caption;
    }
}
exports.Field = Field;
// Helper.registerGlobalClass(Field);
