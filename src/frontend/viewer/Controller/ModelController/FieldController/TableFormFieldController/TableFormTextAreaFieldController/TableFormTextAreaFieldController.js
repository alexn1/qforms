class TableFormTextAreaFieldController extends TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormTextAreaFieldView;
    }
}
window.QForms.TableFormTextAreaFieldController = TableFormTextAreaFieldController;
