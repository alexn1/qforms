import { FieldController } from '../FieldController';
import { Field } from '../../../../Model/Field/Field';
export declare class TableFormFieldController<TField extends Field> extends FieldController<TField> {
    getValueForWidget(row: any): string;
}
