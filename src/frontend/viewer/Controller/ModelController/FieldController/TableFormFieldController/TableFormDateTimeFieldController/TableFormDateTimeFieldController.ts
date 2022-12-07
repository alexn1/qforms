import { TableFormFieldController } from '../TableFormFieldController';
import { TableFormDateTimeFieldView } from './TableFormDateTimeFieldView';
import { Helper } from '../../../../../../common';

export class TableFormDateTimeFieldController extends TableFormFieldController {
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

// @ts-ignore
window.TableFormDateTimeFieldController = TableFormDateTimeFieldController;
