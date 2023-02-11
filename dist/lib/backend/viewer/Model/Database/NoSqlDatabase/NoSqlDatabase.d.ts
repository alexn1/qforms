import { Database } from '../Database';
import { Context } from '../../../../Context';
export declare class NoSqlDatabase<TConnection = any> extends Database<TConnection> {
    updateOne(context: Context, colName: string, filter: any, update: any): Promise<any>;
}
