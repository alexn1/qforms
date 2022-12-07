import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormPasswordFieldView } from './RowFormPasswordFieldView';

export class RowFormPasswordFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormPasswordFieldView;
    }
}

// @ts-ignore
window.RowFormPasswordFieldController = RowFormPasswordFieldController;
