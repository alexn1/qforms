import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormTextAreaFieldView } from './RowFormTextAreaFieldView';
import { TextAreaField } from '../../../../../Model/Field/TextAreaField/TextAreaField';
import { Helper } from '../../../../../../../common/Helper';

export class RowFormTextAreaFieldController extends RowFormFieldController<TextAreaField> {
    getViewClass() {
        return super.getViewClass() || RowFormTextAreaFieldView;
    }
}

Helper.registerGlobalClass(RowFormTextAreaFieldController);
