class TableFormFieldController extends FieldController {
    getValueForView(row) {
        // console.log('TableFormFieldController.getValueForView');
        return this.valueToString(this.model.getValue(row));
    }
    renderViewStyle(row) {
        return null;
    }
}
