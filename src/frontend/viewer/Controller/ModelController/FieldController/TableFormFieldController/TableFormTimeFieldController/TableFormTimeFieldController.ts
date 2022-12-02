import {TableFormFieldController} from '../TableFormFieldController';
import {TableFormTimeFieldView} from './TableFormTimeFieldView';
import {TimeBox} from '../../../../../../common';

export class TableFormTimeFieldController extends TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormTimeFieldView;
    }
    getValueForWidget(row) {
        const value = this.model.getValue(row);
        return TimeBox.getStringValue(value);
    }
}

// @ts-ignore
window.TableFormTimeFieldController = TableFormTimeFieldController;
