import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormCheckBoxFieldView } from './RowFormCheckBoxFieldView';
import { CheckBoxField } from '../../../../../Model/Field/CheckBoxField/CheckBoxField';

export class RowFormCheckBoxFieldController extends RowFormFieldController<CheckBoxField> {
    getViewClass() {
        return super.getViewClass() || RowFormCheckBoxFieldView;
    }

    getValueForWidget() {
        return this.getValue();
    }

    setValueFromWidget(widgetValue) {
        this.setValue(widgetValue);
    }
}

// @ts-ignore
window.RowFormCheckBoxFieldController = RowFormCheckBoxFieldController;
