import {RowFormFieldController} from '../RowFormFieldController';

export class RowFormFileFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormFileFieldView;
    }
}
window.RowFormFileFieldController = RowFormFileFieldController;
