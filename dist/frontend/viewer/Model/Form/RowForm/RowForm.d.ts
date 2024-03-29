import { Key, RawRow } from '../../../../../types';
import { Form } from '../Form';
export declare class RowForm extends Form {
    init(): void;
    isNewMode(): boolean;
    fillParams(row: RawRow): void;
    onDataSourceUpdate(e: any): void;
    onDataSourceInsert(e: any): void;
    getRow(withChanges?: boolean): RawRow;
    getKey(): Key | null;
    createRow(): RawRow;
    discard(fields?: string[]): void;
}
