'use strict';

const Model = require('../Model');
const Param = require('../Param/Param');
const BaseModel = require('../../../common/BaseModel');
const qforms = require('../../../qforms');

class Database extends Model {

    constructor(data, parent) {
        //console.log('Database.constructor');
        super(data, parent);
        this.createCollections  = ['tables'];
        this.fillCollections    = ['tables'];
        this.tables = {};
    }

    static create(data, parent) {
        console.log('Database.create', BaseModel.getClassName(data), BaseModel.getName(data));
        const className = BaseModel.getClassName(data);
        return eval(`new qforms.${className}(data, parent)`);
    }

    async deinit() {
        throw new Error('Database.deinit not implemented');
    }

    async getConnection(context) {
        throw new Error('Database.getConnection not implemented');
    }

    async queryResult(context, query, params) {
        throw new Error('Database.queryResult not implemented');
    }

    async queryRows(context, query, params) {
        throw new Error('Database.queryRows not implemented');
    }

    async queryScalar(context, query, params) {
        const [row] = await this.queryRows(context, query, params);
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

    getUpdateQuery(tableName, values, where) {
        console.log('Database.getUpdateQuery', tableName);
        const valueKeys = Object.keys(values);
        const whereKeys = Object.keys(where);
        if (valueKeys.length === 0) throw new Error('getUpdateQuery: no values');
        if (whereKeys.length === 0) throw new Error('getUpdateQuery: no where');
        const valuesString = valueKeys.map(name => `${name} = {val_${name}}`).join(', ');
        const whereString = whereKeys.map(name => `${name} = {key_${name}}`).join(' and ');
        return `update ${tableName} set ${valuesString} where ${whereString}`;
    }

    getInsertQuery(tableName, values) {
        console.log('Database.getInsertQuery');
        const columns = Object.keys(values);
        const columnsString = columns.join(', ');
        const valuesString = columns.map(column => `{${column}}`).join(', ');
        const query = `insert into ${tableName}(${columnsString}) values (${valuesString})`;
        // console.log('query:', query);
        return query;
    }

    getDeleteQuery(tableName, rowKeyValues) {
        console.log('Database.getDeleteQuery');
        const keyColumns = Object.keys(rowKeyValues);
        const whereString = keyColumns.map(keyColumn => `${keyColumn} = {${keyColumn}}`).join(' and ');
        const query = `delete from ${tableName} where ${whereString}`;
        // console.log('query:', query);
        return query;
    }

    createParam(name) {
        return new Param(this.getData('params', name), this);
    }

    getConfig() {
        const portParam = this.isData('params', 'port') ?  this.createParam('port') : null;
        return {
            host       : this.createParam('host').getValue(),
            port       : portParam ? portParam.getValue() : this.getDefaultPort(),
            user       : this.createParam('user').getValue(),
            database   : this.createParam('database').getValue(),
            password   : this.createParam('password').getValue(),
        };
    }

    getDefaultPort() {
        return null;
    }

    getApp() {
        return this.parent;
    }

    getTable(name) {
        if (!name) throw new Error('getTable: no name');
        if (!this.tables[name]) throw new Error(`no table with name: ${name}`);
        return this.tables[name];
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
        if (notPassedParams.length > 0) throw new Error(`not passed params: ${notPassedParams.join(',')}`);
    }
}

module.exports = Database;
