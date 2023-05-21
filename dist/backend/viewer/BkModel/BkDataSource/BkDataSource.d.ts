import { Result } from '../../../../Result';
import { BkModel } from '../BkModel';
import { Context } from '../../../Context';
import { BkApplication } from '../BkApplication/BkApplication';
import { BkDatabase } from '../BkDatabase/BkDatabase';
import { BkForm } from '../BkForm/BkForm';
import { Key, KeyObject, Row, RawRow } from '../../../../types';
export type ReadResult = [RawRow[], number | null];
export declare class BkDataSource extends BkModel {
    keyColumns: string[];
    rows: Row[];
    getDirPath(): string;
    getJsonFilePath(): string;
    init(context: Context): Promise<void>;
    getKeyColumns(): string[];
    checkKeyColumns(row: Row): void;
    checkKeyFields(): void;
    checkRow(row: Row): void;
    checkRows(rows: Row[]): void;
    checkNotUsedColumns(row: Row): void;
    checkFields(row: Row): void;
    encodeRows2(rows: Row[]): RawRow[];
    encodeRow2(row: Row): RawRow;
    getApp(): BkApplication;
    getKeyValuesFromKey(key: Key): KeyObject;
    getKeyFromValues(values: any): Key;
    getFullName(): string;
    static keyToParams(key: Key, paramName?: string): KeyObject;
    calcNewKeyValues(originalKeyValues: KeyObject, values: any): KeyObject;
    calcNewKey(key: Key, values: any): Key;
    fillAttributes(response: any): void;
    fill(context: Context): Promise<{
        rows: RawRow[];
        count: number;
        limit?: number;
    }>;
    getRows(): Promise<Row[]>;
    isOnForm(): boolean;
    isDefaultOnForm(): boolean;
    isDefaultOnRowForm(): boolean;
    isDefaultOnTableForm(): boolean;
    read(context: Context): Promise<ReadResult>;
    create(context: Context, _values?: any): Promise<Result>;
    update(context: Context): Promise<Result>;
    delete(context: Context): Promise<Result>;
    getForm(): BkForm;
    getAccess(context: Context): {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
    };
    getDatabase(): BkDatabase;
    getLimit(): number;
}
