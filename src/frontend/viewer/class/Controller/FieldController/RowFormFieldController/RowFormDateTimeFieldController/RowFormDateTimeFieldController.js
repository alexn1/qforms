class RowFormDateTimeFieldController extends RowFormFieldController {
    getViewClass() {
        return RowFormDateTimeFieldView;
    }
    getValueForView() {
        return this.getValue();
    }
    setValueFromView(viewValue) {
        this.setValue(viewValue);
    }
}