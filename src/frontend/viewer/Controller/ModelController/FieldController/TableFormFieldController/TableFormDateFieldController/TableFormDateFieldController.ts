import { TableFormFieldController } from '../TableFormFieldController';
import { TableFormDateFieldView } from './TableFormDateFieldView';
import { Helper } from '../../../../../../common';

export class TableFormDateFieldController extends TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormDateFieldView;
    }
    getValueForWidget(row) {
        const value = this.model.getValue(row);
        if (value)
            return Helper.formatDate(value, this.getFormat() || '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}');
        return '';
    }
}

// @ts-ignore
window.TableFormDateFieldController = TableFormDateFieldController;
