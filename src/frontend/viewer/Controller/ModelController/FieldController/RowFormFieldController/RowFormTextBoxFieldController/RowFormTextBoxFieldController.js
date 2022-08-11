class RowFormTextBoxFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormTextBoxFieldView;
    }
}
window.QForms.RowFormTextBoxFieldController = RowFormTextBoxFieldController;
