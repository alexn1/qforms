import {RowFormFieldController} from '../RowFormFieldController';

export class RowFormTextAreaFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormTextAreaFieldView;
    }
}
window.RowFormTextAreaFieldController = RowFormTextAreaFieldController;
