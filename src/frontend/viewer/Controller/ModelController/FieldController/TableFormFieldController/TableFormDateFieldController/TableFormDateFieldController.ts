import { TableFormFieldController } from '../TableFormFieldController';
import { TableFormDateFieldView } from './TableFormDateFieldView';
import { Helper } from '../../../../../../../common';
import { DateField } from '../../../../../Model/Field/DateField/DateField';
import { DateTimeHelper } from '../../../../../../../common';
import { RawRow } from '../../../../../../../types';

export class TableFormDateFieldController extends TableFormFieldController<DateField> {
    getViewClass() {
        return super.getViewClass() || TableFormDateFieldView;
    }

    getValueForWidget(row: RawRow) {
        const value = this.getModel().getValue(row);
        if (value)
            return DateTimeHelper.formatDate(
                value,
                this.getFormat() || '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}',
            );
        return '';
    }
}

Helper.registerGlobalClass(TableFormDateFieldController);
