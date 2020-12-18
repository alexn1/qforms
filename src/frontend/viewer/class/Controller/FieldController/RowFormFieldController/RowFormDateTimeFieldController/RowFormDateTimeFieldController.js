class RowFormDateTimeFieldController extends RowFormFieldController {
    constructor(...args) {
        super(...args);
        this.view2 = null;
        this.defaultValue = 0;
        this.parseError2 = false;
        this.state.error2 = null;
    }
    getViewClass() {
        return RowFormDateTimeFieldView;
    }
    getValueForView() {
        return this.getValue();
    }
    getValueForTime() {
        const date = this.getValue();
        if (date) {
            const value = date.getHours()*60 + date.getMinutes();
            if (value !== this.defaultValue) return value;
        }
        return null;
    }
    setValueFromView(viewValue) {
        this.setValue(viewValue);
    }
    onView2Create = view2 => {
        console.log('RowFormDateTimeFieldController.onView2Create', view2);
        this.view2 = view2;
    }
    onChange2 = viewValue => {
        console.log('RowFormDateTimeFieldController.onChange2', viewValue);
        this.resetErrors2();
        try {
            this.setValueFromView2(viewValue);
        } catch (err) {
            console.log(`${this.model.getFullName()}: cannot parse time: ${err.message}`);
            this.parseError2 = true;
        }
        this.validate2();
        if (this.isValid()) {
            this.copyValueToModel();
        }
        this.refreshChanged();
        this.parent.onFieldChange({source: this});
    }
    getPlaceholder2() {
        return TimeBox.getStringValue(this.defaultValue);
    }
    getDefaultValue() {
        return this.defaultValue;
    }
    setDefaultValue(defaultValue) {
        if (typeof defaultValue === 'string') {
            this.defaultValue = TimeBox.getIntegerValue(defaultValue);
        } else {
            if (defaultValue >= 24*60) throw new Error(`wrong default value: ${defaultValue}`);
            this.defaultValue = defaultValue;
        }
    }
    setValueFromView2(viewValue) {
        if (isNaN(viewValue)) throw new Error('wrong time');
        this.setValue2(viewValue);
    }
    setValue2(viewValue) {
        const value = viewValue !== null ? viewValue : this.defaultValue;
        const hours = Math.floor(value / 60);
        const minutes = value - hours * 60;
        this.state.value.setHours(hours, minutes);
    }
    validate2() {
        // console.log('RowFormFieldController.validate', this.model.getFullName());
        this.state.error2 = this.getError2();
    }
    getError2() {
        // console.log('RowFormFieldController.getError', this.model.getFullName());

        // parse validator
        if (this.view2) {
            try {
                const viewValue = this.view2.getValue();
            } catch (err) {
                return `can't parse time: ${err.message}`;
            }
        }

        return null;
    }
    isParseError() {
        return super.isParseError() || this.parseError2;
    }
    resetErrors2() {
        this.setError2(null);
        this.parseError2 = false;
    }
    setError2(error2) {
        this.state.error2 = error2;
    }
    setValue(value) {
        if (this.state.value && value) {
            this.state.value.setFullYear(value.getFullYear(), value.getMonth(), value.getDate());
        } else {
            this.state.value = value;
        }
    }
    refill() {
        // console.log('RowFormDateTimeFieldController.refill');
        this.view2.reset();
        this.resetErrors2();
        super.refill();
    }
    isValid() {
        return super.isValid() && this.state.error2 === null;
    }
    getErrorMessage() {
        if (this.state.error === null && this.state.error2 === null) return null;
        return [
            ...(this.state.error  ? [this.state.error]  : []),
            ...(this.state.error2 ? [this.state.error2] : [])
        ].join(', ');
    }
}
