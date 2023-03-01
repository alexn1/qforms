import { FieldController } from '../FieldController';
import { Field } from '../../../../Model/Field/Field';
import { TableFormController } from '../../FormController/TableFormController/TableFormController';

export class TableFormFieldController<
    TField extends Field = Field,
> extends FieldController<TField> {
    getValueForWidget(row) {
        // console.log('TableFormFieldController.getValueForWidget');
        return this.valueToString(this.model.getValue(row));
    }

    getForm(): TableFormController {
        return this.parent;
    }
}

// @ts-ignore
window.TableFormFieldController = TableFormFieldController;
