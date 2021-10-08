class RowFormDatePickerFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormDatePickerFieldView;
    }
    getValueForWidget() {
        return this.getValue();
    }
    setValueFromWidget(widgetValue) {
        this.setValue(widgetValue);
    }
}
window.QForms.RowFormDatePickerFieldController = RowFormDatePickerFieldController;
