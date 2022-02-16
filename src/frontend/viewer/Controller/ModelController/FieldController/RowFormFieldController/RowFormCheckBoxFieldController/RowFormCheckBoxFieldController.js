class RowFormCheckBoxFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormCheckBoxFieldView;
    }
    getValueForWidget() {
        return this.getValue();
    }
    setValueFromWidget(widgetValue) {
        this.setValue(widgetValue);
    }
}

window.QForms.RowFormCheckBoxFieldController = RowFormCheckBoxFieldController;
