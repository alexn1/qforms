import { RawRow } from '../../../../../types';
import { Form } from '../Form';
export declare class RowForm extends Form {
    init(): void;
    isNewMode(): any;
    fillParams(row: RawRow): void;
    onDataSourceUpdate(e: any): void;
    onDataSourceInsert(e: any): void;
    getRow(withChanges?: boolean): RawRow;
    getKey(): import("../../../../../types").Key;
    createRow(): RawRow;
    discard(fields: string[]): void;
}
