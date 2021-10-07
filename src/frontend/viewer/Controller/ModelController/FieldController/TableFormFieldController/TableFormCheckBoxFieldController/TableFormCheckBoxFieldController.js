class TableFormCheckBoxFieldController extends TableFormFieldController {
    getViewClass() {
        return TableFormCheckBoxFieldView;
    }
    getValueForWidget(row) {
        return this.model.getValue(row);
    }
}
window.QForms.TableFormCheckBoxFieldController = TableFormCheckBoxFieldController;
