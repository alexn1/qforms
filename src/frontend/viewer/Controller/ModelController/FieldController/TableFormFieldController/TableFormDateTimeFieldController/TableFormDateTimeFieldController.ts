import { TableFormFieldController } from '../TableFormFieldController';
import { TableFormDateTimeFieldView } from './TableFormDateTimeFieldView';
import { Helper } from '../../../../../../common';
import { DateTimeField } from '../../../../../Model/Field/DateTimeField/DateTimeField';

export class TableFormDateTimeFieldController extends TableFormFieldController<DateTimeField> {
    getViewClass() {
        return super.getViewClass() || TableFormDateTimeFieldView;
    }

    getValueForWidget(row) {
        const value = this.model.getValue(row);
        if (value)
            return Helper.formatDate(value, this.getFormat() || '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}');
        return '';
    }
}

Helper.registerGlobalClass(TableFormDateTimeFieldController);
