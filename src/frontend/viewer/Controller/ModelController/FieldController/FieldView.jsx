class FieldView extends ModelView {
    getStyle(row) {
        return this.getCtrl().getViewStyle(row);
    }
}
