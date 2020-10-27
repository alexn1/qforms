'use strict';

class TableFormCheckBoxFieldController extends TableFormFieldController {
    renderValueForView(row) {
        return this.model.getValue(row);
    }
}
