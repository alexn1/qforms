import { TableFormFieldController } from '../TableFormFieldController';
import { TableFormCheckBoxFieldView } from './TableFormCheckBoxFieldView';
import { CheckBoxField } from '../../../../../Model/Field/CheckBoxField/CheckBoxField';
import { Align } from '../../../../../../../types';

export class TableFormCheckBoxFieldController extends TableFormFieldController<CheckBoxField> {
    getViewClass() {
        return super.getViewClass() || TableFormCheckBoxFieldView;
    }

    getValueForWidget(row) {
        return this.model.getValue(row);
    }

    getAlign(): Align | null {
        return 'center';
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.TableFormCheckBoxFieldController = TableFormCheckBoxFieldController;
}
