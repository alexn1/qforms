'use strict';

class Field extends Model {
    // constructor(data, parent) {
    //     super(data, parent);
    // }

    init() {
    }

    // deinit() {
    //     console.log('Field.deinit:', this.getFullName());
    //     super.deinit();
    // }

    replaceThis(value) {
        return value.replace(/\{([@\w\.]+)\}/g, (text, name) => {
            if (name.indexOf('.') !== -1) {
                let arr = name.split('.');
                if (arr[0] === 'this') {
                    arr[0] = this.getPage().getName();
                }
                if (arr[0] === 'parent' && this.getPage().parentPageName) {
                    arr[0] = this.getPage().parentPageName;
                }
                return '{' + arr.join('.') + '}';
            } else {
                return text;
            }
        });
    }

    fillDefaultValue(row) {
        // console.log('Field.fillDefaultValue', this.getFullName());
        if (this.data.column) {
            const defaultValue = this.replaceThis(this.data.defaultValue);
            const params = {
                ...this.getPage().params,
                ...this.getApp().data.params
            };
            const code = QForms.templateValue(defaultValue, params);
            let value;
            try {
                //console.log('eval: ' + code);
                value = eval(code);
                if (value !== undefined) {
                    row[this.data.column] = value;
                }
            } catch (err) {
                throw new Error(`[${this.getFullName()}] default value error: ${err.toString()}`);
            }
        }
    }

    valueToParams(row) {
        // console.log('Field.valueToParams', this.getFullName());
        if (this.data.column) {
            this.getPage().params[this.getFullName()] = this.getValue(row);
        }
    }

    setValue(row, value) {
        console.log('Field.setValue', this.getFullName(), value);
        if (!this.data.column) throw new Error(`field has no column: ${this.getFullName()}`);
        const valueForDataSource = this.getValueForDataSource(value);
        this.getForm().getDataSource().setValue(row, this.data.column, valueForDataSource);
        this.valueToParams(row);
    }

    getValueForDataSource(value) {
        if (value === undefined) throw new Error('undefined is wrong value for data source');
        if (value === null) return null;

        const columnType = this.getColumnType();
        const valueType = typeof value;
        if (columnType === 'date') {
            if (!(value instanceof Date)) {
                throw new Error(`${this.getFullName()}: value not instance of Date`);
            }
        } else if (columnType !== valueType) {
            throw new Error(`${this.getFullName()}: wrong value type for column: ${valueType} instead of ${columnType}`);
        }


        if (valueType === 'object') {
            if (value instanceof Date) return value.toISOString();
            return JSON.stringify(value);
        }
        return value;
    }

    isChanged(row) {
        // console.log('Field.isChanged', this.getFullName());
        if (!this.data.column) throw new Error(`${this.getFullName()}: field has no column`);
        return this.getDataSource().isRowColumnChanged(row, this.data.column);
    }

    getValueFromDataSource(row) {
        if (!this.hasColumn()) throw new Error(`${this.getFullName()}: no column`);
        return this.getForm().getDataSource().getValue(row, this.data.column);
    }

    hasColumn() {
        return !!this.data.column;
    }

    getValue(row) {
        // console.log('Field.getValue', this.getFullName());
        if (this.data.column) {
            let value = this.getForm().getDataSource().getValue(row, this.data.column);
            if (value === null) return null;
            const columnType = this.getColumnType();
            if (columnType === 'date') {
                if (value === undefined) return null; // workaround for new row
                if (typeof value !== 'string') throw new Error(`${this.getFullName()}: wrong value for date column: ${value}`);
                return new Date(value);
            } else if (columnType === 'object') {
                return JSON.parse(value);
            }
            return value;
        } else if (this.data.value) {
            return eval(this.data.value);
        } else {
            throw new Error(`no column and no value in field: ${this.getFullName()}`);
        }
    }

    getDataSource() {
        return this.getForm().getDataSource();
    }

    getColumnType() {
        if (this.data.column) {
            return this.getDataSource().getColumnType(this.data.column);
        }
        return null;
    }

    getForm() {
        return this.parent;
    }

    getPage() {
        return this.parent.parent;
    }

    getApp() {
        return this.parent.parent.parent;
    }


}
