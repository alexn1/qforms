class RowFormCheckBoxFieldController extends RowFormFieldController {
    getValueForWidget() {
        return this.getValue();
    }
    setValueFromWidget(widgetValue) {
        this.setValue(widgetValue);
    }

    getViewClass() {
        return RowFormCheckBoxFieldView;
    }
}

window.QForms.RowFormCheckBoxFieldController = RowFormCheckBoxFieldController;
