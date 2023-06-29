import { Model } from '../Model';
import { Helper } from '../../../common';
import { RowForm } from '../Form/RowForm/RowForm';
import { JSONString, RawRow } from '../../../../types';
import { DataSource } from '../DataSource/DataSource';
import { Form } from '../Form/Form';
import { Page } from '../Page/Page';
import { Application } from '../Application/Application';

export class Field extends Model {
    // constructor(data, parent) {
    //     super(data, parent);
    // }

    init() {}

    replaceThis(value) {
        return value.replace(/\{([@\w\.]+)\}/g, (text, name) => {
            if (name.indexOf('.') === -1) return text;
            let arr = name.split('.');
            if (arr[0] === 'this') arr[0] = this.getPage().getName();
            return `{${arr.join('.')}}`;
        });
    }

    fillDefaultValue(row: RawRow) {
        // console.log('Field.fillDefaultValue', this.getFullName());
        const column = this.getAttr('column');
        if (!column) return;
        const defaultValue = this.replaceThis(this.getAttr('defaultValue'));
        const js = Helper.templateToJsString(defaultValue, this.getPage().getParams());
        if (typeof js !== 'string')
            throw new Error(`${this.getFullName()}: defaultValue must be templated to js string`);
        // console.log('js', this.getFullName(), js);
        // module.Helper
        try {
            const value = eval(js);
            if (value !== undefined) {
                row[column] = this.valueToRaw(value);
            }
        } catch (err) {
            throw new Error(`[${this.getFullName()}] fillDefaultValue: ${err.toString()}`);
        }
    }

    valueToPageParams(row: RawRow) {
        // console.log('Field.valueToPageParams', this.getFullName());
        if (this.isParam()) {
            // we need to dump value to param without meta info such as timezone prop
            const value = this.getValue(row);
            const rawValue = this.valueToRaw(value);
            // console.log('value:', value);
            // console.log('rawValue:', rawValue);
            const paramValue = rawValue !== undefined ? Helper.decodeValue(rawValue) : undefined;
            this.getPage().setParam(this.getFullName(), paramValue);
        }
    }

    isChanged(row: RawRow): boolean {
        // console.log('Field.isChanged', this.getFullName());
        if (!this.getAttr('column')) throw new Error(`${this.getFullName()}: field has no column`);
        return this.getDefaultDataSource().isRowColumnChanged(row, this.getAttr('column'));
    }

    hasColumn(): boolean {
        return !!this.getAttr('column');
    }

    getValue(row?: RawRow): any {
        // console.log('Field.getValue', this.getFullName(), row);
        if (!row && this.getParent() instanceof RowForm) {
            row = (this.getForm() as RowForm).getRow();
        }
        if (!row) {
            throw new Error(`${this.getFullName()}: need row`);
        }
        let rawValue: JSONString;
        if (this.getAttr('column')) {
            rawValue = this.getRawValue(row);
        } else if (this.getAttr('value')) {
            const js = this.getAttr('value');
            try {
                rawValue = eval(js);
            } catch (err) {
                console.error(err);
                throw new Error(`${this.getFullName()}: value eval error: ${err.message}`);
            }
        } else {
            throw new Error(`${this.getFullName()}: no column and no value in field`);
        }

        // use rawValue
        if (rawValue === undefined) return undefined;
        if (rawValue === null) throw new Error(`[${this.getFullName()}]: null is wrong raw value`);
        try {
            return this.rawToValue(rawValue);
        } catch (err) {
            console.log('raw value decode error:', this.getFullName(), rawValue);
            throw err;
        }
    }

    setValue(row: RawRow, value: any) {
        // console.log('Field.setValue', this.getFullName(), value);
        if (!this.getAttr('column')) throw new Error(`field has no column: ${this.getFullName()}`);
        const rawValue = this.valueToRaw(value);
        this.getForm().getDefaultDataSource().setValue(row, this.getAttr('column'), rawValue);
        this.valueToPageParams(row);
    }

    rawToValue(rawValue: JSONString) {
        return Helper.decodeValue(rawValue);
    }

    valueToRaw(value: any): JSONString {
        return Helper.encodeValue(value);
    }

    getRawValue(row: RawRow): JSONString {
        if (!this.hasColumn()) throw new Error(`${this.getFullName()}: no column`);
        return this.getForm().getDefaultDataSource().getValue(row, this.getAttr('column'));
    }

    getDefaultDataSource(): DataSource {
        return this.getForm().getDefaultDataSource();
    }

    getType(): string {
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

    getForm(): Form {
        return this.getParent() as Form;
    }

    getPage(): Page {
        return this.getForm().getPage();
    }

    getApp(): Application {
        return this.getForm().getApp();
    }

    isReadOnly(): boolean {
        return this.data.readOnly === 'true';
    }

    isNotNull(): boolean {
        return this.data.notNull === 'true';
    }

    isNullable(): boolean {
        return this.data.notNull === 'false';
    }

    getWidth(): number | null {
        const width = parseInt(this.data.width);
        if (isNaN(width)) return null;
        if (width === 0) return 100;
        return width;
    }

    getFullName(): string {
        return `${this.getPage().getName()}.${this.getForm().getName()}.${this.getName()}`;
    }

    isParam(): boolean {
        return this.data.param === 'true';
    }

    validateOnChange(): boolean {
        if (this.data.validateOnChange !== undefined) {
            return this.data.validateOnChange === 'true';
        }
        return true;
    }

    validateOnBlur(): boolean {
        if (this.data.validateOnBlur !== undefined) {
            return this.data.validateOnBlur === 'true';
        }
        return false;
    }

    getCaption(): string {
        const caption = this.getAttr('caption');
        if (caption === '') {
            const columnName = this.getAttr('column');
            if (columnName && this.getForm().hasDefaultPersistentDataSource()) {
                const ds = this.getForm().getDataSource('default');
                if (ds!.getAttr('table')) {
                    const column = ds!.getTable().getColumn(columnName);
                    return column.getCaption();
                }
            }
        }
        return caption;
    }
}

// Helper.registerGlobalClass(Field);
