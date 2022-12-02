import {RowFormFieldController} from '../RowFormFieldController';
import {RowFormTextBoxFieldView} from './RowFormTextBoxFieldView';

export class RowFormTextBoxFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormTextBoxFieldView;
    }
}

// @ts-ignore
window.RowFormTextBoxFieldController = RowFormTextBoxFieldController;
