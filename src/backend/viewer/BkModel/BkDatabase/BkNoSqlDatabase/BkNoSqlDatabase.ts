import { BkDatabase } from '../BkDatabase';
import { Context } from '../../../../Context';

export abstract class BkNoSqlDatabase<TConnection = any> extends BkDatabase<TConnection> {
    async updateOne(context: Context, colName: string, filter, update): Promise<any> {
        throw new Error(`${this.constructor.name}.updateOne not implemented`);
    }

    async insertOne(context: Context, colName: string, document: any): Promise<any> {
        throw new Error(`${this.constructor.name}.insertOne not implemented`);
    }

    async deleteOne(context: Context, colName: string, filter): Promise<any> {
        throw new Error(`${this.constructor.name}.deleteOne not implemented`);
    }
}
