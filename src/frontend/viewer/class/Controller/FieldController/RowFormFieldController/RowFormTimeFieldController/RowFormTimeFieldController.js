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
    onBlur = () => {
        console.log('RowFormTimeFieldController.onBlur', this.model.getFullName());
        this.validate();
        if (this.isValid()) {
            this.model.setValue(this.getRow(), this.getValue());
        }
        this.refreshChanged();
        this.parent.onFieldChange({source: this});
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
