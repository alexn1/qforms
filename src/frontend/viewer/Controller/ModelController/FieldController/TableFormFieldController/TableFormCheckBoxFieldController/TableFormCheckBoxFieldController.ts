import { TableFormFieldController } from '../TableFormFieldController';
import { TableFormCheckBoxFieldView } from './TableFormCheckBoxFieldView';
import { CheckBoxField } from '../../../../../Model/Field/CheckBoxField/CheckBoxField';
import { Align, RawRow } from '../../../../../../../types';
import { Helper } from '../../../../../../../common/Helper';

export class TableFormCheckBoxFieldController extends TableFormFieldController<CheckBoxField> {
    getViewClass() {
        return super.getViewClass() || TableFormCheckBoxFieldView;
    }

    getValueForWidget(row: RawRow) {
        return this.getModel().getValue(row);
    }

    getAlign(): Align {
        return 'center';
    }
}

Helper.registerGlobalClass(TableFormCheckBoxFieldController);
