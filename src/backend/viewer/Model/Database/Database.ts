import Model from '../Model';
import Param from '../Param/Param';
import Application from '../Application/Application';
import Table from '../Table/Table';
import Context from '../../../Context';

class Database extends Model {
    tables: Table[];
    constructor(data, parent?) {
        //console.log('Database.constructor');
        super(data, parent);
        this.fillCollections = ['tables'];
        this.tables          = [];
    }

    async init(context: Context) {
        await this.createColItems('tables', context);
    }

    async deinit() {
        throw new Error('Database.deinit not implemented');
    }

    async getConnection(context) {
        throw new Error('Database.getConnection not implemented');
    }

    async queryResult(context, query, params = null) {
        throw new Error('Database.queryResult not implemented');
    }

    async queryRows(context, query, params): Promise<any[]> {
        throw new Error('Database.queryRows not implemented');
    }

    async queryScalar(context, query, params) {
        const rows = await this.queryRows(context, query, params);
        const row = rows[0];
        if (!row) throw new Error(`queryScalar must return one row`);
        const [column] = Object.keys(row);
        if (!column) throw new Error('no column in result set');
        const value = row[column];
        if (value === undefined) throw new Error('scalar value undefined');
        return value;
    }

    async beginTransaction(cnn) {
        throw new Error('Database.beginTransaction not implemented');
    }

    async commit(cnn) {
        throw new Error('Database.commit not implemented');
    }

    async rollback(cnn, err) {
        throw new Error('Database.rollback not implemented');
    }

    getUpdateQuery(tableName, values, where): string {
        console.log('Database.getUpdateQuery', tableName);
        const valueKeys = Object.keys(values);
        const whereKeys = Object.keys(where);
        if (valueKeys.length === 0) throw new Error('getUpdateQuery: no values');
        if (whereKeys.length === 0) throw new Error('getUpdateQuery: no where');
        const valuesString = valueKeys.map(name => `${name} = {val_${name}}`).join(', ');
        const whereString = whereKeys.map(name => `${name} = {key_${name}}`).join(' and ');
        return `update ${tableName} set ${valuesString} where ${whereString}`;
    }

    getInsertQuery(tableName, values): string {
        console.log('Database.getInsertQuery');
        const columns = Object.keys(values);
        const columnsString = columns.join(', ');
        const valuesString = columns.map(column => `{${column}}`).join(', ');
        const query = `insert into ${tableName}(${columnsString}) values (${valuesString})`;
        // console.log('query:', query);
        return query;
    }

    getDeleteQuery(tableName, rowKeyValues): string {
        console.log('Database.getDeleteQuery');
        const keyColumns = Object.keys(rowKeyValues);
        const whereString = keyColumns.map(keyColumn => `${keyColumn} = {${keyColumn}}`).join(' and ');
        const query = `delete from ${tableName} where ${whereString}`;
        // console.log('query:', query);
        return query;
    }

    createParam(name): Param {
        return new Param(this.getColItemData('params', name), this);
    }

    getConfig(): any {
        const config: any = {
            host       : this.createParam('host').getValue(),
            database   : this.createParam('database').getValue(),
            user       : this.createParam('user').getValue(),
            password   : this.createParam('password').getValue(),
        };
        if (this.isData('params', 'port')) {
            config.port = this.createParam('port').getValue();
        }
        return config;
    }

    /*getDefaultPort(): number {
        return null;
    }*/

    getApp(): Application {
        return this.parent;
    }

    getTable(name): Table {
        if (!name) throw new Error('getTable: no name');
        const table = this.tables.find(table => table.getName() === name);
        if (!table) throw new Error(`no table with name: ${name}`);
        return table;
        // if (!this.tables[name]) throw new Error(`no table with name: ${name}`);
        // return this.tables[name];
    }

    static getUsedParams(query) {
        const items = query.match(/\{([\w\.@]+)\}/g);
        if (!items) return [];
        return items.map(str => str.substr(1, str.length-2));
    }

    static checkParams(query, params) {
        const usedParams = Database.getUsedParams(query);
        const paramNames = params ? Object.keys(params) : [];
        const notPassedParams = usedParams.filter(name => paramNames.indexOf(name) === -1);
        // console.log('notPassedParams:', notPassedParams);
        if (notPassedParams.length > 0) throw new Error(`not passed params: ${notPassedParams.join(',')}, passed: ${paramNames.join(',')}, query: ${query}`);
    }

    async insertRow(context, table, values, autoColumnTypes) {
        throw new Error('Database.insertRow not implemented');
    }
}

export = Database;
