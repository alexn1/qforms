'use strict';
class RowFormCheckBoxFieldController extends RowFormFieldController {
    setValue(value) {
        console.log('RowFormCheckBoxFieldController.setValue', value);
        this.state.isUndefined = value === undefined;
        this.state.value = value;
    }
    getValue() {
        if (this.state.isUndefined) return undefined;
        return this.state.value;
    }
    getViewClass() {
        return RowFormCheckBoxFieldView;
    }
}
