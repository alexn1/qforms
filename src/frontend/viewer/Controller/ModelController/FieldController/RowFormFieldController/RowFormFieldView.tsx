import {FieldView} from '../FieldView';
export class RowFormFieldView extends FieldView {
    constructor(props) {
        super(props);
        this.widget = null;
    }
    getWidget() {
        return this.widget;
    }
    getClassList() {
        const ctrl = this.getCtrl();
        return [
            ...super.getClassList(),
            ...(ctrl.isEditable()                ? ['editable'] : []),
            ...(ctrl.isChanged()                ? ['changed'] : []),
            ...(ctrl.getErrorMessage() !== null ? ['error']   : []),
        ];
    }
    onWidgetCreate = widget => {
        this.widget = widget;
    }
}
window.RowFormFieldView = RowFormFieldView;
