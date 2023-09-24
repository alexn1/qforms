import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormTextBoxFieldView } from './RowFormTextBoxFieldView';
import { TextBoxField } from '../../../../../Model/Field/TextBoxField/TextBoxField';
import { Helper } from '../../../../../../../common/Helper';

export class RowFormTextBoxFieldController extends RowFormFieldController<TextBoxField> {
    getViewClass() {
        return super.getViewClass() || RowFormTextBoxFieldView;
    }
}

Helper.registerGlobalClass(RowFormTextBoxFieldController);
