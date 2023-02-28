"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkNoSqlDataSource = void 0;
const BkPersistentDataSource_1 = require("../BkPersistentDataSource");
const Result_1 = require("../../../../../../Result");
const BkDataSource_1 = require("../../BkDataSource");
const Helper_1 = require("../../../../../Helper");
class BkNoSqlDataSource extends BkPersistentDataSource_1.BkPersistentDataSource {
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
            err.message = `select error of ${this.getFullName()}: ${err.message}`;
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
    async read(context) {
        if (this.getAccess(context).read !== true) {
            throw new Error(`[${this.getFullName()}]: access denied`);
        }
        // rows
        const limit = this.getLimit();
        if (limit) {
            if (!context.params.frame)
                throw new Error('no frame param');
            context.setParam('skip', (context.params.frame - 1) * limit);
            context.setParam('limit', limit);
        }
        // exec selectQuery
        const start = Date.now();
        const rows = await this.getDatabase().queryRows(context, this.getSelectQuery(), this.getSelectParams(context));
        console.log('rows query time:', Date.now() - start);
        // console.log('rows:', rows);
        this.checkRows(rows);
        // this.encodeRows(rows);
        const rawRows = this.encodeRows2(rows);
        // count
        let count = null;
        if (this.isDefaultOnTableForm() && this.getLimit()) {
            try {
                const start = Date.now();
                count = await this.getDatabase().queryScalar(context, this.getCountQuery(context), this.getSelectParams(context));
                console.log('count query time:', Date.now() - start);
            }
            catch (err) {
                err.message = `${this.getFullName()}: ${err.message}`;
                throw err;
            }
        }
        return [rawRows, count];
    }
    async create(context, _values = null) {
        console.log('NoSqlDataSource.create');
        if (this.getAccess(context).create !== true) {
            throw new Error(`[${this.getFullName()}]: access denied.`);
        }
        if (!this.table) {
            throw new Error(`${this.getFullName()}: no link to table object: ${this.getAttr('table')}`);
        }
        const databaseName = this.getAttr('database');
        const tableName = this.getAttr('table');
        const values = _values ? _values : this.getValuesFromRow(context.getBody().row);
        console.log('values', values);
        const insertResult = await this.getDatabase().insertOne(context, tableName, values);
        console.log('insertResult:', insertResult);
        const newRow = { _id: insertResult.insertedId };
        const key = this.getKeyFromValues(newRow);
        if (!key)
            throw new Error('create: cannot calc row key');
        console.log('key:', key);
        const keyParams = BkDataSource_1.BkDataSource.keyToParams(key);
        // console.log('keyParams:', keyParams);
        // row
        const [row] = await this.getDatabase().queryRows(context, this.getSelectQuery(), keyParams);
        if (!row)
            throw new Error('select query does not return row');
        this.checkRow(row);
        const rawRow = this.encodeRow2(row);
        // console.log('row:', row);
        const result = new Result_1.Result();
        Result_1.Result.addInsertToResult(result, databaseName, tableName, key);
        Result_1.Result.addInsertExToResult(result, databaseName, tableName, key, rawRow);
        return result;
    }
    async update(context) {
        console.log('NoSqlDataSource.update');
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
        console.log('key:', key);
        const filter = this.getKeyValuesFromKey(key);
        const values = changes[key];
        const updateResult = await this.getDatabase().updateOne(context, tableName, filter, {
            $set: values,
        });
        console.log('updateResult', updateResult);
        // new key
        const newKey = this.calcNewKey(key, values);
        const newKeyParams = BkDataSource_1.BkDataSource.keyToParams(newKey);
        console.log('newKey:', newKey);
        // row
        const [row] = await this.getDatabase().queryRows(context, this.getSelectQuery(), newKeyParams);
        if (!row)
            throw new Error('select query does not return row');
        this.checkRow(row);
        const rawRow = this.encodeRow2(row);
        // console.log('row:', row);
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
        const filter = this.getKeyValuesFromKey(key);
        const deleteResult = await this.getDatabase().deleteOne(context, this.getAttr('table'), filter);
        console.log('updateResult', deleteResult);
        const result = new Result_1.Result();
        Result_1.Result.addDeleteToResult(result, this.getAttr('database'), this.getAttr('table'), key);
        return result;
    }
    getSelectQuery() {
        const selectQuery = this.getAttr('selectQuery');
        if (!selectQuery) {
            throw new Error('no selectQuery');
        }
        return selectQuery;
    }
    getCountQuery(context) {
        const query = this.getAttr('countQuery');
        if (!query)
            throw new Error(`${this.getFullName()}: no countQuery`);
        return query;
    }
    getSelectParams(context) {
        return context.getParams();
    }
    checkRow(row) {
        this.checkKeyColumns(row);
        if (this.isOnForm()) {
            this.checkKeyFields(row);
        }
        if (this.isDefaultOnForm()) {
            // this.checkNotUsedColumns(row);
            // this.checkFields(row);
        }
    }
    encodeRow2(row) {
        if (!row)
            throw new Error(`encodeRow: need row`);
        const rawRow = {};
        if (this.isDefaultOnForm()) {
            for (const field of this.getForm().fields) {
                const column = field.getAttr('column');
                rawRow[column] =
                    row[column] !== undefined
                        ? field.valueToRaw(row[column])
                        : 'null';
                if (field.isAttr('displayColumn')) {
                    const displayColumn = field.getAttr('displayColumn');
                    rawRow[displayColumn] = field.valueToRaw(row[displayColumn]);
                }
            }
        }
        else {
            for (const name in row) {
                rawRow[name] = Helper_1.Helper.encodeValue(row[name]);
            }
        }
        return rawRow;
    }
}
exports.BkNoSqlDataSource = BkNoSqlDataSource;
