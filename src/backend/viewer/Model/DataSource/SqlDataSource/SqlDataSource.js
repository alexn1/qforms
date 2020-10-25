'use strict';

const path       = require('path');
const qforms     = require('../../../../qforms');
const DataSource = require('../DataSource');
const BaseModel  = require('../../../../common/BaseModel');

class SqlDataSource extends DataSource {

    constructor(data, parent) {
        super(data, parent);
        this.table = this.getAttr('table') ? this.getDatabase().getTable(this.getAttr('table')) : null;
    }

    static async create(data, parent) {
        if (parent instanceof qforms.Form) {
            const form = parent;
            const name = BaseModel.getName(data);
            const customClassFilePath = path.join(
                form.getPage().getApp().getDirPath(),
                'pages',
                form.getPage().getName(),
                'forms',
                form.getName(),
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
        // console.log('SqlDataSource.getKeyColumns', this.getFullName());
        return this.table ? this.table.getKeyColumns() : super.getKeyColumns();
    }

    getCountQuery(context) {
        const countQuery = this.getAttr('countQuery');
        if (!countQuery) throw new Error(`no countQuery: ${this.getFullName()}`);
        return this.parent instanceof qforms.Form ? this.parent.replaceThis(context, countQuery) : countQuery;
    }

    getSingleQuery(context) {
        const singleQuery = this.getAttr('singleQuery');
        if (!singleQuery) throw new Error(`no singleQuery: ${this.getFullName()}`);
        return this.parent instanceof qforms.Form ? this.parent.replaceThis(context, singleQuery) : singleQuery;
    }

    getMultipleQuery(context) {
        const multipleQuery = this.getAttr('multipleQuery');
        if (!multipleQuery) throw new Error(`no multipleQuery: ${this.getFullName()}`);
        return this.parent instanceof qforms.Form ? this.parent.replaceThis(context, multipleQuery) : multipleQuery;
    }

    async selectSingle(context) {
        // console.log('SqlDataSource.selectSingle');
        if (this.getAccess(context).select !== true) throw new Error(`[${this.getFullName()}]: access denied`);
        const rows = await this.getDatabase().queryRows(context, this.getSingleQuery(context), this.getParams(context));
        if (rows.length > 1) throw new Error(`single query must return single row: ${this.getFullName()}`);
        this.prepareRows(rows);
        return rows[0] || null;
    }

    async selectMultiple(context) {
        // console.log('SqlDataSource.selectMultiple');
        if (this.getAccess(context).select !== true) throw new Error(`[${this.getFullName()}]: access denied`);

        // rows
        if (this.getAttr('limit')) {
            if (!context.params.frame) throw new Error('no frame param');
            const limit = parseInt(this.getAttr('limit'));
            context.params.offset = (context.params.frame - 1) * limit;
            context.params.limit = limit;
        }
        const rows = await this.getDatabase().queryRows(context, this.getMultipleQuery(context), this.getParams(context));
        this.prepareRows(rows);

        // count
        let count;
        if (this.isDefaultOnTableForm() && this.getAttr('countQuery')) {
            try {
                count = await this.getDatabase().queryScalar(context, this.getCountQuery(context), this.getParams(context));
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
            if (!context.params.frame) throw new Error('no frame param');
            const limit = parseInt(this.getAttr('limit'));
            context.params.offset = (context.params.frame - 1) * limit;
            context.params.limit = limit;
        }
        const query = this.isDefaultOnRowForm() ? this.getSingleQuery(context) : this.getMultipleQuery(context);
        const rows = await this.getDatabase().queryRows(context, query, this.getParams(context));
        this.prepareRows(rows);

        // count
        let count;
        if (this.isDefaultOnTableForm() && this.getAttr('limit')) {
            try {
                count = await this.getDatabase().queryScalar(context, this.getCountQuery(context), this.getParams(context));
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
        const changes = context.changes;
        // console.log('changes:', changes);
        const key = Object.keys(changes)[0];
        const where = this.getKeyValuesFromKey(key);
        const values = changes[key];
        const query = this.getDatabase().getUpdateQuery(this.getAttr('table'), values, where);
        const _values = qforms.Helper.mapObject(values, (name, value) => [`val_${name}`, value]);
        const _where = qforms.Helper.mapObject(where, (name, value) => [`key_${name}`, value]);
        const params = {..._values, ..._where};
        await this.getDatabase().queryResult(context, query, params);

        // get updated row
        const newKey = this.calcNewKey(key, values);
        const newKeyParams = DataSource.keyToParams(newKey);
        console.log('key:', key);
        console.log('newKey:', newKey);
        console.log('newKeyParams:', newKeyParams);

        const singleQuery = this.getSingleQuery(context);
        // console.log('singleQuery:', singleQuery);
        const [row] = await this.getDatabase().queryRows(context, singleQuery, newKeyParams);
        if (!row) throw new Error('singleQuery does not return row');
        this.prepareRows([row]);
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
        const autoTypes = this.getAutoTypes();
        console.log('autoTypes:', autoTypes);

        const values = await this.getDatabase().insertRow(context, this.getAttr('table'), autoColumns, context.row, autoTypes);
        console.log('values:', values);

        const key = this.getKeyFromValues(values);
        if (!key) throw new Error('insert: cannot calc row key');
        console.log('key:', key);

        const keyParams = DataSource.keyToParams(key);
        // console.log('keyParams:', keyParams);

        const singleQuery = this.getSingleQuery(context);
        // console.log('singleQuery:', singleQuery);

        // row
        const [row] = await this.getDatabase().queryRows(context, singleQuery, keyParams);
        if (!row) throw new Error('singleQuery does not return row');
        this.prepareRows([row]);
        // console.log('row:', row);

        return {[key]: row};
    }

    async delete(context) {
        if (this.getAccess(context).delete !== true) throw new Error(`${this.getFullName()}: access denied`);
        // const keyValues = this.getKeyValuesFromRow(context.row);
        const keyValues = this.getKeyValuesFromKey(context.params.key);
        const query = this.getDatabase().getDeleteQuery(this.getAttr('table'), keyValues);
        // await this.getDatabase().queryResult(context, query, row);
        await this.getDatabase().queryResult(context, query, keyValues);
    }

    async fill(context) {
        //console.log('SqlDataSource.fill', this.getFullName());
        let data = await super.fill(context);
        delete data.singleQuery;
        delete data.multipleQuery;
        delete data.countQuery;
        delete data.limit;

        // if form data source named default then check mode
        if (this.parent instanceof qforms.Form && this.getName() === 'default' && context.newMode) {
            data.rows = [];
            return data;
        }
        if (this.getAttr('limit')) {
            context.params.frame = 1;
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
            this.parent.dumpRowToParams(data.rows[0], context.querytime.params);
        }
        if (this.getAttr('limit')) {
            data.limit = context.params.limit;
        }
        return data;
    }

    async getRows() {
        return null;
    }

    isDefaultOnRowForm() {
        return /*this.form && */this.parent instanceof qforms.RowForm && this.getName() === 'default';
    }

    isDefaultOnTableForm() {
        return /*this.form && */this.parent instanceof qforms.TableForm && this.getName() === 'default';
    }

    getDatabase() {
        const databaseName = this.getAttr('database');
        if (!databaseName) throw new Error(`${this.getFullName()}: no database name`);
        return this.getApp().getDatabase(databaseName);
    }

    getTable() {
        const tableName = this.getAttr('table');
        if (!tableName) throw new Error(`${this.getFullName()}: no table name`);
        return this.getDatabase().getTable(tableName);
    }

    getAutoColumns() {
        return this.keyColumns.filter(name => this.table.columns[name].isAuto());
    }

    getAutoTypes() {
        const columns = this.getAutoColumns();
        return columns.reduce((acc, column) => {
            acc[column] = this.table.columns[column].getAttr('type');
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
