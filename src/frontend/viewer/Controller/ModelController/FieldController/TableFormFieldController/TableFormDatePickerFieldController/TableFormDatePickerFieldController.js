class TableFormDateFieldController extends TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormDatePickerFieldView;
    }
    getValueForWidget(row) {
        const value = this.model.getValue(row);
        if (value) return Helper.formatDate(value, this.model.getFormat() || '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}');
        return '';
    }
}
window.QForms.TableFormDateFieldController = TableFormDateFieldController;
