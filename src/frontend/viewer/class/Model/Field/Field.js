'use strict';

class Field extends Model {
    constructor(name, parent, data) {
        super(data, parent);
        this.form = parent;
    }

    init() {
    }

    deinit() {
        //console.log('Field.deinit: ' + this.name);
    }

    replaceThis(value) {
        return value.replace(/\{([@\w\.]+)\}/g, (text, name) => {
            if (name.indexOf('.') !== -1) {
                let arr = name.split('.');
                if (arr[0] === 'this') {
                    arr[0] = this.form.page.name;
                }
                if (arr[0] === 'parent' && this.form.page.parentPageName) {
                    arr[0] = this.form.page.parentPageName;
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
                ...this.form.page.params,
                ...this.form.page.app.data.params
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
        // console.log('Field.valueToParams', this.name);
        if (this.data.column) {
            const fullName = this.getFullName();
            this.form.page.params[fullName] = this.getValue(row);
        }
    }

    setValue(row, value) {
        console.log('Field.setValue', this.name);
        if (!this.data.column) throw new Error(`field has no column: ${this.name}`);
        const newValue = this.form.dataSource.setValue(row, this.data.column, value);
        this.valueToParams(row);
        return newValue;
    }

    isChanged(row) {
        // console.log('Field.isChanged', this.name);
        if (!this.data.column) throw new Error(`${this.getFullName()}: field has no column`);
        return this.getDataSource().isRowColumnChanged(row, this.data.column);
    }

    getValue(row) {
        // console.log('Field.getValue', this.getFullName());
        let value;
        if (this.data.column) {
            value = this.form.dataSource.getValue(row, this.data.column);
        } else if (this.data.value) {
            value = eval(this.data.value);
        } else {
            throw new Error(`no column and no value in field: ${this.getFullName()}`);
        }
        return value;
    }

    getFullName() {
        return [
            this.form.page.name,
            this.form.name,
            this.name
        ].join('.');
    }

    getDataSource() {
        return this.form.getDataSource();
    }

    getColumnType() {
        if (this.data.column) {
            return this.getDataSource().getColumnType(this.data.column);
        }
        return null;
    }
}
