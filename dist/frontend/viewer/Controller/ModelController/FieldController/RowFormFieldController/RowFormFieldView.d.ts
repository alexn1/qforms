import { FieldView } from '../FieldView';
import { RowFormFieldController } from './RowFormFieldController';
export declare class RowFormFieldView<T extends RowFormFieldController = RowFormFieldController> extends FieldView<T> {
    widget: any;
    constructor(props: any);
    getWidget(): any;
    getClassList(): string[];
    onWidgetCreate: (widget: any) => void;
}
