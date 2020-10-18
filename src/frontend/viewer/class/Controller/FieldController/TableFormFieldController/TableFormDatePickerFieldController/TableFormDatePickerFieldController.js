'use strict';

class TableFormDatePickerFieldController extends TableFormFieldController {
    getValueForView(row) {
        const value = this.model.getValue(row);
        if (value) return Helper.formatDate(this.model.getValue(row), '{DD}.{MM}.{YYYY}');
        return '';
    }
}
