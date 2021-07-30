class RowFormDatePickerFieldController extends RowFormFieldController {
    getViewClass() {
        return RowFormDatePickerFieldView;
    }
    getValueForWidget() {
        return this.getValue();
    }
    setValueFromView(viewValue) {
        this.setValue(viewValue);
    }
}
window.QForms.RowFormDatePickerFieldController = RowFormDatePickerFieldController;
