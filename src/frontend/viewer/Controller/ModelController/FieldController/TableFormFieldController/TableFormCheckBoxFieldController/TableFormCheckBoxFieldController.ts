import {TableFormFieldController} from '../TableFormFieldController';
import {TableFormCheckBoxFieldView} from './TableFormCheckBoxFieldView';

export class TableFormCheckBoxFieldController extends TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormCheckBoxFieldView;
    }
    getValueForWidget(row) {
        return this.model.getValue(row);
    }
}

// @ts-ignore
window.TableFormCheckBoxFieldController = TableFormCheckBoxFieldController;
