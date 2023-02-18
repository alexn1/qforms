import { MongoClient, ClientSession } from 'mongodb';
import { BkNoSqlDatabase } from '../BkNoSqlDatabase';
import { Context } from '../../../../../Context';
import { Row } from '../../../../../../types';
export declare class BkMongoDbDatabase extends BkNoSqlDatabase<{
    client: MongoClient;
    session: ClientSession;
}> {
    connect(context: Context): Promise<void>;
    getUrl(): string;
    release(context: Context): Promise<void>;
    updateOne(context: Context, colName: string, filter: any, update: any): Promise<any>;
    insertOne(context: Context, colName: string, document: any): Promise<any>;
    deleteOne(context: Context, colName: string, filter: any): Promise<any>;
    static makeObjectIds(filter: any, names?: string[]): any;
    private getDbLink;
    queryResult(context: Context, query: string, params?: any): Promise<any>;
    queryRows(context: Context, query: string, params?: any): Promise<Row[]>;
    queryScalar(context: Context, query: string, params?: any): Promise<any>;
    getDefaultPort(): number;
    begin(context: Context): Promise<void>;
    commit(context: Context): Promise<void>;
    rollback(context: Context, err: any): Promise<void>;
    deinit(): Promise<void>;
}
