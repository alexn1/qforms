class TableFormCheckBoxFieldController extends TableFormFieldController {
    getViewClass() {
        return TableFormCheckBoxFieldView;
    }
    getValueForView(row) {
        return this.model.getValue(row);
    }
}
window.QForms.TableFormCheckBoxFieldController = TableFormCheckBoxFieldController;
