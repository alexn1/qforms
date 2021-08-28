class DatePickerField extends Field {
    getFormat() {
        return this.data.format;
    }

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

    rawToValue(rawValue) {
        const value = Helper.decodeValue(rawValue);
        if (value && this.getAttr('timezone') === 'false') {
            value.setMinutes(value.getMinutes() + value.getTimezoneOffset());
        }
        console.log('DatePickerField.rawToValue:', value);
        return value;
    }

    valueToRaw(value) {
        let rawValue;
        if (value) {
            const v = new Date(value.getTime());
            v.setMinutes(v.getMinutes() - value.getTimezoneOffset())
            rawValue = Helper.encodeValue(v);
        } else {
            rawValue = Helper.encodeValue(value);
        }
        console.log('DatePickerField.valueToRaw', rawValue);
        return rawValue;
    }
}
window.QForms.DatePickerField = DatePickerField;
