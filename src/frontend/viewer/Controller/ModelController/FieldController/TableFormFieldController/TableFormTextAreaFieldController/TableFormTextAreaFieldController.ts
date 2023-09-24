import { TableFormFieldController } from '../TableFormFieldController';
import { TableFormTextAreaFieldView } from './TableFormTextAreaFieldView';
import { TextAreaField } from '../../../../../Model/Field/TextAreaField/TextAreaField';
import { Helper } from '../../../../../../../common/Helper';

export class TableFormTextAreaFieldController extends TableFormFieldController<TextAreaField> {
    getViewClass() {
        return super.getViewClass() || TableFormTextAreaFieldView;
    }
}

Helper.registerGlobalClass(TableFormTextAreaFieldController);
