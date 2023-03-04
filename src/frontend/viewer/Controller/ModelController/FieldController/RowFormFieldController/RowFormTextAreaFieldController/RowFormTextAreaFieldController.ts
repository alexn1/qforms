import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormTextAreaFieldView } from './RowFormTextAreaFieldView';
import { TextAreaField } from '../../../../../Model/Field/TextAreaField/TextAreaField';

export class RowFormTextAreaFieldController extends RowFormFieldController<TextAreaField> {
    getViewClass() {
        return super.getViewClass() || RowFormTextAreaFieldView;
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.RowFormTextAreaFieldController = RowFormTextAreaFieldController;
}
