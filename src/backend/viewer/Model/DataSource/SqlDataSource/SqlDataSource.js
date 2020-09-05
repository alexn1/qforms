'use strict';

const path       = require('path');
const qforms     = require('../../../../qforms');
const DataSource = require('../DataSource');

class SqlDataSource extends DataSource {

    constructor(data, parent) {
        super(data, parent);

        // database
        this.database = this.getDatabase();

        // table
        this.table = this.getAttr('table') ? this.database.getTable(this.getAttr('table')) : null;
    }

    static async create(data, parent) {
        if (parent instanceof qforms.Form) {
            const form = parent;
            const name = data['@attributes'].name;
            const customClassFilePath = path.join(
                form.page.application.dirPath,
                'pages',
                form.page.name,
                'forms',
                form.name,
                'dataSources',
                name,
                `${name}.backend.js`
            );
            const content = await qforms.Helper.getFileContent(customClassFilePath);
            if (content) {
                const CustomClass = eval(content);
                return new CustomClass(data, parent);
            } else {
                return new SqlDataSource(data, parent);
            }
        } else {
            return new SqlDataSource(data, parent);
        }
    }

    getKeyColumns() {
        // console.log('SqlDataSource.getKeyColumns', this.name);
        return this.table ? this.table.getKeyColumns() : super.getKeyColumns();
    }

    getCountQuery(context) {
        const countQuery = this.getAttr('countQuery');
        if (!countQuery) throw new Error(`no countQuery: ${this.getFullName()}`);
        return this.form ? this.form.replaceThis(context, countQuery) : countQuery;
    }

    getSingleQuery(context) {
        const singleQuery = this.getAttr('singleQuery');
        if (!singleQuery) throw new Error(`no singleQuery: ${this.getFullName()}`);
        return this.form ? this.form.replaceThis(context, singleQuery) : singleQuery;
    }

    getMultipleQuery(context) {
        const multipleQuery = this.getAttr('multipleQuery');
        if (!multipleQuery) throw new Error(`no multipleQuery: ${this.getFullName()}`);
        return this.form ? this.form.replaceThis(context, multipleQuery) : multipleQuery;
    }

    async selectSingle(context) {
        console.log('SqlDataSource.selectSingle');
        if (this.getAccess(context).select !== true) throw new Error(`[${this.getFullName()}]: access denied`);
        const rows = await this.database.queryRows(context, this.getSingleQuery(context), this.getParams(context));
        if (rows.length > 1) throw new Error(`single query must return single row: ${this.getFullName()}`);
        const row = rows[0] || null;
        if (row) this.checkAndCalcColumns(row);
        return row;
    }

    async selectMultiple(context) {
        console.log('SqlDataSource.selectMultiple');
        if (this.getAccess(context).select !== true) throw new Error(`[${this.getFullName()}]: access denied`);

        // rows
        if (this.getAttr('limit')) {
            context.params.limit = parseInt(this.getAttr('limit'));
        }
        const rows = await this.database.queryRows(context, this.getMultipleQuery(context), this.getParams(context));
        for (let i = 0; i < rows.length; i++) {
            this.checkAndCalcColumns(rows[i]);
        }

        // count
        let count;
        if (this.isDefaultOnTableForm() && this.getAttr('limit')) {
            try {
                count = await this.database.queryScalar(context, this.getCountQuery(context), this.getParams(context));
                count = parseInt(count);
            } catch (err) {
                err.message = `${this.getFullName()}: ${err.message}`;
                throw err;
            }
        }
        return [rows, count];
    }

    async select(context) {
        if (this.getAccess(context).select !== true) throw new Error(`[${this.getFullName()}]: access denied`);

        // rows
        if (this.getAttr('limit')) {
            context.params.limit = parseInt(this.getAttr('limit'));
        }
        const query = this.isDefaultOnRowForm() ? this.getSingleQuery(context) : this.getMultipleQuery(context);
        const rows = await this.database.queryRows(context, query, this.getParams(context));
        for (let i = 0; i < rows.length; i++) {
            this.checkAndCalcColumns(rows[i]);
        }

        // count
        let count;
        if (this.isDefaultOnTableForm() && this.getAttr('limit')) {
            try {
                count = await this.database.queryScalar(context, this.getCountQuery(context), this.getParams(context));
                count = parseInt(count);
            } catch (err) {
                err.message = `${this.getFullName()}: ${err.message}`;
                throw err;
            }
        }
        return [rows, count];
    }

