class RowFormTextAreaFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormTextAreaFieldView;
    }
}
window.QForms.RowFormTextAreaFieldController = RowFormTextAreaFieldController;
