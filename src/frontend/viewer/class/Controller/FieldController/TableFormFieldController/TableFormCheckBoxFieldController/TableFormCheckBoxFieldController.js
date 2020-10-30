'use strict';

class TableFormCheckBoxFieldController extends TableFormFieldController {
    getViewClass() {
        return TableFormCheckBoxFieldView;
    }
    getValueForView(row) {
        return this.model.getValue(row);
    }
}
