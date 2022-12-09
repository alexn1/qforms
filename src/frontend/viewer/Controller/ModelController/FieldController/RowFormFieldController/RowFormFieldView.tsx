import { FieldView } from '../FieldView';

export class RowFormFieldView extends FieldView {
    widget: any;
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
            ...(ctrl.isEditable() ? ['editable'] : []),
            ...(ctrl.isChanged() ? ['changed'] : []),
            ...(ctrl.getErrorMessage() !== null ? ['error'] : []),
        ];
    }
    onWidgetCreate = widget => {
        this.widget = widget;
    };
}

// @ts-ignore
window.RowFormFieldView = RowFormFieldView;
