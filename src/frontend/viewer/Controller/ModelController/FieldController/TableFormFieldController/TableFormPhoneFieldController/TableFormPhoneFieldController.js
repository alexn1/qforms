class TableFormPhoneFieldController extends TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormPhoneFieldView;
    }
}
