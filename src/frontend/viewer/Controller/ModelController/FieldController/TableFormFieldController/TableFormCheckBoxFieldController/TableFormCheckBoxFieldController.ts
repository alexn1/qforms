import { TableFormFieldController } from '../TableFormFieldController';
import { TableFormCheckBoxFieldView } from './TableFormCheckBoxFieldView';
import { CheckBoxField } from '../../../../../Model/Field/CheckBoxField/CheckBoxField';

export class TableFormCheckBoxFieldController extends TableFormFieldController<CheckBoxField> {
    getViewClass() {
        return super.getViewClass() || TableFormCheckBoxFieldView;
    }
    getValueForWidget(row) {
        return this.model.getValue(row);
    }
}

// @ts-ignore
window.TableFormCheckBoxFieldController = TableFormCheckBoxFieldController;
