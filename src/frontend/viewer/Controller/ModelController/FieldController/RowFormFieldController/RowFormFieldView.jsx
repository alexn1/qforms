class RowFormFieldView extends FieldView {
    constructor(props) {
        super(props);
        this.widget = null;
    }
    getClassList() {
        const ctrl = this.props.ctrl;
        return [
            ...super.getClassList(),
            ...(ctrl.isChanged()                ? ['changed'] : []),
            ...(ctrl.getErrorMessage() !== null ? ['error']   : [])
        ];
    }
    getWidget() {
        return this.widget;
    }
    onWidgetCreate = widget => {
        this.widget = widget;
    }
}
window.QForms.RowFormFieldView = RowFormFieldView;
