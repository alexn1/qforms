import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormFileFieldView } from './RowFormFileFieldView';
import { FileField } from '../../../../../Model/Field/FileField/FileField';
import { Helper } from '../../../../../../common/Helper';

export class RowFormFileFieldController extends RowFormFieldController<FileField> {
    getViewClass() {
        return super.getViewClass() || RowFormFileFieldView;
    }
}

Helper.registerGlobalClass(RowFormFileFieldController);
