class TableFormFieldController extends FieldController {
    getValueForWidget(row) {
        // console.log('TableFormFieldController.getValueForWidget');
        return this.valueToString(this.model.getValue(row));
    }
    renderViewStyle(row) {
        return null;
    }
}
window.QForms.TableFormFieldController = TableFormFieldController;
