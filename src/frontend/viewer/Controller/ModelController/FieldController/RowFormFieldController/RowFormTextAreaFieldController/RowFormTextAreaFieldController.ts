import {RowFormFieldController} from '../RowFormFieldController';
import {RowFormTextAreaFieldView} from './RowFormTextAreaFieldView';

export class RowFormTextAreaFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormTextAreaFieldView;
    }
}

// @ts-ignore
window.RowFormTextAreaFieldController = RowFormTextAreaFieldController;
