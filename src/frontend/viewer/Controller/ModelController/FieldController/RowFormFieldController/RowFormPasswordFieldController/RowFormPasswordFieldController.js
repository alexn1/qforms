class RowFormPasswordFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormPasswordFieldView;
    }
}
window.QForms.RowFormPasswordFieldController = RowFormPasswordFieldController;
