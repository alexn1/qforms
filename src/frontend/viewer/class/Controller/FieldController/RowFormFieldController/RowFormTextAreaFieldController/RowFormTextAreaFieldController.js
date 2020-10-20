'use strict';
class RowFormTextAreaFieldController extends RowFormFieldController {
    getValue() {
        if (this.state.isUndefined) return undefined;
        return this.stringToValue(this.state.value);
    }
    setValue(value) {
        this.state.isUndefined = value === undefined;
        this.state.value = this.valueToString(value);
    }
}
