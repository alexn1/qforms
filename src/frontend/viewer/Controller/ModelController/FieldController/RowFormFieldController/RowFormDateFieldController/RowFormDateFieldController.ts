import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormDateFieldView } from './RowFormDateFieldView';
import { DateField } from '../../../../../Model/Field/DateField/DateField';
import { Helper } from '../../../../../../common/Helper';

export class RowFormDateFieldController extends RowFormFieldController<DateField> {
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

Helper.registerGlobalClass(RowFormDateFieldController);
