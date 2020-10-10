class RowFormDatePickerFieldController extends RowFormFieldController {
    init() {
        // console.log('RowFormDatePickerFieldController.init', this.model.getFullName());
        const row = this.parent.model.getRow();
        const value = this.model.getValue(row);
        this.setValue(value);
        console.log(this.model.getFullName(), value);
    }
    setValue(value) {
        this.state.isUndefined = value === undefined;
        this.state.value = value;
    }
    // getPlaceHolder() {
    //     return 'ДД.ММ.ГГГГ';
    // }
    getValue() {
        if (this.state.isUndefined) return undefined;
        return this.state.value;
    }
}
