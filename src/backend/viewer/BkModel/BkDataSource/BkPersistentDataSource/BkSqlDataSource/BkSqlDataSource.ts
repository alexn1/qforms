import { BkPersistentDataSource } from '../BkPersistentDataSource';
import { BkDataSource, ReadResult } from '../../BkDataSource';
import { Helper } from '../../../../../Helper';
import { BkTable } from '../../../BkTable/BkTable';
import { Context } from '../../../../../Context';
import { Result } from '../../../../../../Result';
import { SqlDatabase } from '../../../BkDatabase/BkSqlDatabase/BkSqlDatabase';
import { Key } from '../../../../../../types';

export class BkSqlDataSource extends BkPersistentDataSource<SqlDatabase> {
    table: BkTable | null = null;

    constructor(data, parent) {
        super(data, parent);
        if (this.getAttr('table')) {
            this.table = this.getDatabase().getTable(this.getAttr('table'));
        }
    }

    async fill(context: Context) {
        //console.log('SqlDataSource.fill', this.getFullName());
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
        } catch (err) {
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

    getKeyColumns(): string[] {
        // console.log('SqlDataSource.getKeyColumns', this.getFullName());
        return this.table ? this.table.getKeyColumns() : super.getKeyColumns();
    }

    getCountQuery(context: Context): string {
        let query = this.getAttr('countQuery');
        if (!query) throw new Error(`${this.getFullName()}: no countQuery`);
        if (this.isOnForm()) {
            query = this.parent.replaceThis(context, query);
        }
        query = this.templateQuery(context, query);
        return query;
    }

    getSingleQuery(context: Context) {
        let query = this.getAttr('singleQuery');
        if (!query) throw new Error(`no singleQuery: ${this.getFullName()}`);
        if (this.isOnForm()) {
            query = this.parent.replaceThis(context, query);
        }
        query = this.templateQuery(context, query);
        return query;
    }

    getMultipleQuery(context: Context) {
        let query = this.getAttr('multipleQuery');
        if (!query) throw new Error(`no multipleQuery: ${this.getFullName()}`);
        if (this.isOnForm()) {
            query = this.parent.replaceThis(context, query);
        }
        query = this.templateQuery(context, query);
        return query;
    }

    templateQuery(context: Context, _query: string): string {
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

    getSelectParams(context: Context) {
        return context.getParams();
    }

    async read(context: Context): Promise<ReadResult> {
        if (this.getAccess(context).read !== true) {
            throw new Error(`[${this.getFullName()}]: access denied`);
        }

        // rows
        const limit = this.getLimit();
        if (limit) {
            if (!context.params.frame) throw new Error('no frame param');
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
        let count: number | null = null;
        if (this.isDefaultOnTableForm() && this.getLimit()) {
            try {
                const value = await this.getDatabase().queryScalar(
                    context,
                    this.getCountQuery(context),
                    params,
                );
                count = parseInt(value, 10);
            } catch (err) {
                err.message = `${this.getFullName()}: ${err.message}`;
                throw err;
            }
        }

        return [rows, count];
    }

    async create(context: Context, _values: any = null): Promise<Result> {
        console.log('SqlDataSource.create');
        if (this.getAccess(context).create !== true) {
            throw new Error(`[${this.getFullName()}]: access denied.`);
        }

        if (!this.table) {
            throw new Error(
                `${this.getFullName()}: no link to table object: ${this.getAttr('table')}`,
            );
        }

        const database = this.getAttr('database');
        const table = this.getAttr('table');
        const values = _values ? _values : this.getValuesFromRow(context.getBody().row);
        const autoColumnTypes = this.getAutoColumnTypes();
        // console.log('autoColumnTypes:', autoColumnTypes);

        const newRow = await this.getDatabase().insertRow(context, table, values, autoColumnTypes);
        console.log('newRow:', newRow);

        const key = this.getKeyFromValues(newRow);
        if (!key) throw new Error('insert: cannot calc row key');
        console.log('key:', key);

        const keyParams = BkDataSource.keyToParams(key);
        // console.log('keyParams:', keyParams);

        const singleQuery = this.getSingleQuery(context);
        // console.log('singleQuery:', singleQuery);

        // row
        const [row] = await this.getDatabase().queryRows(context, singleQuery, keyParams);
        if (!row) throw new Error('singleQuery does not return row');
        this.prepareRows(context, [row]);
        // console.log('row:', row);

        const result = new Result();
        Result.addInsertToResult(result, database, table, key);
        Result.addInsertExToResult(result, database, table, key, row);
        return result;
    }

    async update(context: Context): Promise<Result> {
        console.log('SqlDataSource.update');
        if (this.getAccess(context).update !== true) {
            throw new Error(`[${this.getFullName()}]: access denied.`);
        }

        if (!this.table) throw new Error(`no database table desc: ${this.getAttr('table')}`);
        const databaseName = this.getAttr('database');
        const tableName = this.getAttr('table');
        const changes = this.decodeChanges(context.getBody().changes);

        // console.log('changes:', changes);
        const key = Object.keys(changes)[0] as Key;
        const where = this.getKeyValuesFromKey(key);
        const values = changes[key];

        // update row
        const updateQuery = this.getDatabase().getUpdateQuery(tableName, values, where);
        const _values = Helper.mapObject(values, (name, value) => [`val_${name}`, value]);
        const _where = Helper.mapObject(where, (name, value) => [`key_${name}`, value]);
        const params = { ..._values, ..._where };
        await this.getDatabase().queryResult(context, updateQuery, params);

        // new key
        const newKey = this.calcNewKey(key, values);
        const newKeyParams = BkDataSource.keyToParams(newKey);
        console.log('key:', key);
        console.log('newKey:', newKey);
        console.log('newKeyParams:', newKeyParams);

        // select updated row
        const selectQuery = this.getSingleQuery(context);
        // console.log('selectQuery:', selectQuery);
        const [row] = await this.getDatabase().queryRows(context, selectQuery, newKeyParams);
        if (!row) throw new Error('singleQuery does not return row');
        this.prepareRows(context, [row]);
        // console.log('row:', row);

        // result
        const result = new Result();
        Result.addUpdateToResult(result, databaseName, tableName, key, newKey);
        Result.addUpdateExToResult(result, databaseName, tableName, key, row);
        return result;
    }

    async delete(context: Context): Promise<Result> {
        if (this.getAccess(context).delete !== true) {
            throw new Error(`${this.getFullName()}: access denied`);
        }

        const { key } = context.params;
        const keyValues = this.getKeyValuesFromKey(key);
        const database = this.getAttr('database');
        const table = this.getAttr('table');
        const query = this.getDatabase().getDeleteQuery(table, keyValues);
        await this.getDatabase().queryResult(context, query, keyValues);
        const result = new Result();
        Result.addDeleteToResult(result, database, table, key);
        return result;
    }

    fillAttributes(response: any): void {
        response.class = this.getClassName();
        response.name = this.getAttr('name');
        response.database = this.getAttr('database');
        response.table = this.getAttr('table');
    }

    /*getDbType(column): string {
        return this.getTable().getColumn(column).getDbType();
    }*/

    getAutoColumns(): string[] {
        if (!this.table) throw new Error('getAutoColumns: no table');
        const table = this.table;
        return this.keyColumns.filter((name) => table.getColumn(name).isAuto());
    }

    getAutoColumnTypes() {
        if (!this.table) throw new Error('getAutoColumnTypes: no table');
        const table = this.table;
        const columns = this.getAutoColumns();
        return columns.reduce((acc, name) => {
            acc[name] = table.getColumn(name).getAttr('type');
            return acc;
        }, {});
    }

    async getBuffer(context: Context, file) {
        return file.data;
    }
}
