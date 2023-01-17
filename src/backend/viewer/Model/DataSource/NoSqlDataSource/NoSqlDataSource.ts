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

        // collectionName
        const collectionName = this.getAttr('table');
        if (!collectionName) {
            throw new Error('NoSqlDataSource: no table');
        }

        // database
        const database = this.getDatabase() as MongoDbDatabase;

        // query
        const filter = {};
        const rows = await database.collectionFind(context, collectionName, filter);
        this.prepareRows(context, rows);
        response.rows = rows;
        return response;
    }
}
