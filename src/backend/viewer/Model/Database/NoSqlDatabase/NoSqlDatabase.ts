import { Database } from '../Database';
import { Context } from '../../../../Context';

export class NoSqlDatabase<TConnection = any> extends Database<TConnection> {
    async updateOne(context: Context, colName: string, filter, update): Promise<any> {
        throw new Error(`${this.constructor.name}.updateOne not implemented`);
    }
}
