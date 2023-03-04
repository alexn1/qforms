import { FieldController } from '../FieldController';
import { Field } from '../../../../Model/Field/Field';
import { TableFormController } from '../../FormController/TableFormController/TableFormController';
import { Align } from '../../../../../../types';
import { FormController } from '../../FormController/FormController';

export class TableFormFieldController<
    TField extends Field = Field,
> extends FieldController<TField> {
    getValueForWidget(row) {
        // console.log('TableFormFieldController.getValueForWidget');
        return this.valueToString(this.model.getValue(row));
    }

    getForm<
        TTableFormController extends FormController = TableFormController,
    >(): TTableFormController {
        return this.parent as TTableFormController;
    }

    getAlign(): Align | null {
        return null;
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.TableFormFieldController = TableFormFieldController;
}
