import { MongoClient, ClientSession } from 'mongodb';
import { NoSqlDatabase } from '../NoSqlDatabase';
import { Context } from '../../../../../Context';
interface IMongoDbDatabaseConnection {
    client: MongoClient;
    session: ClientSession;
}
export declare class MongoDbDatabase extends NoSqlDatabase<IMongoDbDatabaseConnection> {
    connect(context: Context): Promise<void>;
    getUrl(): string;
    release(context: Context): Promise<void>;
    updateOne(context: Context, colName: string, filter: any, update: any): Promise<any>;
    private getDbLink;
    queryResult(context: Context, query: string, params?: any): Promise<any>;
    queryRows(context: Context, query: string, params?: any): Promise<any[]>;
    queryScalar(context: Context, query: string, params?: any): Promise<any>;
    getDefaultPort(): number;
    begin(context: Context): Promise<void>;
    commit(context: Context): Promise<void>;
    rollback(context: Context, err: any): Promise<void>;
    deinit(): Promise<void>;
}
export {};
