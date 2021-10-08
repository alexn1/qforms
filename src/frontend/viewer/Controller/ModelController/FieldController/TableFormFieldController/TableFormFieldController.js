class TableFormFieldController extends FieldController {
    getValueForWidget(row) {
        // console.log('TableFormFieldController.getValueForWidget');
        return this.valueToString(this.model.getValue(row));
    }
}
window.QForms.TableFormFieldController = TableFormFieldController;
