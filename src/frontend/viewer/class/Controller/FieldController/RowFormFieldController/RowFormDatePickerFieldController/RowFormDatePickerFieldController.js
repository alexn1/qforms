'use strict';
class RowFormDatePickerFieldController extends RowFormFieldController {
    /*setValue(value) {
        this.state.isUndefined = value === undefined;
        this.state.value = value;
    }*/
    /*getValue() {
        if (this.state.isUndefined) return undefined;
        return this.state.value;
    }*/
    getValueForView() {
        return this.getValue();
    }

    setValueFromView(viewValue) {
        this.setValue(viewValue);
    }

    getViewClass() {
        return RowFormDatePickerFieldView;
    }
}
