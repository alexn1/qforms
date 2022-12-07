import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormCheckBoxFieldView } from './RowFormCheckBoxFieldView';

export class RowFormCheckBoxFieldController extends RowFormFieldController {
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
