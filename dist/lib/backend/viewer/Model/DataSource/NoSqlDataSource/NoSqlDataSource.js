"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSqlDataSource = void 0;
const DataSource_1 = require("../DataSource");
const Result_1 = require("../../../../Result");
class NoSqlDataSource extends DataSource_1.DataSource {
    constructor(data, parent) {
        super(data, parent);
        this.table = this.getAttr('table')
            ? this.getDatabase().getTable(this.getAttr('table'))
            : null;
    }
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
        try {
            const [rows, count] = await this.select(context);
            response.rows = rows;
            response.count = count;
        }
        catch (err) {
            err.message = `select error of ${this.getFullName()}: ${err.message}`;
            throw err;
        }
        if (this.isDefaultOnRowForm() && response.rows[0]) {
            this.parent.dumpRowToParams(response.rows[0], context.querytime.params);
        }
        if (this.getAttr('limit') !== '') {
            response.limit = context.params.limit;
        }
        return response;
    }
    async select(context) {
        if (this.getAccess(context).select !== true) {
            throw new Error(`[${this.getFullName()}]: access denied`);
        }
        // rows
        if (this.getAttr('limit') !== '') {
            if (!context.params.frame)
                throw new Error('no frame param');
            const limit = parseInt(this.getAttr('limit'), 10);
            context.params.skip = (context.params.frame - 1) * limit;
            context.params.limit = limit;
        }
        // exec selectQuery
        const start = Date.now();
        const rows = await this.getDatabase().query(context, this.getSelectQuery(), this.getSelectParams(context));
        console.log('query time:', Date.now() - start);
        this.prepareRows(context, rows);
        // count
        let count = null;
        if (this.isDefaultOnTableForm() && this.getAttr('limit')) {
            try {
                const countResult = await this.getDatabase().query(context, this.getCountQuery(context), this.getSelectParams(context));
                // console.log('countResult:', countResult);
                const [obj] = countResult;
                // console.log('obj:', obj);
                count = obj[Object.keys(obj)[0]];
                // console.log('count:', count);
            }
            catch (err) {
                err.message = `${this.getFullName()}: ${err.message}`;
                throw err;
            }
        }
        return [rows, count];
    }
    getDatabase() {
        return super.getDatabase();
    }
    getSelectQuery() {
        const selectQuery = this.getAttr('selectQuery');
        if (!selectQuery) {
            throw new Error('no selectQuery');
        }
        return selectQuery;
    }
    getCountQuery(context) {
        let query = this.getAttr('countQuery');
        if (!query)
            throw new Error(`${this.getFullName()}: no countQuery`);
        return query;
    }
    getSelectParams(context) {
        return context.getParams();
    }
    async update(context) {
        console.log('NoSqlDataSource.update');
        if (this.getAccess(context).update !== true) {
            throw new Error(`[${this.getFullName()}]: access denied.`);
        }
        if (!this.table)
            throw new Error(`no database table desc: ${this.getAttr('table')}`);
        const database = this.getAttr('database');
        const table = this.getAttr('table');
        const result = new Result_1.Result();
        return result;
    }
}
exports.NoSqlDataSource = NoSqlDataSource;
