import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormPasswordFieldView } from './RowFormPasswordFieldView';
import { PasswordField } from '../../../../../Model/Field/PasswordField/PasswordField';
import { Helper } from '../../../../../../../common/Helper';

export class RowFormPasswordFieldController extends RowFormFieldController<PasswordField> {
    getViewClass() {
        return super.getViewClass() || RowFormPasswordFieldView;
    }
}

Helper.registerGlobalClass(RowFormPasswordFieldController);
