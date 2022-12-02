import {TableFormFieldController} from '../TableFormFieldController';

export class TableFormPhoneFieldController extends TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormPhoneFieldView;
    }
}
