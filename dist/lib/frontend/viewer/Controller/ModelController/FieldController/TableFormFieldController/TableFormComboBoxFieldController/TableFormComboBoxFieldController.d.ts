import { TableFormFieldController } from '../TableFormFieldController';
export declare class TableFormComboBoxFieldController extends TableFormFieldController {
    init(): void;
    deinit(): void;
    getViewClass(): any;
    getValueForWidget(row: any): string;
    onListUpdate: (e: any) => Promise<void>;
}
