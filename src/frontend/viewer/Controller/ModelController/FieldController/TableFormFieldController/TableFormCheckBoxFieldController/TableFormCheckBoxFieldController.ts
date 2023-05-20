import { TableFormFieldController } from '../TableFormFieldController';
import { TableFormCheckBoxFieldView } from './TableFormCheckBoxFieldView';
import { CheckBoxField } from '../../../../../Model/Field/CheckBoxField/CheckBoxField';
import { Align } from '../../../../../../../types';
import { Helper } from '../../../../../../common/Helper';

export class TableFormCheckBoxFieldController extends TableFormFieldController<CheckBoxField> {
    getViewClass() {
        return super.getViewClass() || TableFormCheckBoxFieldView;
    }

    getValueForWidget(row) {
        return this.model.getValue(row);
    }

    getAlign(): Align {
        return 'center';
    }
}

Helper.registerGlobalClass(TableFormCheckBoxFieldController);
