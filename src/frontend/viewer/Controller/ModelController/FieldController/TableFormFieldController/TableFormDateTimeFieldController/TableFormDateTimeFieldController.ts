import { TableFormFieldController } from '../TableFormFieldController';
import { TableFormDateTimeFieldView } from './TableFormDateTimeFieldView';
import { FormatHelper, Helper } from '../../../../../../common';
import { DateTimeField } from '../../../../../Model/Field/DateTimeField/DateTimeField';
import { RawRow } from '../../../../../../../types';

export class TableFormDateTimeFieldController extends TableFormFieldController<DateTimeField> {
    getViewClass() {
        return super.getViewClass() || TableFormDateTimeFieldView;
    }

    getValueForWidget(row: RawRow) {
        const value = this.getModel().getValue(row);
        if (value)
            return FormatHelper.formatDate(
                value,
                this.getFormat() || '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}',
            );
        return '';
    }
}

Helper.registerGlobalClass(TableFormDateTimeFieldController);
