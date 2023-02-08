import { FieldView } from '../FieldView';
import { RowFormFieldController } from './RowFormFieldController';
import { Field } from '../../../../Model/Field/Field';
export declare class RowFormFieldView<T extends RowFormFieldController<Field>> extends FieldView<T> {
    widget: any;
    constructor(props: any);
    getWidget(): any;
    getClassList(): any[];
    onWidgetCreate: (widget: any) => void;
}