    async update(context) {
        console.log('SqlDataSource.update');
        if (this.getAccess(context).update !== true) throw new Error(`[${this.getFullName()}]: access denied.`);
        if (!this.table) throw new Error(`no database table desc: ${this.getAttr('table')}`);
        const { changes } = context.body;
        // console.log('changes:', changes);
        const key = Object.keys(changes)[0];
        const where = this.getKeyValuesFromKey(key);
        const values = changes[key];
        const query = this.database.getUpdateQuery(this.getAttr('table'), values, where);
        const _values = qforms.Helper.mapObject(values, (name, value) => [`val_${name}`, value]);
        const _where = qforms.Helper.mapObject(where, (name, value) => [`key_${name}`, value]);
        const params = {..._values, ..._where};
        await this.database.queryResult(context, query, params);

        // get updated row
        const newKey = this.calcNewKey(key, values);
        const newKeyParams = DataSource.keyToParams(newKey);
        console.log('key:', key);
        console.log('newKey:', newKey);
        console.log('newKeyParams:', newKeyParams);

        const singleQuery = this.getSingleQuery(context);
        // console.log('singleQuery:', singleQuery);
        const [row] = await this.database.queryRows(context, singleQuery, newKeyParams);
        if (!row) throw new Error('singleQuery does not return row');
        this.checkAndCalcColumns(row);
        // console.log('row:', row);
        return {[key]: row};
    }

    async getBuffer(context, file) {
        return file.data;
    }

    async insert(context) {
        console.log('SqlDataSource.insert');
        if (!this.table) throw new Error(`${this.getFullName()}: no link to table object: ${this.getAttr('table')}`);
        if (this.getAccess(context).insert !== true) throw new Error(`[${this.getFullName()}]: access denied.`);

        // autoColumns
        const autoColumns = this.getAutoColumns();
        console.log('autoColumns:', autoColumns);

        const values = await this.database.insertRow(context, this.getAttr('table'), autoColumns, context.row);
        console.log('values:', values);

        const key = this.getKeyFromValues(values);
        if (!key) throw new Error('insert: cannot calc row key');
        console.log('key:', key);

        const keyParams = DataSource.keyToParams(key);
        // console.log('keyParams:', keyParams);

        const singleQuery = this.getSingleQuery(context);
        // console.log('singleQuery:', singleQuery);

        // row
        const [row] = await this.database.queryRows(context, singleQuery, keyParams);
        if (!row) throw new Error('singleQuery does not return row');
        this.checkAndCalcColumns(row);
        // console.log('row:', row);

        return {[key]: row};
    }

    async delete(context) {
        if (this.getAccess(context).delete !== true) throw new Error(`${this.getFullName()}: access denied`);
        const row = context.row;
        const keyValues = this.getKeyValuesFromRow(row);
        const query = this.database.getDeleteQuery(this.getAttr('table'), keyValues);
        await this.database.queryResult(context, query, row);
    }

    async fill(context) {
        //console.log('SqlDataSource.fill', this.name);
        let data = await super.fill(context);
        delete data.query;
        delete data.limit;
        data.keyColumns = this.keyColumns;
        if (this.parentKeyColumns.length > 0) {
            data.parentKeyColumns = this.parentKeyColumns;
        }

        // if form data source named default then check mode
        if (this.form && this.name === 'default' && context.newMode) {
            data.rows = [];
            return data;
        }
        if (this.getAttr('limit')) {
            context.params.offset = 0;
        }
        if (this.isDefaultOnRowForm()) {
            const row = await this.selectSingle(context);
            if (!row) throw new Error(`${this.getFullName()}: RowForm single query must return row`);
            data.rows = [row];
        } else {
            try {
                const [rows, count] = await this.selectMultiple(context);
                data.rows = rows;
                data.count = count;
            } catch (err) {
                err.message = `selectMultiple error of ${this.getFullName()}: ${err.message}`;
                throw err;
            }
        }

        if (this.isDefaultOnRowForm() && data.rows[0]) {
            this.form.dumpRowToParams(data.rows[0], context.querytime.params);
        }
        if (this.getAttr('limit')) {
            data.limit = context.params.limit;
        }
        return data;
    }

    isDefaultOnRowForm() {
        return this.form && this.form instanceof qforms.RowForm && this.name === 'default';
    }

    isDefaultOnTableForm() {
        return this.form && this.form instanceof qforms.TableForm && this.name === 'default';
    }

    getDatabase() {
        const databaseName = this.getAttr('database');
        if (!databaseName) throw new Error(`${this.getFullName()}: no database name`);
        return this.getApp().getDatabase(databaseName);
    }

    getTable() {
        const tableName = this.getAttr('table');
        if (!tableName) throw new Error(`${this.getFullName()}: no table name`);
        return this.database.getTable(tableName);
    }

    getAutoColumns() {
        return this.keyColumns.filter(name => this.table.columns[name].isAuto());
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
