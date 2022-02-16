class RowFormRadioFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormRadioFieldView;
    }
}
