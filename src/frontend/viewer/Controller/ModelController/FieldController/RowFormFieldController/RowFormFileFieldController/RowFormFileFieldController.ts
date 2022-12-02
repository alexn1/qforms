import {RowFormFieldController} from '../RowFormFieldController';
import {RowFormFileFieldView} from './RowFormFileFieldView';

export class RowFormFileFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormFileFieldView;
    }
}

// @ts-ignore
window.RowFormFileFieldController = RowFormFileFieldController;
