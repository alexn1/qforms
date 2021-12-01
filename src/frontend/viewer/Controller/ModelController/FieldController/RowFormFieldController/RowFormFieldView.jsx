class RowFormFieldView extends FieldView {
    getClassList() {
        const ctrl = this.props.ctrl;
        return [
            ...super.getClassList(),
            ...(ctrl.isChanged()                ? ['changed'] : []),
            ...(ctrl.getErrorMessage() !== null ? ['error']   : [])
        ];
    }
    getWidget() {
        return this.getCtrl().widget;
    }
}
window.QForms.RowFormFieldView = RowFormFieldView;
