declare class Result {
    static addInsertToResult(result: Result, database: string, table: string, key: any): void;
    static addInsertExToResult(result: Result, database: string, table: string, key: any, row: any): void;
    static addUpdateToResult(result: Result, database: string, table: string, oldKey: any, newKey: any): void;
    static addUpdateExToResult(result: Result, database: string, table: string, oldKey: any, row: any): void;
    static addDeleteToResult(result: Result, database: string, table: string, key: any): void;
}
export = Result;
