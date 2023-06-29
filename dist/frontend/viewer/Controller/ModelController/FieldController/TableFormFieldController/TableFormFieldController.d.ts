import { FieldController } from '../FieldController';
import { Field } from '../../../../Model/Field/Field';
import { TableFormController } from '../../FormController/TableFormController/TableFormController';
import { Align } from '../../../../../../types';
import { FormController } from '../../FormController/FormController';
export declare class TableFormFieldController<TField extends Field = Field> extends FieldController<TField> {
    getValueForWidget(row: any): string;
    getForm<TTableFormController extends FormController = TableFormController>(): TTableFormController;
    getAlign(): Align | null;
}
