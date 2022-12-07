"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlDataSource = void 0;
const DataSource_1 = require("../DataSource");
const Helper_1 = require("../../../../Helper");
const Result_1 = require("../../../../Result");
class SqlDataSource extends DataSource_1.DataSource {
    constructor(data, parent) {
        super(data, parent);
        this.table = this.getAttr('table')
            ? this.getDatabase().getTable(this.getAttr('table'))
            : null;
    }
    getKeyColumns() {
        // console.log('SqlDataSource.getKeyColumns', this.getFullName());
        return this.table ? this.table.getKeyColumns() : super.getKeyColumns();
    }
    getCountQuery(context) {
        let query = this.getAttr('countQuery');
        if (!query)
            throw new Error(`no countQuery: ${this.getFullName()}`);
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
        query = _query.replace(/\[([\w\.@]+)\]/g, (text, name) => {
            if (params[name]) {
                return params[name];
            }
            return text;
        });
        // replace array param to ('itemA', 'itemB')
        /*for (const name of Object.keys(params)) {
            if (Array.isArray(params[name])) {
                const items = params[name].map(item => {
                    const type = typeof item;
                    if (type === 'number') return item;
                    if (type === 'string') return `'${item}'`;
                    throw new Error(`wrong type for array item: ${type}`);
                });
                query = query.replaceAll(`{${name}}`, `(${items})`);
            }
        }*/
        return query;
    }
    /*async selectSingle(context: Context) {
        // console.log('SqlDataSource.selectSingle');
        if (this.getAccess(context).select !== true) throw new Error(`[${this.getFullName()}]: access denied`);
        const rows = await this.getDatabase().queryRows(context, this.getSingleQuery(context), context.getParams());
        // if (rows.length !== 1) throw new Error(`${this.getFullName()}: single query must return single row`);
        this.prepareRows(context, rows);
        return rows[0] || null;
    }*/
    /*async selectMultiple(context: Context) {
        // console.log('SqlDataSource.selectMultiple');
        if (this.getAccess(context).select !== true) throw new Error(`[${this.getFullName()}]: access denied`);

        // rows
        if (this.getAttr('limit') !== '') {
            if (!context.params.frame) throw new Error('no frame param');
            const limit = parseInt(this.getAttr('limit'));
            context.params.offset = (context.params.frame - 1) * limit;
            context.params.limit = limit;
        }
        const rows = await this.getDatabase().queryRows(context, this.getMultipleQuery(context), context.getParams());
        this.prepareRows(context, rows);

        // count
        let count;
        if (this.isDefaultOnTableForm() && this.getAttr('countQuery')) {
            try {
                count = await this.getDatabase().queryScalar(context, this.getCountQuery(context), context.getParams());
                count = parseInt(count);
            } catch (err) {
                err.message = `${this.getFullName()}: ${err.message}`;
                throw err;
            }
        }
        return [rows, count];
    }*/
    getSelectParams(context) {
        return context.getParams();
    }
    async select(context) {
        if (this.getAccess(context).select !== true)
            throw new Error(`[${this.getFullName()}]: access denied`);
        // rows
        if (this.getAttr('limit') !== '') {
            if (!context.params.frame)
                throw new Error('no frame param');
            const limit = parseInt(this.getAttr('limit'));
            context.params.offset = (context.params.frame - 1) * limit;
            context.params.limit = limit;
        }
        const query = this.isDefaultOnRowForm()
            ? this.getSingleQuery(context)
            : this.getMultipleQuery(context);
        const params = this.getSelectParams(context);
        const rows = await this.getDatabase().queryRows(context, query, params);
        this.prepareRows(context, rows);
        // count
        let count;
        if (this.isDefaultOnTableForm() && this.getAttr('limit')) {
            try {
                count = await this.getDatabase().queryScalar(context, this.getCountQuery(context), params);
                count = parseInt(count);
            }
            catch (err) {
                err.message = `${this.getFullName()}: ${err.message}`;
                throw err;
            }
        }
        return [rows, count];
    }
    async insert(context, _values = null) {
        console.log('SqlDataSource.insert');
        if (this.getAccess(context).insert !== true)
            throw new Error(`[${this.getFullName()}]: access denied.`);
        if (!this.table)
            throw new Error(`${this.getFullName()}: no link to table object: ${this.getAttr('table')}`);
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
        const keyParams = DataSource_1.DataSource.keyToParams(key);
        // console.log('keyParams:', keyParams);
        const singleQuery = this.getSingleQuery(context);
        // console.log('singleQuery:', singleQuery);
        // row
        const [row] = await this.getDatabase().queryRows(context, singleQuery, keyParams);
        if (!row)
            throw new Error('singleQuery does not return row');
        this.prepareRows(context, [row]);
        // console.log('row:', row);
        const result = new Result_1.Result();
        Result_1.Result.addInsertToResult(result, database, table, key);
        Result_1.Result.addInsertExToResult(result, database, table, key, row);
        return result;
    }
    async update(context) {
        console.log('SqlDataSource.update');
        if (this.getAccess(context).update !== true)
            throw new Error(`[${this.getFullName()}]: access denied.`);
        if (!this.table)
            throw new Error(`no database table desc: ${this.getAttr('table')}`);
        const database = this.getAttr('database');
        const table = this.getAttr('table');
        const changes = this.decodeChanges(context.getBody().changes);
        // console.log('changes:', changes);
        const key = Object.keys(changes)[0];
        const where = this.getKeyValuesFromKey(key);
        const values = changes[key];
        // update row
        const updateQuery = this.getDatabase().getUpdateQuery(this.getAttr('table'), values, where);
        const _values = Helper_1.Helper.mapObject(values, (name, value) => [`val_${name}`, value]);
        const _where = Helper_1.Helper.mapObject(where, (name, value) => [`key_${name}`, value]);
        const params = Object.assign(Object.assign({}, _values), _where);
        await this.getDatabase().queryResult(context, updateQuery, params);
        // new key
        const newKey = this.calcNewKey(key, values);
        const newKeyParams = DataSource_1.DataSource.keyToParams(newKey);
        console.log('key:', key);
        console.log('newKey:', newKey);
        console.log('newKeyParams:', newKeyParams);
        // select updated row
        const selectQuery = this.getSingleQuery(context);
        // console.log('selectQuery:', selectQuery);
        const [row] = await this.getDatabase().queryRows(context, selectQuery, newKeyParams);
        if (!row)
            throw new Error('singleQuery does not return row');
        this.prepareRows(context, [row]);
        // console.log('row:', row);
        // result
        const result = new Result_1.Result();
        Result_1.Result.addUpdateToResult(result, database, table, key, newKey);
        Result_1.Result.addUpdateExToResult(result, database, table, key, row);
        return result;
    }
    async delete(context) {
        if (this.getAccess(context).delete !== true)
            throw new Error(`${this.getFullName()}: access denied`);
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
    async fill(context) {
        //console.log('SqlDataSource.fill', this.getFullName());
        let response = await super.fill(context);
        // if form data source named default then check mode
        if (this.isDefaultOnForm() && this.parent.isNewMode(context)) {
            if (this.getAttr('limit') !== '') {
                response.limit = parseInt(this.getAttr('limit'));
            }
            response.rows = [];
            response.count = 0;
            return response;
        }
        if (this.getAttr('limit') !== '') {
            context.params.frame = 1;
        }
        // if (this.isDefaultOnRowForm()) {
        //     const row = await this.selectSingle(context);
        //     if (!row) throw new Error(`${this.getFullName()}: RowForm single query must return row`);
        //     response.rows = [row];
        // } else {
        try {
            const [rows, count] = await this.select(context);
            response.rows = rows;
            response.count = count;
        }
        catch (err) {
            err.message = `select error of ${this.getFullName()}: ${err.message}`;
            throw err;
        }
        // }
        if (this.isDefaultOnRowForm() && response.rows[0]) {
            this.parent.dumpRowToParams(response.rows[0], context.querytime.params);
        }
        if (this.getAttr('limit') !== '') {
            response.limit = context.params.limit;
        }
        return response;
    }
    async getRows() {
        return null;
    }
    getTable() {
        const tableName = this.getAttr('table');
        if (!tableName)
            throw new Error(`${this.getFullName()}: no table name`);
        return this.getDatabase().getTable(tableName);
    }
    /*getDbType(column): string {
        return this.getTable().getColumn(column).getDbType();
    }*/
    getAutoColumns() {
        return this.keyColumns.filter(name => this.table.getColumn(name).isAuto());
    }
    getAutoColumnTypes() {
        const columns = this.getAutoColumns();
        return columns.reduce((acc, name) => {
            acc[name] = this.table.getColumn(name).getAttr('type');
            return acc;
        }, {});
    }
    getAccess(context) {
        return {
            select: true,
            insert: true,
            update: true,
            delete: true,
        };
    }
    getValuesFromRow(row) {
        console.log('SqlDataSource.getValuesFromRow', row);
        const values = {};
        for (const field of this.getForm().fields) {
            const column = field.getAttr('column');
            if (row.hasOwnProperty(column)) {
                const value = field.rawToValue(row[column]);
                values[column] = field.valueToSqlValue(value);
            }
        }
        return values;
    }
    decodeChanges(changes) {
        const dChanges = {};
        for (const key in changes) {
            dChanges[key] = this.getValuesFromRow(changes[key]);
        }
        return dChanges;
    }
    async getBuffer(context, file) {
        return file.data;
    }
}
exports.SqlDataSource = SqlDataSource;
