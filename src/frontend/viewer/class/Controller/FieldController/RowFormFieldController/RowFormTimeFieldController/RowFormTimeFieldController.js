class RowFormTimeFieldController extends RowFormFieldController {
    constructor(...args) {
        super(...args);
        this.defaultStringValue = null;
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
        return this.defaultStringValue ? TimeBox.getIntegerValue(this.defaultStringValue) : null;
    }
    setDefaultValue(defaultValue) {
        this.defaultStringValue = defaultValue;
    }
    getPlaceholder() {
        // console.log('CarReservefromTimeController.getPlaceholder', this.defaultStringValue);
        if (this.defaultStringValue) return this.defaultStringValue;
        return super.getPlaceholder();
    }
}
