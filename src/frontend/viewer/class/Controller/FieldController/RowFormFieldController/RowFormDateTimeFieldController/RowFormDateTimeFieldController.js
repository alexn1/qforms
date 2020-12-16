class RowFormDateTimeFieldController extends RowFormFieldController {
    getViewClass() {
        return RowFormDateTimeFieldView;
    }
    getValueForView() {
        return this.getValue();
    }
    getValueForTime() {
        const date = this.getValue();
        if (date) {
            return date.getHours()*60 + date.getMinutes();
        }
        return null;
    }
    setValueFromView(viewValue) {
        this.setValue(viewValue);
    }
}