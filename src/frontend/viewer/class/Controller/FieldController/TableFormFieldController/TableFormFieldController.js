'use strict';

class TableFormFieldController extends FieldController {
    renderValueForView(row) {
        return this.valueToString(this.model.getValue(row));
    }
    renderViewStyle(row) {
        return null;
    }
}
