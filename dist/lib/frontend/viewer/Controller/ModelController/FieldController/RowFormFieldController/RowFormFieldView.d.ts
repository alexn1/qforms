import { FieldView } from '../FieldView';
export declare class RowFormFieldView extends FieldView {
    widget: any;
    constructor(props: any);
    getWidget(): any;
    getClassList(): any[];
    onWidgetCreate: (widget: any) => void;
}
