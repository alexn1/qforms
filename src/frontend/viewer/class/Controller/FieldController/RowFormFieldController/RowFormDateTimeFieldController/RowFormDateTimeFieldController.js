class RowFormDateTimeFieldController extends RowFormFieldController {
    constructor(...args) {
        super(...args);
        this.view2 = null;
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
            return date.getHours()*60 + date.getMinutes();
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
        if (!isNaN(viewValue) && this.state.value) {
            if (viewValue === null) {
                this.state.value.setHours(5, 5);
                console.log('this.state.value:', this.state.value);
                this.copyValueToModel();
                this.refreshChanged();
                this.parent.onFieldChange({source: this});
            }
        }
    }
}