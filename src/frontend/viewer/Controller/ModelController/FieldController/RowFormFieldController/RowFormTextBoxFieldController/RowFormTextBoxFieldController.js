class RowFormTextBoxFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormTextBoxFieldView;
    }
    isEnabled() {
        return this.isEditable();
    }
}
window.QForms.RowFormTextBoxFieldController = RowFormTextBoxFieldController;
