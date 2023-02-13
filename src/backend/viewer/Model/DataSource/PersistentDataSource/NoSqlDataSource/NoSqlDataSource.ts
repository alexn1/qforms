import { BkPersistentDataSource } from '../PersistentDataSource';
import { Context } from '../../../../../Context';
import { BkTable } from '../../../Table/Table';
import { Result } from '../../../../../Result';
import { BkNoSqlDatabase } from '../../../Database/NoSqlDatabase/NoSqlDatabase';
import { BkDataSource, ReadResult } from '../../DataSource';

export class BkNoSqlDataSource extends BkPersistentDataSource<BkNoSqlDatabase> {
    table: BkTable | null;

    constructor(data, parent) {
        super(data, parent);
        this.table = this.getAttr('table')
            ? this.getDatabase().getTable(this.getAttr('table'))
            : null;
    }

    async fill(context: Context): Promise<any> {
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

    async read(context: Context): Promise<ReadResult> {
        if (this.getAccess(context).read !== true) {
            throw new Error(`[${this.getFullName()}]: access denied`);
        }

        // rows
        const limit = this.getLimit();
        if (limit) {
            if (!context.params.frame) throw new Error('no frame param');
            context.setParam('skip', (context.params.frame - 1) * limit);
            context.setParam('limit', limit);
        }

        // exec selectQuery
        const start = Date.now();
        const rows = await this.getDatabase().queryRows(
            context,
            this.getSelectQuery(),
            this.getSelectParams(context),
        );
        console.log('query time:', Date.now() - start);
        this.prepareRows(context, rows);

        // count
        let count = null;
        if (this.isDefaultOnTableForm() && this.getLimit()) {
            try {
                count = await this.getDatabase().queryScalar(
                    context,
                    this.getCountQuery(context),
                    this.getSelectParams(context),
                );
                // console.log('count:', count);
            } catch (err) {
                err.message = `${this.getFullName()}: ${err.message}`;
                throw err;
            }
        }

        return [rows, count];
    }

    async update(context: Context): Promise<Result> {
        console.log('NoSqlDataSource.update');
        if (this.getAccess(context).update !== true) {
            throw new Error(`[${this.getFullName()}]: access denied.`);
        }

        if (!this.table) throw new Error(`no database table desc: ${this.getAttr('table')}`);
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
        const newKeyParams = BkDataSource.keyToParams(newKey);
        console.log('newKey:', newKey);

        const [row] = await this.getDatabase().queryRows(
            context,
            this.getSelectQuery(),
            newKeyParams,
        );
        if (!row) throw new Error('select query does not return row');
        this.prepareRows(context, [row]);
        // console.log('row:', row);

        // result
        const result = new Result();
        Result.addUpdateToResult(result, databaseName, tableName, key, newKey);
        Result.addUpdateExToResult(result, databaseName, tableName, key, row);
        return result;
    }

    getSelectQuery(): string {
        const selectQuery = this.getAttr('selectQuery');
        if (!selectQuery) {
            throw new Error('no selectQuery');
        }
        return selectQuery;
    }

    getCountQuery(context: Context): string {
        let query = this.getAttr('countQuery');
        if (!query) throw new Error(`${this.getFullName()}: no countQuery`);
        return query;
    }

    getSelectParams(context: Context): any {
        return context.getParams();
    }
}