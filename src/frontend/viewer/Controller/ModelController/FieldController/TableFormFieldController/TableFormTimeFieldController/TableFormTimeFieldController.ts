import { TableFormFieldController } from '../TableFormFieldController';
import { TableFormTimeFieldView } from './TableFormTimeFieldView';
import { TimeBox } from '../../../../../../common';
import { TimeField } from '../../../../../Model/Field/TimeField/TimeField';

export class TableFormTimeFieldController extends TableFormFieldController<TimeField> {
    getViewClass() {
        return super.getViewClass() || TableFormTimeFieldView;
    }

    getValueForWidget(row) {
        const value = this.model.getValue(row);
        return TimeBox.getStringValue(value);
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.TableFormTimeFieldController = TableFormTimeFieldController;
}
