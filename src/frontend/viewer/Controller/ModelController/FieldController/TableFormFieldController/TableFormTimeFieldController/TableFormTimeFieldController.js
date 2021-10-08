class TableFormTimeFieldController extends TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormTimeFieldView;
    }
    getValueForWidget(row) {
        const value = this.model.getValue(row);
        return TimeBox.getStringValue(value);
    }
}
window.QForms.TableFormTimeFieldController = TableFormTimeFieldController;
