class TableFormTimeFieldController extends TableFormFieldController {
    /*getViewClass() {
        return TableFormTextBoxFieldView;
    }*/
    getValueForWidget(row) {
        const value = this.model.getValue(row);
        return TimeBox.getStringValue(value);
    }
}
window.QForms.TableFormTimeFieldController = TableFormTimeFieldController;
