import { ModelView } from '../ModelView';
import { FieldController } from './FieldController';
import { Field } from '../../../Model/Field/Field';
export declare class FieldView<T extends FieldController<Field>> extends ModelView<T> {
    getStyle(row: any): any;
}
