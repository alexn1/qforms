class TableFormTimeFieldController extends TableFormFieldController {
    /*getViewClass() {
        return TableFormTextBoxFieldView;
    }*/
    getValueForView(row) {
        const value = this.model.getValue(row);
        return TimeBox.getStringValue(value);
    }
}
