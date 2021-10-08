class TableFormCheckBoxFieldController extends TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormCheckBoxFieldView;
    }
    getValueForWidget(row) {
        return this.model.getValue(row);
    }
}
window.QForms.TableFormCheckBoxFieldController = TableFormCheckBoxFieldController;
