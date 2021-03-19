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
            if (arr[0] === 'parent' && this.getPage().getParentPageName()) {
                arr[0] = this.getPage().getParentPageName();
            }
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
        // console.log('Field.valueToPageParams', this.getFullName(), this.getDbType());
        // if (this.getDbType() === 'text') return;
        if (this.isParam()) {
            this.getPage().addPageParam(this.getFullName(), this.getValue(row));
        }
    }

    setValue(row, value) {
        // console.log('Field.setValue', this.getFullName(), value);
        if (!this.data.column) throw new Error(`field has no column: ${this.getFullName()}`);
        const rawValue = Helper.encodeValue(value);
        this.getForm().getDefaultDataSource().setValue(row, this.data.column, rawValue);
        this.valueToPageParams(row);
    }

    isChanged(row) {
        // console.log('Field.isChanged', this.getFullName());
        if (!this.data.column) throw new Error(`${this.getFullName()}: field has no column`);
        return this.getDefaultDataSource().isRowColumnChanged(row, this.data.column);
    }

    getRawValue(row) {
        if (!this.hasColumn()) throw new Error(`${this.getFullName()}: no column`);
        return this.getForm().getDefaultDataSource().getValue(row, this.data.column);
    }

    hasColumn() {
        return !!this.data.column;
    }

    getValue(row) {
        // console.log('Field.getValue', this.getFullName());
        if (this.data.column) {
            let rawValue = this.getRawValue(row);
            if (rawValue === undefined) return undefined;
            if (rawValue === null) throw new Error(`[${this.getFullName()}]: null is wrong raw value`);
            try {
                return Helper.decodeValue(rawValue);
            } catch (err) {
                console.log('rawValue:', this.getFullName(), rawValue);
                throw err;
            }
        }
        if (this.data.value) return eval(this.data.value);
        throw new Error(`${this.getFullName()}: no column and no value in field`);
    }

    getDefaultDataSource() {
        return this.getForm().getDefaultDataSource();
    }

    getType() {
        const dataSource = this.getDefaultDataSource();
        if (dataSource.getClassName() === 'SqlDataSource' && this.data.column) {
            return this.getDefaultDataSource().getType(this.data.column);
        }
        if (this.data.type) return this.data.type;
        throw new Error(`${this.getFullName()}: field type empty`);
    }

    getDbType() {
        const dataSource = this.getDefaultDataSource();
        if (dataSource.getClassName() === 'SqlDataSource' && this.data.column) {
            return this.getDefaultDataSource().getDbType(this.data.column);
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
        return this.data.isVisible === 'true';
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
}
