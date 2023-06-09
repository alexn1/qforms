"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkSqlDataSource = void 0;
const BkPersistentDataSource_1 = require("../BkPersistentDataSource");
const BkDataSource_1 = require("../../BkDataSource");
const BkHelper_1 = require("../../../../../BkHelper");
const Result_1 = require("../../../../../../Result");
class BkSqlDataSource extends BkPersistentDataSource_1.BkPersistentDataSource {
    constructor(data, parent) {
        super(data, parent);
        this.table = null;
        if (this.getAttr('table')) {
            this.table = this.getDatabase().getTable(this.getAttr('table'));
        }
    }
    async fill(context) {
        // console.log('SqlDataSource.fill', this.getFullName());
        const response = await super.fill(context);
        if (this.isDefaultOnForm()) {
            this.checkKeyFields();
        }
        // if form data source named default then check mode
        if (this.isDefaultOnForm() && this.parent.isNewMode(context)) {
            const limit = this.getLimit();
            if (limit) {
                response.limit = limit;
            }
            response.rows = [];
            response.count = 0;
            return response;
        }
        if (this.getLimit()) {
            context.params.frame = 1;
        }
        try {
            const [rows, count] = await this.read(context);
            response.rows = rows;
            response.count = count;
        }
        catch (err) {
            err.message = `read error of ${this.getFullName()}: ${err.message}`;
            throw err;
        }
        if (this.isDefaultOnRowForm() && response.rows[0]) {
            this.parent.dumpRowToParams(response.rows[0], context.querytime.params);
        }
        if (this.getLimit()) {
            response.limit = context.params.limit;
        }
        return response;
    }
    getKeyColumns() {
        // console.log('SqlDataSource.getKeyColumns', this.getFullName());
        return this.table ? this.table.getKeyColumns() : super.getKeyColumns();
    }
    getCountQuery(context) {
        let query = this.getAttr('countQuery');
        if (!query)
            throw new Error(`${this.getFullName()}: no countQuery`);
        if (this.isOnForm()) {
            query = this.parent.replaceThis(context, query);
        }
        query = this.templateQuery(context, query);
        return query;
    }
    getSingleQuery(context) {
        let query = this.getAttr('singleQuery');
        if (!query)
            throw new Error(`no singleQuery: ${this.getFullName()}`);
        if (this.isOnForm()) {
            query = this.parent.replaceThis(context, query);
        }
        query = this.templateQuery(context, query);
        return query;
    }
    getMultipleQuery(context) {
        let query = this.getAttr('multipleQuery');
        if (!query)
            throw new Error(`no multipleQuery: ${this.getFullName()}`);
        if (this.isOnForm()) {
            query = this.parent.replaceThis(context, query);
        }
        query = this.templateQuery(context, query);
        return query;
    }
    templateQuery(context, _query) {
        const params = this.getSelectParams(context);
        let query = _query;
        // replace [param] to value
        query = _query.replace(/\[([\w.@]+)\]/g, (text, name) => {
            if (params[name]) {
                return params[name];
            }
            return text;
        });
        // replace array param to ('itemA', 'itemB')
        /* for (const name of Object.keys(params)) {
            if (Array.isArray(params[name])) {
                const items = params[name].map(item => {
                    const type = typeof item;
                    if (type === 'number') return item;
                    if (type === 'string') return `'${item}'`;
                    throw new Error(`wrong type for array item: ${type}`);
                });
                query = query.replaceAll(`{${name}}`, `(${items})`);
            }
        } */
        return query;
    }
    getSelectParams(context) {
        return context.getParams();
    }
    async read(context) {
        if (this.getAccess(context).read !== true) {
            throw new Error(`[${this.getFullName()}]: access denied`);
        }
        // rows
        const limit = this.getLimit();
        if (limit) {
            if (!context.params.frame)
                throw new Error('no frame param');
            context.params.offset = (context.params.frame - 1) * limit;
            context.params.limit = limit;
        }
        const query = this.isDefaultOnRowForm()
            ? this.getSingleQuery(context)
            : this.getMultipleQuery(context);
        const params = this.getSelectParams(context);
        const rows = await this.getDatabase().queryRows(context, query, params);
        this.checkRows(rows);
        const rawRows = this.encodeRows(rows);
        // count
        let count = null;
        if (this.isDefaultOnTableForm() && this.getLimit()) {
            try {
                const value = await this.getDatabase().queryScalar(context, this.getCountQuery(context), params);
                count = parseInt(value, 10);
            }
            catch (err) {
                err.message = `${this.getFullName()}: ${err.message}`;
                throw err;
            }
        }
        return [rawRows, count];
    }
    async create(context, _values = null) {
        console.log('SqlDataSource.create');
        if (this.getAccess(context).create !== true) {
            throw new Error(`[${this.getFullName()}]: access denied.`);
        }
        if (!this.table) {
            throw new Error(`${this.getFullName()}: no link to table object: ${this.getAttr('table')}`);
        }
        const database = this.getAttr('database');
        const table = this.getAttr('table');
        const values = _values ? _values : this.getValuesFromRow(context.getBody().row);
        const autoColumnTypes = this.getAutoColumnTypes();
        // console.log('autoColumnTypes:', autoColumnTypes);
        const newRow = await this.getDatabase().insertRow(context, table, values, autoColumnTypes);
        console.log('newRow:', newRow);
        const key = this.getKeyFromValues(newRow);
        if (!key)
            throw new Error('insert: cannot calc row key');
        console.log('key:', key);
        const keyParams = BkDataSource_1.BkDataSource.keyToParams(key);
        // console.log('keyParams:', keyParams);
        const singleQuery = this.getSingleQuery(context);
        // console.log('singleQuery:', singleQuery);
        // row
        const [row] = await this.getDatabase().queryRows(context, singleQuery, keyParams);
        if (!row)
            throw new Error('singleQuery does not return row');
        // console.log('row:', row);
        this.checkRow(row);
        const rawRow = this.encodeRow(row);
        const result = new Result_1.Result();
        Result_1.Result.addInsertToResult(result, database, table, key);
        Result_1.Result.addInsertExToResult(result, database, table, key, rawRow);
        return result;
    }
    async update(context) {
        console.log('SqlDataSource.update');
        if (this.getAccess(context).update !== true) {
            throw new Error(`[${this.getFullName()}]: access denied.`);
        }
        if (!this.table)
            throw new Error(`no database table desc: ${this.getAttr('table')}`);
        const databaseName = this.getAttr('database');
        const tableName = this.getAttr('table');
        const changes = this.decodeChanges(context.getBody().changes);
        // console.log('changes:', changes);
        const key = Object.keys(changes)[0];
        const where = this.getKeyValuesFromKey(key);
        const values = changes[key];
        // update row
        const updateQuery = this.getDatabase().getUpdateQuery(tableName, values, where);
        const _values = BkHelper_1.BkHelper.mapObject(values, (name, value) => [`val_${name}`, value]);
        const _where = BkHelper_1.BkHelper.mapObject(where, (name, value) => [`key_${name}`, value]);
        const params = Object.assign(Object.assign({}, _values), _where);
        await this.getDatabase().queryResult(context, updateQuery, params);
        // new key
        const newKey = this.calcNewKey(key, values);
        const newKeyParams = BkDataSource_1.BkDataSource.keyToParams(newKey);
        console.log('key:', key);
        console.log('newKey:', newKey);
        console.log('newKeyParams:', newKeyParams);
        // select updated row
        const selectQuery = this.getSingleQuery(context);
        // console.log('selectQuery:', selectQuery);
        const [row] = await this.getDatabase().queryRows(context, selectQuery, newKeyParams);
        if (!row)
            throw new Error('singleQuery does not return row');
        // console.log('row:', row);
        this.checkRow(row);
        const rawRow = this.encodeRow(row);
        // result
        const result = new Result_1.Result();
        Result_1.Result.addUpdateToResult(result, databaseName, tableName, key, newKey);
        Result_1.Result.addUpdateExToResult(result, databaseName, tableName, key, rawRow);
        return result;
    }
    async delete(context) {
        if (this.getAccess(context).delete !== true) {
            throw new Error(`${this.getFullName()}: access denied`);
        }
        const { key } = context.params;
        const keyValues = this.getKeyValuesFromKey(key);
        const database = this.getAttr('database');
        const table = this.getAttr('table');
        const query = this.getDatabase().getDeleteQuery(table, keyValues);
        await this.getDatabase().queryResult(context, query, keyValues);
        const result = new Result_1.Result();
        Result_1.Result.addDeleteToResult(result, database, table, key);
        return result;
    }
    fillAttributes(response) {
        response.class = this.getClassName();
        response.name = this.getAttr('name');
        response.database = this.getAttr('database');
        response.table = this.getAttr('table');
    }
    /* getDbType(column): string {
        return this.getTable().getColumn(column).getDbType();
    } */
    getAutoColumns() {
        if (!this.table)
            throw new Error('getAutoColumns: no table');
        const table = this.table;
        return this.keyColumns.filter((name) => table.getColumn(name).isAuto());
    }
    getAutoColumnTypes() {
        if (!this.table)
            throw new Error('getAutoColumnTypes: no table');
        const table = this.table;
        const columns = this.getAutoColumns();
        return columns.reduce((acc, name) => {
            acc[name] = table.getColumn(name).getAttr('type');
            return acc;
        }, {});
    }
    async getBuffer(context, file) {
        return file.data;
    }
}
exports.BkSqlDataSource = BkSqlDataSource;
