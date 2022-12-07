import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormDateFieldView } from './RowFormDateFieldView';

export class RowFormDateFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormDateFieldView;
    }
    getValueForWidget() {
        return this.getValue();
    }
    setValueFromWidget(widgetValue) {
        this.setValue(widgetValue);
    }
}

// @ts-ignore
window.RowFormDateFieldController = RowFormDateFieldController;
