"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSqlDataSource = void 0;
const DataSource_1 = require("../DataSource");
class NoSqlDataSource extends DataSource_1.DataSource {
    async fill(context) {
        const response = await super.fill(context);
        // if form data source named default then check mode
        if (this.isDefaultOnForm() && this.parent.isNewMode(context)) {
            response.rows = [];
            return response;
        }
        const database = this.getDatabase();
        const collectionName = this.getAttr('table');
        if (!collectionName) {
            throw new Error('NoSqlDataSource: no table');
        }
        // query
        const rows = await database.collectionFind(context, collectionName);
        this.prepareRows(context, rows);
        response.rows = rows;
        return response;
    }
}
exports.NoSqlDataSource = NoSqlDataSource;
