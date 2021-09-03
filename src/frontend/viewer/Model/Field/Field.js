class Field extends Model {
    // constructor(data, parent) {
    //     super(data, parent);
    // }

    init() {
    }

    replaceThis(value) {
        return value.replace(/\{([@\w\.]+)\}/g, (text, name) => {
            if (name.indexOf('.') === -1) return text;
            let arr = name.split('.');
            if (arr[0] === 'this') arr[0] = this.getPage().getName();
            return `{${arr.join('.')}}`;
        });
    }

    fillDefaultValue(row) {
        // console.log('Field.fillDefaultValue', this.getFullName());
        const column = this.getAttr('column');
        if (!column) return;
        const defaultValue = this.replaceThis(this.getAttr('defaultValue'));
        const js = Helper.templateToJsString(defaultValue, this.getPage().getParams());
        if (typeof js !== 'string') throw new Error(`${this.getFullName()}: defaultValue must be templated to js string`);
        // console.log('js', this.getFullName(), js);
        try {
            const value = eval(js);
            if (value !== undefined) {
                row[column] = Helper.encodeValue(value);
            }
        } catch (err) {
            throw new Error(`[${this.getFullName()}] fillDefaultValue: ${err.toString()}`);
        }
    }

    valueToPageParams(row) {
        // console.log('Field.valueToPageParams', this.getFullName());
        if (this.isParam()) {
            this.getPage().addParam(this.getFullName(), this.getValue(row));
        }
    }

    isChanged(row) {
        // console.log('Field.isChanged', this.getFullName());
        if (!this.getAttr('column')) throw new Error(`${this.getFullName()}: field has no column`);
        return this.getDefaultDataSource().isRowColumnChanged(row, this.getAttr('column'));
    }

    hasColumn() {
        return !!this.getAttr('column');
    }

    getValue(row) {
        // console.log('Field.getValue', this.getFullName());
        if (this.getAttr('column')) {
            if (!row && this.parent instanceof RowForm) {
                row = this.parent.getRow();
            }
            let rawValue = this.getRawValue(row);
            if (rawValue === undefined) return undefined;
            if (rawValue === null) throw new Error(`[${this.getFullName()}]: null is wrong raw value`);
            try {
                return this.rawToValue(rawValue)
            } catch (err) {
                console.log('raw value decode error:', this.getFullName(), rawValue);
                throw err;
            }
        }
        if (this.data.value) return eval(this.data.value);
        throw new Error(`${this.getFullName()}: no column and no value in field`);
    }

    setValue(row, value) {
        // console.log('Field.setValue', this.getFullName(), value);
        if (!this.getAttr('column')) throw new Error(`field has no column: ${this.getFullName()}`);
        const rawValue = this.valueToRaw(value);
        this.getForm().getDefaultDataSource().setValue(row, this.getAttr('column'), rawValue);
        this.valueToPageParams(row);
    }

    rawToValue(rawValue) {
        return Helper.decodeValue(rawValue);
    }

    valueToRaw(value) {
        return Helper.encodeValue(value);
    }

    getRawValue(row) {
        if (!this.hasColumn()) throw new Error(`${this.getFullName()}: no column`);
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
            return this.getDefaultDataSource().getType(this.getAttr('column'));
        }
        throw new Error(`fields type and column empty`);
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

    isReadOnly() {
        return this.data.readOnly === 'true';
    }
    isNotNull() {
        return this.data.notNull === 'true';
    }
    isNullable() {
        return this.data.notNull === 'false';
    }
    isVisible() {
        return this.data.visible === 'true';
    }
    getWidth() {
        return this.data.width !== '0' ? parseInt(this.data.width) : 100;
    }
    getFullName() {
        return `${this.getPage().getName()}.${this.getForm().getName()}.${this.getName()}`;
    }
    isParam() {
        return this.data.param === 'true';
    }
    /*getPlaceholder() {
        return this.getAttr('placeholder');
    }*/
    validateOnChange() {
        if (this.data.validateOnChange !== undefined) {
            return this.data.validateOnChange === 'true';
        }
        return true;
    }
    validateOnBlur() {
        if (this.data.validateOnBlur !== undefined) {
            return this.data.validateOnBlur === 'true';
        }
        return false;
    }
    getCaption() {
        const caption = this.getAttr('caption');
        if (caption === '') {
            const columnName = this.getAttr('column');
            if (columnName && this.parent.hasDefaultSqlDataSource()) {
                const ds = this.parent.getDataSource('default');
                if (ds.getAttr('table')) {
                    const column = ds.getTable().getColumn(columnName);
                    return column.getCaption();
                }
            }
        }
        return caption;
    }
}
window.QForms.Field = Field;
