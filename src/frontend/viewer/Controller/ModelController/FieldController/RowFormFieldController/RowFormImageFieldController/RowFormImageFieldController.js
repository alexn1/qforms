class RowFormImageFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormImageFieldView;
    }
}
window.QForms.RowFormImageFieldController = RowFormImageFieldController;
