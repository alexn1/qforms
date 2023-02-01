"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSqlDataSource = void 0;
const DataSource_1 = require("../DataSource");
class NoSqlDataSource extends DataSource_1.DataSource {
    async fill(context) {
        const response = await super.fill(context);
        // if form data source named default then check mode
        if (this.isDefaultOnForm() && this.parent.isNewMode(context)) {
            if (this.getAttr('limit') !== '') {
                response.limit = parseInt(this.getAttr('limit'), 10);
            }
            response.rows = [];
            response.count = 0;
            return response;
        }
        if (this.getAttr('limit') !== '') {
            context.params.frame = 1;
        }
        // selectQuery
        const selectQuery = this.getAttr('selectQuery');
        if (!selectQuery) {
            throw new Error('no selectQuery');
        }
        // database
        const database = this.getDatabase();
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
    async select(context) {
        if (this.getAccess(context).select !== true) {
            throw new Error(`[${this.getFullName()}]: access denied`);
        }
        return [[], null];
    }
}
exports.NoSqlDataSource = NoSqlDataSource;
