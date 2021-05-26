class RowFormDatePickerFieldController extends RowFormFieldController {
    getViewClass() {
        return RowFormDatePickerFieldView;
    }
    getValueForView() {
        return this.getValue();
    }
    setValueFromView(viewValue) {
        this.setValue(viewValue);
    }
}
