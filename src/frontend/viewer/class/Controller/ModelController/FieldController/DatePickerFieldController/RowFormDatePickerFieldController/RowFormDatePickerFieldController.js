class RowFormDatePickerFieldController extends RowFormFieldController {
    // constructor(model, parent) {
    //     super(model, parent);
    // }
    init() {
        console.log('RowFormDatePickerFieldController.init', this.model.getFullName());
        const row = this.parent.model.getRow();
        const value = this.model.getValue(row);
        this.isUndefined = value === undefined;
        this.state.value = value;
    }
    setValue(value) {
        throw new Error('not implemented');
        // this.isUndefined = value === undefined;
    }
    // getPlaceHolder() {
    //     return 'ДД.ММ.ГГГГ';
    // }
    getValue() {
        if (this.isUndefined) return undefined;
        return this.state.value;
    }

}
