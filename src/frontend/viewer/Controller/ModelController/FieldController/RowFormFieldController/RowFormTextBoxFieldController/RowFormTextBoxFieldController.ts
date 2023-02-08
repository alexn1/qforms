import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormTextBoxFieldView } from './RowFormTextBoxFieldView';
import {TextBoxField} from '../../../../../Model/Field/TextBoxField/TextBoxField';

export class RowFormTextBoxFieldController extends RowFormFieldController<TextBoxField> {
    getViewClass() {
        return super.getViewClass() || RowFormTextBoxFieldView;
    }
}

// @ts-ignore
window.RowFormTextBoxFieldController = RowFormTextBoxFieldController;
