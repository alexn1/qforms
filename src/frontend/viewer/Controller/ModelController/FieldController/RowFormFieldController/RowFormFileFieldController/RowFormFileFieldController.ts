import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormFileFieldView } from './RowFormFileFieldView';
import { FileField } from '../../../../../Model/Field/FileField/FileField';

export class RowFormFileFieldController extends RowFormFieldController<FileField> {
    getViewClass() {
        return super.getViewClass() || RowFormFileFieldView;
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.RowFormFileFieldController = RowFormFileFieldController;
}
