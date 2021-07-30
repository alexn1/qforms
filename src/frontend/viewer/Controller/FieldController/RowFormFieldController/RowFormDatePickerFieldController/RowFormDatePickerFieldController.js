class RowFormDatePickerFieldController extends RowFormFieldController {
    getViewClass() {
        return RowFormDatePickerFieldView;
    }
    getValueForWidget() {
        return this.getValue();
    }
    setValueFromWidget(viewValue) {
        this.setValue(viewValue);
    }
}
window.QForms.RowFormDatePickerFieldController = RowFormDatePickerFieldController;
