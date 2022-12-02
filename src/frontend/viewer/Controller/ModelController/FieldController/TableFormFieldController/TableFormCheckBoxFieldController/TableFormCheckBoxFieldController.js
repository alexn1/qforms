export class TableFormCheckBoxFieldController extends TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormCheckBoxFieldView;
    }
    getValueForWidget(row) {
        return this.model.getValue(row);
    }
}
window.TableFormCheckBoxFieldController = TableFormCheckBoxFieldController;
