export class TableFormTextAreaFieldController extends TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormTextAreaFieldView;
    }
}
window.TableFormTextAreaFieldController = TableFormTextAreaFieldController;
