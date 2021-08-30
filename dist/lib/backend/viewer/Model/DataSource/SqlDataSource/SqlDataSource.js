"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const DataSource_1 = __importDefault(require("../DataSource"));
const Helper_1 = __importDefault(require("../../../../Helper"));
class SqlDataSource extends DataSource_1.default {
    constructor(data, parent) {
        super(data, parent);
        this.table = this.getAttr('table') ? this.getDatabase().getTable(this.getAttr('table')) : null;
    }
    getKeyColumns() {
        // console.log('SqlDataSource.getKeyColumns', this.getFullName());
        return this.table ? this.table.getKeyColumns() : super.getKeyColumns();
    }
    getCountQuery(context) {
        const countQuery = this.getAttr('countQuery');
        if (!countQuery)
            throw new Error(`no countQuery: ${this.getFullName()}`);
        return this.isOnForm() ? this.parent.replaceThis(context, countQuery) : countQuery;
    }
    getSingleQuery(context) {
        const singleQuery = this.getAttr('singleQuery');
        if (!singleQuery)
            throw new Error(`no singleQuery: ${this.getFullName()}`);
        return this.isOnForm() ? this.parent.replaceThis(context, singleQuery) : singleQuery;
    }
    getMultipleQuery(context) {
        const multipleQuery = this.getAttr('multipleQuery');
        if (!multipleQuery)
            throw new Error(`no multipleQuery: ${this.getFullName()}`);
        return this.isOnForm() ? this.parent.replaceThis(context, multipleQuery) : multipleQuery;
    }
    async selectSingle(context) {
        // console.log('SqlDataSource.selectSingle');
        if (this.getAccess(context).select !== true)
            throw new Error(`[${this.getFullName()}]: access denied`);
        const rows = await this.getDatabase().queryRows(context, this.getSingleQuery(context), context.getParams());
        // if (rows.length !== 1) throw new Error(`${this.getFullName()}: single query must return single row`);
        this.prepareRows(context, rows);
        return rows[0] || null;
    }
    async selectMultiple(context) {
        // console.log('SqlDataSource.selectMultiple');
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
        const rows = await this.getDatabase().queryRows(context, this.getMultipleQuery(context), context.getParams());
        this.prepareRows(context, rows);
        // count
        let count;
        if (this.isDefaultOnTableForm() && this.getAttr('countQuery')) {
            try {
                count = await this.getDatabase().queryScalar(context, this.getCountQuery(context), context.getParams());
                count = parseInt(count);
            }
            catch (err) {
                err.message = `${this.getFullName()}: ${err.message}`;
                throw err;
            }
        }
        return [rows, count];
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
        const query = this.isDefaultOnRowForm() ? this.getSingleQuery(context) : this.getMultipleQuery(context);
        const rows = await this.getDatabase().queryRows(context, query, context.getParams());
        this.prepareRows(context, rows);
        // count
        let count;
        if (this.isDefaultOnTableForm() && this.getAttr('limit')) {
            try {
                count = await this.getDatabase().queryScalar(context, this.getCountQuery(context), context.getParams());
                count = parseInt(count);
            }
            catch (err) {
                err.message = `${this.getFullName()}: ${err.message}`;
                throw err;
            }
        }
        return [rows, count];
    }
    async update(context) {
        console.log('SqlDataSource.update');
        if (this.getAccess(context).update !== true)
            throw new Error(`[${this.getFullName()}]: access denied.`);
        if (!this.table)
            throw new Error(`no database table desc: ${this.getAttr('table')}`);
        const changes = context.changes;
        // console.log('changes:', changes);
        const key = Object.keys(changes)[0];
        const where = this.getKeyValuesFromKey(key);
        const values = changes[key];
        const query = this.getDatabase().getUpdateQuery(this.getAttr('table'), values, where);
        const _values = Helper_1.default.mapObject(values, (name, value) => [`val_${name}`, value]);
        const _where = Helper_1.default.mapObject(where, (name, value) => [`key_${name}`, value]);
        const params = Object.assign(Object.assign({}, _values), _where);
        await this.getDatabase().queryResult(context, query, params);
        // get updated row
        const newKey = this.calcNewKey(key, values);
        const newKeyParams = DataSource_1.default.keyToParams(newKey);
        console.log('key:', key);
        console.log('newKey:', newKey);
        console.log('newKeyParams:', newKeyParams);
        const singleQuery = this.getSingleQuery(context);
        // console.log('singleQuery:', singleQuery);
        const [row] = await this.getDatabase().queryRows(context, singleQuery, newKeyParams);
        if (!row)
            throw new Error('singleQuery does not return row');
        this.prepareRows(context, [row]);
        // console.log('row:', row);
        return { [key]: row };
    }
    async getBuffer(context, file) {
        return file.data;
    }
    getValuesFromRow(row) {
        console.log('SqlDataSource.getValuesFromRow', row);
        const values = {};
        for (const field of this.getParent().fields) {
            const column = field.getAttr('column');
            if (row.hasOwnProperty(column)) {
                values[column] = field.rawToValue(row[column]);
            }
        }
        return values;
        // return Helper.decodeObject(row);
    }
    async insert(context, _values = null) {
        console.log('SqlDataSource.insert');
        const values = _values ? _values : this.getValuesFromRow(context.getBody().row);
        if (!this.table)
            throw new Error(`${this.getFullName()}: no link to table object: ${this.getAttr('table')}`);
        if (this.getAccess(context).insert !== true)
            throw new Error(`[${this.getFullName()}]: access denied.`);
        const table = this.getAttr('table');
        const autoColumnTypes = this.getAutoColumnTypes();
        // console.log('autoColumnTypes:', autoColumnTypes);
        const newRow = await this.getDatabase().insertRow(context, table, values, autoColumnTypes);
        console.log('newRow:', newRow);
        const key = this.getKeyFromValues(newRow);
        if (!key)
            throw new Error('insert: cannot calc row key');
        console.log('key:', key);
        const keyParams = DataSource_1.default.keyToParams(key);
        // console.log('keyParams:', keyParams);
        const singleQuery = this.getSingleQuery(context);
        // console.log('singleQuery:', singleQuery);
        // row
        const [row] = await this.getDatabase().queryRows(context, singleQuery, keyParams);
        if (!row)
            throw new Error('singleQuery does not return row');
        this.prepareRows(context, [row]);
        // console.log('row:', row);
        const result = {
        // new: {[key]: row}
        };
        SqlDataSource.addInsertToResult(result, table, key, row);
        return result;
    }
    static addInsertToResult(result, table, key, row) {
        if (!result.insert)
            result.insert = {};
        if (!result.insert[table])
            result.insert[table] = {};
        result.insert[table][key] = row;
    }
    static addUpdateToResult(result, table, oldKey, newKey) {
        // console.log('SqlDataSource.addUpdateToResult');
        if (!result.update)
            result.update = {};
        if (!result.update[table])
            result.update[table] = {};
        result.update[table][oldKey] = newKey;
    }
    static addDeleteToResult(result, table, key) {
        if (!result.delete)
            result.delete = {};
        if (!result.delete[table])
            result.delete[table] = [];
        result.delete[table].push(key);
    }
    async delete(context) {
        if (this.getAccess(context).delete !== true)
            throw new Error(`${this.getFullName()}: access denied`);
        const { key } = context.params;
        const keyValues = this.getKeyValuesFromKey(key);
        const table = this.getAttr('table');
        const query = this.getDatabase().getDeleteQuery(table, keyValues);
        await this.getDatabase().queryResult(context, query, keyValues);
        const result = {};
        SqlDataSource.addDeleteToResult(result, table, key);
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
        if (this.isOnForm() && this.getName() === 'default' && this.parent.isNewMode(context)) {
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
        if (this.isDefaultOnRowForm()) {
            const row = await this.selectSingle(context);
            if (!row)
                throw new Error(`${this.getFullName()}: RowForm single query must return row`);
            response.rows = [row];
        }
        else {
            try {
                const [rows, count] = await this.selectMultiple(context);
                response.rows = rows;
                response.count = count;
            }
            catch (err) {
                err.message = `selectMultiple error of ${this.getFullName()}: ${err.message}`;
                throw err;
            }
        }
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
            delete: true
        };
    }
}
module.exports = SqlDataSource;
