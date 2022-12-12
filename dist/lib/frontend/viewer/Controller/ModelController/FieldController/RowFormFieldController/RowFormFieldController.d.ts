import { FieldController } from '../FieldController';
export declare class RowFormFieldController extends FieldController {
    isEditable(): boolean;
    getValue(): any;
    onChange: (widgetValue: any, fireEvent?: boolean) => Promise<void>;
    refill(): void;
}
