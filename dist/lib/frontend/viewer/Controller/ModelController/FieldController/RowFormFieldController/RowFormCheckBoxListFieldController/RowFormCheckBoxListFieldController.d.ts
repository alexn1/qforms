import { RowFormFieldController } from '../RowFormFieldController';
export declare class RowFormCheckBoxListFieldController extends RowFormFieldController {
    init(): void;
    deinit(): void;
    getViewClass(): any;
    getRows(): any;
    onListInsert: (e: any) => Promise<void>;
    onListUpdate: (e: any) => Promise<void>;
    onListDelete: (e: any) => Promise<void>;
    getValueForWidget(): any;
    setValueFromWidget(widgetValue: any): void;
    getItemFromRow(row: any): {
        value: string;
        title: any;
    };
}
