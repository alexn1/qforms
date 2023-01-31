import { DataSource } from '../DataSource';
import { Context } from '../../../../Context';
import { MongoDbDatabase } from '../../Database/MongoDbDatabase/MongoDbDatabase';

export class NoSqlDataSource extends DataSource {
    async fill(context: Context): Promise<any> {
        const response = await super.fill(context);

        // if form data source named default then check mode
        if (this.isDefaultOnForm() && this.parent.isNewMode(context)) {
            response.rows = [];
            return response;
        }

        // selectQuery
        const selectQuery = this.getAttr('selectQuery');
        if (!selectQuery) {
            throw new Error('no selectQuery');
        }

        // database
        const database = this.getDatabase() as MongoDbDatabase;

        // exec selectQuery
        const rows = await database.query(context, selectQuery);
        this.prepareRows(context, rows);
        response.rows = rows;

        // countQuery
        const countQuery = this.getAttr('countQuery');
        if (countQuery) {
            const countResult = await database.query(context, countQuery);
            // console.log('countResult:', countResult);
            const [obj] = countResult;
            // console.log('obj:', obj);
            const count = obj[Object.keys(obj)[0]];
            console.log('count:', count);
            response.count = count;
        }

        return response;
    }
}
