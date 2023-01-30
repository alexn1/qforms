import { Database } from '../Database';
import { Context } from '../../../../Context';
export declare class MongoDbDatabase extends Database {
    connect(context: Context): Promise<void>;
    release(context: Context): Promise<void>;
    query(context: Context, query: string): Promise<any[]>;
}
