import {RowFormFieldController} from '../RowFormFieldController';
import {RowFormImageFieldView} from './RowFormImageFieldView';

export class RowFormImageFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormImageFieldView;
    }
}

// @ts-ignore
window.RowFormImageFieldController = RowFormImageFieldController;
