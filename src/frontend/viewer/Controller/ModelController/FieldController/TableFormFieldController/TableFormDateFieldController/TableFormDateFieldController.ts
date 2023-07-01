import { TableFormFieldController } from '../TableFormFieldController';
import { TableFormDateFieldView } from './TableFormDateFieldView';
import { Helper } from '../../../../../../common';
import { DateField } from '../../../../../Model/Field/DateField/DateField';

export class TableFormDateFieldController extends TableFormFieldController<DateField> {
    getViewClass() {
        return super.getViewClass() || TableFormDateFieldView;
    }

    getValueForWidget(row) {
        const value = this.getModel().getValue(row);
        if (value)
            return Helper.formatDate(value, this.getFormat() || '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}');
        return '';
    }
}

Helper.registerGlobalClass(TableFormDateFieldController);
