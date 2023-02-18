import { Form } from '../Form';
export declare class RowForm extends Form {
    fields: any;
    init(): void;
    isNewMode(): any;
    fillParams(row: any): void;
    onDataSourceUpdate(e: any): void;
    onDataSourceInsert(e: any): void;
    getRow(withChanges?: any): any;
    getKey(): import("../../../../../types").Key;
    createRow(): {};
    discard(fields: any): void;
}
