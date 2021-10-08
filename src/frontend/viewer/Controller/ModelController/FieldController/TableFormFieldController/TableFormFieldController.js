class TableFormFieldController extends FieldController {
    getViewClass() {
        return super.getViewClass() || TableFormTextBoxFieldView;
    }
    getValueForWidget(row) {
        // console.log('TableFormFieldController.getValueForWidget');
        return this.valueToString(this.model.getValue(row));
    }
    renderViewStyle(row) {
        return null;
    }
}
window.QForms.TableFormFieldController = TableFormFieldController;
