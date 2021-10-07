class RowFormFieldView extends View {
    getClassList() {
        const ctrl = this.props.ctrl;
        return [
            ...super.getClassList(),
            ...(ctrl.isChanged()        ? ['changed'] : []),
            ...(ctrl.getErrorMessage() !== null ? ['error']   : [])
        ];
    }
}
window.QForms.RowFormFieldView = RowFormFieldView;
