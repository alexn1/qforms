class RowFormTimeFieldController extends RowFormFieldController {
    constructor(...args) {
        super(...args);
        this.defaultValue = null;
    }
    getViewClass() {
        return RowFormTimeFieldView;
    }
    getValueForView() {
        return this.getValue();
    }
    setValueFromView(viewValue) {
        if (isNaN(viewValue)) throw new Error('wrong time');
        this.setValue(viewValue);
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
    getPlaceholder() {
        // console.log('CarReservefromTimeController.getPlaceholder', this.defaultValue);
        if (this.defaultValue !== null) return TimeBox.getStringValue(this.defaultValue);
        return super.getPlaceholder();
    }
}
window.QForms.RowFormTimeFieldController = RowFormTimeFieldController;
