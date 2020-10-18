'use strict';

class TableFormFieldController extends FieldController {
    getValueForView(row) {
        const value = this.model.getValue(row);
        return this.valueToString(value);
    }
}
