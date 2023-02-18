import { RawRow } from '../../../../../types';
import { Form } from '../Form';
export declare class RowForm extends Form {
    fields: any;
    init(): void;
    isNewMode(): any;
    fillParams(row: any): void;
    onDataSourceUpdate(e: any): void;
    onDataSourceInsert(e: any): void;
    getRow(withChanges?: any): RawRow;
    getKey(): import("../../../../../types").Key;
    createRow(): {};
    discard(fields: any): void;
}
