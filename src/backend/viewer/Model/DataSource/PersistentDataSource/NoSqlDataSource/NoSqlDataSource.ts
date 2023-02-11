import { PersistentDataSource } from '../PersistentDataSource';
import { Context } from '../../../../../Context';
import { Table } from '../../../Table/Table';
import { Result } from '../../../../../Result';
import { NoSqlDatabase } from '../../../Database/NoSqlDatabase/NoSqlDatabase';

export class NoSqlDataSource extends PersistentDataSource<NoSqlDatabase> {
    table: Table;
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
        } catch (err) {
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

    async select(context: Context): Promise<[any[], number | null]> {
        if (this.getAccess(context).select !== true) {
            throw new Error(`[${this.getFullName()}]: access denied`);
        }

        // rows
        if (this.getAttr('limit') !== '') {
            if (!context.params.frame) throw new Error('no frame param');
            const limit = parseInt(this.getAttr('limit'), 10);
            context.params.skip = (context.params.frame - 1) * limit;
            context.params.limit = limit;
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
        if (this.isDefaultOnTableForm() && this.getAttr('limit')) {
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
        const filter = this.getKeyValuesFromKey(key);
        const values = changes[key];

        const updateResult = await this.getDatabase().updateOne(context, tableName, filter, {
            $set: values,
        });
        console.log('updateResult', updateResult);
        const result = new Result();
        return result;
    }
}
