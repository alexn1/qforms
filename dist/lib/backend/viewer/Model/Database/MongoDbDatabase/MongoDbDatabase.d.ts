import { Database } from '../Database';
import { Context } from '../../../../Context';
export declare class MongoDbDatabase extends Database {
    connect(context: Context): Promise<void>;
    release(context: Context): Promise<void>;
    collectionFind(context: Context, collectionName: string): Promise<any>;
}
