class DateField extends Field {
    getFormat() {
        return this.data.format;
    }

    rawToValue(raw) {
        // console.log('DateField.rawToValue', this.getFullName(), raw);
        const value = Helper.decodeValue(raw);
        if (value && this.getAttr('timezone') === 'false') {
            Helper.addMinutes(value, value.getTimezoneOffset());
        }
        // console.log('DateField.rawToValue:', raw, value);
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
        // console.log('DateField.valueToRaw', rawValue);
        return rawValue;
    }
}
window.QForms.DateField = DateField;
