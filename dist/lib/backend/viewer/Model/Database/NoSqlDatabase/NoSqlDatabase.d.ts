import { BkDatabase } from '../Database';
import { Context } from '../../../../Context';
export declare class BkNoSqlDatabase<TConnection = any> extends BkDatabase<TConnection> {
    updateOne(context: Context, colName: string, filter: any, update: any): Promise<any>;
}
