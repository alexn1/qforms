import { TableFormFieldController } from '../TableFormFieldController';
import { TableFormPhoneFieldView } from './TableFormPhoneFieldView';

export class TableFormPhoneFieldController extends TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormPhoneFieldView;
    }
}

// @ts-ignore
window.TableFormPhoneFieldController = TableFormPhoneFieldController;
