import { Form } from '../Form';
export declare class RowForm extends Form {
    fields: any;
    init(): void;
    isNewMode(): any;
    fillParams(row: any): void;
    onDataSourceUpdate(e: any): void;
    onDataSourceInsert(e: any): void;
    getRow(withChanges?: any): any;
    getKey(): any;
    createRow(): {};
    discard(fields: any): void;
}
