class RowFormCheckBoxFieldController extends RowFormFieldController {
    getValueForView() {
        return this.getValue();
    }
    setValueFromView(viewValue) {
        this.setValue(viewValue);
    }

    getViewClass() {
        return RowFormCheckBoxFieldView;
    }
}
