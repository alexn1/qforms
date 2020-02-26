'use strict';

var util    = require('util');
var Promise = require('bluebird');

var Model  = require('../Model');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Database extends Model {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(data, parent) {
        super(data, parent);
        //console.log('new Database');
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static create(data, parent) {
        throw new Error('Database.create not implemented');
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async deinit() {
        throw new Error('Database.prototype.deinit not implemented');
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async getConnection(context) {
        throw new Error('Database.prototype.getConnection not implemented');
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async query(context, query, params, nest) {
        throw new Error('Database.prototype.query not implemented');
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async beginTransaction(cnn) {
        throw new Error('Database.prototype.beginTransaction not implemented');
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async commit(cnn) {
        throw new Error('Database.prototype.commit not implemented');
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async rollback(cnn, err) {
        throw new Error('Database.prototype.rollback not implemented');
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    desc(context, table) {
        throw new Error('Database.prototype.desc not implemented');
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getUpdateQuery(tableName, values, where) {
        console.log('Database.prototype.getUpdateQuery', tableName);
        var valueKeys = Object.keys(values);
        var whereKeys = Object.keys(where);
        var valuesString = valueKeys.map(name => `${name} = {${name}}`).join(', ');
        var whereString = whereKeys.map(name => `${name} = {${name}}`).join(' and ');
        return `update ${tableName} set ${valuesString} where ${whereString}`;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getInsertQuery(tableName, values) {
        console.log('Database.prototype.getInsertQuery');
        var columns = Object.keys(values);
        const columnsString = columns.join(', ');
        const valuesString = columns.map(column => `{${column}}`).join(', ');
        const myQuery = `insert into ${tableName}(${columnsString}) values (${valuesString})`;
        console.log('myQuery:', myQuery);
        return myQuery;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getDeleteQuery(tableName, rowKeyValues) {
        console.log('Database.prototype.getDeleteQuery');
        const keyColumns = Object.keys(rowKeyValues);
        const whereString = keyColumns.map(keyColumn => `${keyColumn} = {${keyColumn}}`).join(' and ');
        const query = `delete from ${tableName} where ${whereString}`;
        console.log('query:', query);
        return query;
    }

}

module.exports = Database;