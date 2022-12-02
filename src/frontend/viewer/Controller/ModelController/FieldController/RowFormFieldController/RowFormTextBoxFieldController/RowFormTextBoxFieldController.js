import {RowFormFieldController} from '../RowFormFieldController';

export class RowFormTextBoxFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormTextBoxFieldView;
    }
}
window.RowFormTextBoxFieldController = RowFormTextBoxFieldController;
