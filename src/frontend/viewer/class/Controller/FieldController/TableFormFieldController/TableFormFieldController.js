'use strict';

class TableFormFieldController extends FieldController {
    getValueForView(row) {
        return this.valueToString(this.model.getValue(row));
    }
    renderViewStyle(row) {
        return null;
    }
}
