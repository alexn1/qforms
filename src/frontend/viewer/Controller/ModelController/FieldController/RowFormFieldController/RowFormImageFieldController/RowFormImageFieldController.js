import {RowFormFieldController} from '../RowFormFieldController';

export class RowFormImageFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormImageFieldView;
    }
}
window.RowFormImageFieldController = RowFormImageFieldController;
