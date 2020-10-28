'use strict';

class TableFormCheckBoxFieldController extends TableFormFieldController {
    getViewClass() {
        return TableFormCheckBoxFieldView;
    }
    renderValueForView(row) {
        return this.model.getValue(row);
    }
}
