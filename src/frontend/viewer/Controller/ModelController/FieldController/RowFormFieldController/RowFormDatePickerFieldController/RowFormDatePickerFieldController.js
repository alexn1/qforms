class RowFormDatePickerFieldController extends RowFormFieldController {
    getViewClass() {
        return RowFormDatePickerFieldView;
    }
    getValueForWidget() {
        return this.getValue();
    }
    setValueFromWidget(widgetValue) {
        this.setValue(widgetValue);
    }
}
window.QForms.RowFormDatePickerFieldController = RowFormDatePickerFieldController;
