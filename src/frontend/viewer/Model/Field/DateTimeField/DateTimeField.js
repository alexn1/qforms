class DateTimeField extends Field {
    getFormat() {
        return this.getAttr('format');
    }
    rawToValue(rawValue) {
        const value = Helper.decodeValue(rawValue);
        if (value && this.getAttr('timezone') === 'false') {
            Helper.addTimezoneOffset(value);
        }
        // console.log('DateTimeField.rawToValue:', value);
        return value;
    }
    valueToRaw(value) {
        let rawValue;
        if (value && this.getAttr('timezone') === 'false') {
            const v = Helper.cloneDate(value);
            Helper.removeTimezoneOffset(v);
            // console.log('date without timezone:', v);
            rawValue = Helper.encodeValue(v);
        } else {
            rawValue = Helper.encodeValue(value);
        }
        // console.log('DateTimeField.valueToRaw', rawValue);
        return rawValue;
    }
}
window.QForms.DateTimeField = DateTimeField;
