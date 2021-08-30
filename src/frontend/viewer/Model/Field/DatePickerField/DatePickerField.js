class DatePickerField extends Field {
    getFormat() {
        return this.data.format;
    }

    rawToValue(raw) {
        const value = Helper.decodeValue(raw);
        if (value && this.getAttr('timezone') === 'false') {
            Helper.addMinutes(value, value.getTimezoneOffset());
        }
        // console.log('DatePickerField.rawToValue:', raw, value);
        return value;
    }

    valueToRaw(value) {
        let rawValue;
        if (value && this.getAttr('timezone') === 'false') {
            const v = new Date(value.getTime());
            Helper.addMinutes(v, -v.getTimezoneOffset());
            rawValue = Helper.encodeValue(v);
        } else {
            rawValue = Helper.encodeValue(value);
        }
        // console.log('DatePickerField.valueToRaw', rawValue);
        return rawValue;
    }
}
window.QForms.DatePickerField = DatePickerField;
