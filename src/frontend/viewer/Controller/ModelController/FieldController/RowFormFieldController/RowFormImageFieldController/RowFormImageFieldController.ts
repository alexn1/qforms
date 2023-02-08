import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormImageFieldView } from './RowFormImageFieldView';
import { ImageField } from '../../../../../Model/Field/ImageField/ImageField';

export class RowFormImageFieldController extends RowFormFieldController<ImageField> {
    getViewClass() {
        return super.getViewClass() || RowFormImageFieldView;
    }
}

// @ts-ignore
window.RowFormImageFieldController = RowFormImageFieldController;
