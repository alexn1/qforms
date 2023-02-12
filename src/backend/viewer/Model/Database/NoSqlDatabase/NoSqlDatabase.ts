import { BkDatabase } from '../Database';
import { Context } from '../../../../Context';

export class BkNoSqlDatabase<TConnection = any> extends BkDatabase<TConnection> {
    async updateOne(context: Context, colName: string, filter, update): Promise<any> {
        throw new Error(`${this.constructor.name}.updateOne not implemented`);
    }
}
