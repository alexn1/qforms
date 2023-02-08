import { TableFormFieldController } from '../TableFormFieldController';
import { TableFormTextBoxFieldView } from './TableFormTextBoxFieldView';
import { TextBoxField } from '../../../../../Model/Field/TextBoxField/TextBoxField';

export class TableFormTextBoxFieldController extends TableFormFieldController<TextBoxField> {
    getViewClass() {
        return super.getViewClass() || TableFormTextBoxFieldView;
    }
    /*beginEdit(view) {
        view.firstElementChild.style.MozUserSelect = 'text';
        view.firstElementChild.contentEditable = true;
        const range = document.createRange();
        range.selectNodeContents(view.firstElementChild);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        view.firstElementChild.focus();
        return true;
    }*/

    /*endEdit(view) {
        view.firstElementChild.style.MozUserSelect = 'none';
        view.firstElementChild.contentEditable = false;
    }*/
}

// @ts-ignore
window.TableFormTextBoxFieldController = TableFormTextBoxFieldController;
