class RowFormPhoneFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormPhoneFieldView;
    }
}
window.QForms.RowFormPhoneFieldController = RowFormPhoneFieldController;
