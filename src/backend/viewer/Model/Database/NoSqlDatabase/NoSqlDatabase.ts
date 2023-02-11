import { Database } from '../Database';
import { Context } from '../../../../Context';

export class NoSqlDatabase<TConnection = any> extends Database<TConnection> {
    /* async query(context: Context, query: string, params: any): Promise<any[]> {
        throw new Error(`${this.constructor.name}.query not implemented`);
    } */
}
