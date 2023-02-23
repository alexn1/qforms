import { Key, RawRow } from './types';
export type InsertResult = Key[];
export type DeleteResult = Key[];
export declare class InsertExResult {
    [key: Key]: RawRow;
}
export declare class UpdateResult {
    [oldKey: Key]: Key;
}
export declare class UpdateEx {
    [oldKey: Key]: RawRow;
}
export declare class TableResult {
    insert?: InsertResult;
    insertEx?: InsertExResult;
    update?: UpdateResult;
    updateEx?: UpdateEx;
    delete?: DeleteResult;
    refresh?: boolean;
}
export declare class DatabaseResult {
    [table: string]: TableResult;
}
export declare class Result {
    [database: string]: DatabaseResult;
    static addInsertToResult(result: Result, dName: string, tName: string, key: Key): void;
    static addInsertExToResult(result: Result, dName: string, tName: string, key: Key, row: RawRow): void;
    static addUpdateToResult(result: Result, dName: string, tName: string, oldKey: Key, newKey: Key): void;
    static addUpdateExToResult(result: Result, dName: string, tName: string, oldKey: Key, row: RawRow): void;
    static addDeleteToResult(result: Result, dName: string, tName: string, key: Key): void;
    static addTableToResult(result: Result, dName: string, tName: string, tResult: TableResult): void;
}
