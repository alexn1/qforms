export type Key = string;
export type Row = Object;
export type InsertResult = Key[];
export type DeleteResult = Key[];
export declare class InsertExResult {
    [key: Key]: Row;
}
export declare class UpdateResult {
    [oldKey: Key]: Key;
}
export declare class UpdateEx {
    [oldKey: Key]: Row;
}
export declare class TableResult {
    insert?: InsertResult;
    insertEx?: InsertExResult;
    update?: UpdateResult;
    updateEx?: UpdateEx;
    delete?: DeleteResult;
}
export declare class DatabaseResult {
    [name: string]: TableResult;
}
export declare class Result {
    [name: string]: DatabaseResult;
    static addInsertToResult(result: Result, dName: string, tName: string, key: Key): void;
    static addInsertExToResult(result: Result, dName: string, tName: string, key: Key, row: Row): void;
    static addUpdateToResult(result: Result, dName: string, tName: string, oldKey: Key, newKey: Key): void;
    static addUpdateExToResult(result: Result, dName: string, tName: string, oldKey: Key, row: Row): void;
    static addDeleteToResult(result: Result, dName: string, tName: string, key: Key): void;
    static addTableToResult(result: Result, dName: string, tName: string, tResult: TableResult): void;
}
