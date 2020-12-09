class RowFormTimeFieldController extends RowFormFieldController {
    getViewClass() {
        return RowFormTimeFieldView;
    }
    getValueForView() {
        return this.getValue();
    }
    setValueFromView(viewValue) {
        if (isNaN(viewValue)) throw new Error('wrong time');
        this.setValue(viewValue);
    }
    getError() {
        console.log('RowFormTimeFieldController.getError', this.model.getFullName());
        try {
            const viewValue = this.view.getValue();
            this.setValueFromView(viewValue);
        } catch (err) {
            return `cannot parse view value: ${err.message}`;
        }
        return super.getError();
    }
}
