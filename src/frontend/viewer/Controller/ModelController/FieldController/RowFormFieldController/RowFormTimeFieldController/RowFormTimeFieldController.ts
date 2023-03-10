import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormTimeFieldView } from './RowFormTimeFieldView';
import { TimeBox } from '../../../../../../common';
import { TimeField } from '../../../../../Model/Field/TimeField/TimeField';
import { Helper } from '../../../../../../common/Helper';

export class RowFormTimeFieldController extends RowFormFieldController<TimeField> {
    defaultValue: any = null;

    /* constructor(...args) {
        super(...args);
        this.defaultValue = null;
    } */

    getViewClass() {
        return super.getViewClass() || RowFormTimeFieldView;
    }

    getValueForWidget() {
        return this.getValue();
    }

    setValueFromWidget(widgetValue) {
        if (isNaN(widgetValue)) throw new Error('wrong time');
        this.setValue(widgetValue);
    }

    getDefaultValue() {
        return this.defaultValue;
    }

    setDefaultValue2(defaultValue) {
        if (typeof defaultValue === 'string') {
            this.defaultValue = TimeBox.getIntegerValue(defaultValue);
        } else {
            if (defaultValue >= 24 * 60) throw new Error(`wrong default value: ${defaultValue}`);
            this.defaultValue = defaultValue;
        }
    }

    getPlaceholder() {
        // console.log('CarReservefromTimeController.getPlaceholder', this.defaultValue);
        if (this.defaultValue !== null) return TimeBox.getStringValue(this.defaultValue);
        return super.getPlaceholder();
    }
}

Helper.registerGlobalClass(RowFormTimeFieldController);
