class DatePickerField extends Field {
    getFormat() {
        return this.data.format;
    }

    /*getValue(row) {
        // console.log('Field.getValue', this.getFullName());
        if (this.getAttr('column')) {
            if (!row && this.parent instanceof RowForm) {
                row = this.parent.getRow();
            }
            let rawValue = this.getRawValue(row);
            if (rawValue === undefined) return undefined;
            if (rawValue === null) throw new Error(`[${this.getFullName()}]: null is wrong raw value`);
            try {
                const value = Helper.decodeValue(rawValue);
                if (value) {
                    // value.setMinutes(value.getMinutes() + value.getTimezoneOffset());
                }
                console.log('DatePickerField.getValue:', value);
                return value;
            } catch (err) {
                console.log('raw value decode error:', this.getFullName(), rawValue);
                throw err;
            }
        }
        if (this.data.value) return eval(this.data.value);
        throw new Error(`${this.getFullName()}: no column and no value in field`);
    }*/

    /*setValue(row, value) {
        // console.log('Field.setValue', this.getFullName(), value);
        if (!this.getAttr('column')) throw new Error(`field has no column: ${this.getFullName()}`);

        let value2 = value;

        if (value2) {
            value2 = new Date(value.getTime());
            // value2.setMinutes(value2.getMinutes() - value.getTimezoneOffset());
        }
        const rawValue = Helper.encodeValue(value2);
        console.log('DatePickerField.setValue', rawValue);
        this.getForm().getDefaultDataSource().setValue(row, this.getAttr('column'), rawValue);
        this.valueToPageParams(row);
    }*/
}
window.QForms.DatePickerField = DatePickerField;
