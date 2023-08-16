import { Model } from '../Model';
import { Helper } from '../../../common';
import { RowForm } from '../Form/RowForm/RowForm';
import { JSONString, RawRow } from '../../../../types';
import { DataSource } from '../DataSource/DataSource';
import { Form } from '../Form/Form';
import { Page } from '../Page/Page';
import { Application } from '../Application/Application';
import { FieldData } from '../../../../common/FieldData';

export class Field extends Model<FieldData> {
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
        // console.debug('Field.fillDefaultValue', this.getFullName());
        const column = this.getAttr('column');
        if (!column) return;
        const defaultValue = this.replaceThis(this.getAttr('defaultValue'));
        const js = Helper.templateToJsString(defaultValue, this.getPage().getParams());
        if (typeof js !== 'string')
            throw new Error(`${this.getFullName()}: defaultValue must be templated to js string`);
        // console.debug('js', this.getFullName(), js);
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
        // console.debug('Field.valueToPageParams', this.getFullName());
        if (this.isParam()) {
            // we need to dump value to param without meta info such as timezone prop
            const value = this.getValue(row);
            const rawValue = this.valueToRaw(value);
            // console.debug('value:', value);
            // console.debug('rawValue:', rawValue);
            const paramValue = rawValue !== undefined ? Helper.decodeValue(rawValue) : undefined;
            this.getPage().setParam(this.getFullName(), paramValue);
        }
    }

    isChanged(row: RawRow): boolean {
        // console.debug('Field.isChanged', this.getFullName());
        if (!this.getAttr('column')) throw new Error(`${this.getFullName()}: field has no column`);
        return this.getDefaultDataSource().isRowColumnChanged(row, this.getAttr('column'));
    }

    hasColumn(): boolean {
        return !!this.getAttr('column');
    }

    getValue(row?: RawRow): any {
        // console.debug('Field.getValue', this.getFullName(), row);
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
            console.debug('raw value decode error:', this.getFullName(), rawValue);
            throw err;
        }
    }

    setValue(row: RawRow, value: any) {
        // console.debug('Field.setValue', this.getFullName(), value);
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
        return this.getData().readOnly === 'true';
    }

    isNotNull(): boolean {
        return this.getData().notNull === 'true';
    }

    isNullable(): boolean {
        return this.getData().notNull === 'false';
    }

    getWidth(): number | null {
        const width = parseInt(this.getData().width);
        if (isNaN(width)) return null;
        if (width === 0) return 100;
        return width;
    }

    getFullName(): string {
        return `${this.getPage().getName()}.${this.getForm().getName()}.${this.getName()}`;
    }

    isParam(): boolean {
        return this.getData().param === 'true';
    }

    validateOnChange(): boolean {
        if (this.getData().validateOnChange !== undefined) {
            return this.getData().validateOnChange === 'true';
        }
        return true;
    }

    validateOnBlur(): boolean {
        if (this.getData().validateOnBlur !== undefined) {
            return this.getData().validateOnBlur === 'true';
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
