import { BkDatabase } from '../BkDatabase';
export declare abstract class SqlDatabase<TConnection = any> extends BkDatabase<TConnection> {
    getUpdateQuery(tableName: any, values: any, where: any): string;
    getInsertQuery(tableName: any, values: any): string;
    getDeleteQuery(tableName: any, rowKeyValues: any): string;
    static getUsedParams(query: any): any;
    static checkParams(query: any, params: any): void;
}
