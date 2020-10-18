'use strict';
class RowFormDatePickerFieldController extends RowFormFieldController {
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
