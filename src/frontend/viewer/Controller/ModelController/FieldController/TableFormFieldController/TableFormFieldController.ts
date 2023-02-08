import { FieldController } from '../FieldController';
import { Field } from '../../../../Model/Field/Field';

export class TableFormFieldController<TField extends Field> extends FieldController<TField> {
    getValueForWidget(row) {
        // console.log('TableFormFieldController.getValueForWidget');
        return this.valueToString(this.model.getValue(row));
    }
}

// @ts-ignore
window.TableFormFieldController = TableFormFieldController;
