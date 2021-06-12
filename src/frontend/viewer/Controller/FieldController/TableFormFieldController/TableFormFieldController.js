class TableFormFieldController extends FieldController {
    getViewClass() {
        return TableFormTextBoxFieldView;
    }
    getValueForView(row) {
        // console.log('TableFormFieldController.getValueForView');
        return this.valueToString(this.model.getValue(row));
    }
    renderViewStyle(row) {
        return null;
    }
}
window.QForms.TableFormFieldController = TableFormFieldController;
