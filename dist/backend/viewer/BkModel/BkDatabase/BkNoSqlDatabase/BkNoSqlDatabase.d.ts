import { BkDatabase } from '../BkDatabase';
import { Context } from '../../../../Context';
export declare abstract class BkNoSqlDatabase<TConnection = any> extends BkDatabase<TConnection> {
    updateOne(context: Context, colName: string, filter: any, update: any): Promise<any>;
    insertOne(context: Context, colName: string, document: any): Promise<any>;
    deleteOne(context: Context, colName: string, filter: any): Promise<any>;
}
