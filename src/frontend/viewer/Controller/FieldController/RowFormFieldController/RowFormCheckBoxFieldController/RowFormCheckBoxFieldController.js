class RowFormCheckBoxFieldController extends RowFormFieldController {
    getValueForWidget() {
        return this.getValue();
    }
    setValueFromView(viewValue) {
        this.setValue(viewValue);
    }

    getViewClass() {
        return RowFormCheckBoxFieldView;
    }
}

window.QForms.RowFormCheckBoxFieldController = RowFormCheckBoxFieldController;
