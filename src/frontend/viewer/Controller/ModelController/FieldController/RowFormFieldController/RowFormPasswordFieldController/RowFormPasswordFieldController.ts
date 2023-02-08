import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormPasswordFieldView } from './RowFormPasswordFieldView';
import { PasswordField } from '../../../../../Model/Field/PasswordField/PasswordField';

export class RowFormPasswordFieldController extends RowFormFieldController<PasswordField> {
    getViewClass() {
        return super.getViewClass() || RowFormPasswordFieldView;
    }
}

// @ts-ignore
window.RowFormPasswordFieldController = RowFormPasswordFieldController;
