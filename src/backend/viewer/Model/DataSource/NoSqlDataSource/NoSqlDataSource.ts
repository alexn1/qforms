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

        const rows = await database.query(context, selectQuery);
        this.prepareRows(context, rows);
        response.rows = rows;
        return response;
    }
}
