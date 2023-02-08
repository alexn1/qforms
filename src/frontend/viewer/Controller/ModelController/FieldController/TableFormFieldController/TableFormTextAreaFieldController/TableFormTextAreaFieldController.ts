import { TableFormFieldController } from '../TableFormFieldController';
import { TableFormTextAreaFieldView } from './TableFormTextAreaFieldView';
import { TextAreaField } from '../../../../../Model/Field/TextAreaField/TextAreaField';

export class TableFormTextAreaFieldController extends TableFormFieldController<TextAreaField> {
    getViewClass() {
        return super.getViewClass() || TableFormTextAreaFieldView;
    }
}

// @ts-ignore
window.TableFormTextAreaFieldController = TableFormTextAreaFieldController;
