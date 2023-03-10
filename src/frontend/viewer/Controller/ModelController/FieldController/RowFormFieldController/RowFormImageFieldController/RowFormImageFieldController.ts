import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormImageFieldView } from './RowFormImageFieldView';
import { ImageField } from '../../../../../Model/Field/ImageField/ImageField';
import { Helper } from '../../../../../../common/Helper';

export class RowFormImageFieldController extends RowFormFieldController<ImageField> {
    getViewClass() {
        return super.getViewClass() || RowFormImageFieldView;
    }
}

Helper.registerGlobalClass(RowFormImageFieldController);
