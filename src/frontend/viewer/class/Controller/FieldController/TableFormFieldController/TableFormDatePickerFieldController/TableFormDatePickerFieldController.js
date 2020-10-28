'use strict';

class TableFormDatePickerFieldController extends TableFormFieldController {
    getViewClass() {
        return TableFormDatePickerFieldView;
    }
    renderValueForView(row) {
        const value = this.model.getValue(row);
        if (value) return Helper.formatDate(this.model.getValue(row), this.model.getFormat() || '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}');
        return '';
    }
}
