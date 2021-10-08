class RowFormFileFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormFileFieldView;
    }
}
window.QForms.RowFormFileFieldController = RowFormFileFieldController;
