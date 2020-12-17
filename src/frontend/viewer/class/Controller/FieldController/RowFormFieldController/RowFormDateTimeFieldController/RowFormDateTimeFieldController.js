class RowFormDateTimeFieldController extends RowFormFieldController {
    constructor(...args) {
        super(...args);
        // this.view2 = null;
        this.defaultValue = 0;
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
    /*onView2Create = view2 => {
        console.log('RowFormDateTimeFieldController.onView2Create', view2);
        this.view2 = view2;
    }*/
    onChange2 = viewValue => {
        console.log('RowFormDateTimeFieldController.onChange2', viewValue);
        if (!isNaN(viewValue) && this.state.value) {
            const value = viewValue !== null ? viewValue : this.defaultValue;
            const hours = Math.floor(value / 60);
            const minutes = value - hours * 60;
            this.state.value.setHours(hours, minutes);
            // console.log('this.state.value:', this.state.value);
            this.copyValueToModel();
            this.refreshChanged();
            this.parent.onFieldChange({source: this});
        }
    }
    getPlaceholder2() {
        return TimeBox.getStringValue(this.defaultValue);
    }
}
