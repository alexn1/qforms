import { FieldView } from '../FieldView';
import { RowFormFieldController } from './RowFormFieldController';
import { Field } from '../../../../Model/Field/Field';

export class RowFormFieldView<
    T extends RowFormFieldController = RowFormFieldController,
> extends FieldView<T> {
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

    onWidgetCreate = (widget) => {
        this.widget = widget;
    };
}

if (typeof window === 'object') {
    // @ts-ignore
    window.RowFormFieldView = RowFormFieldView;
}
