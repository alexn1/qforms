'use strict';

module.exports = Database;

var util    = require('util');
var Promise = require('bluebird');
//var sqlish  = require('sqlish');

var Model  = require('../Model');

util.inherits(Database, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.create = function(data, parent) {
    throw new Error('Database.create not implemented');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function Database(data, parent) {
    var self = this;
    console.log('new Database');
    Database.super_.call(self, data, parent);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.deinit = function() {
    throw new Error('Database.prototype.deinit not implemented');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.getConnection = function(context) {
    throw new Error('Database.prototype.getConnection not implemented');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.query = function(context, query, params, nest) {
    throw new Error('Database.prototype.query not implemented');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.beginTransaction = function(cnn) {
    throw new Error('Database.prototype.beginTransaction not implemented');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.commit = function (cnn) {
    throw new Error('Database.prototype.commit not implemented');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.rollback = function (cnn, err) {
    throw new Error('Database.prototype.rollback not implemented');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.desc = function(context, table) {
    throw new Error('Database.prototype.desc not implemented');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.getUpdateQuery = function(tableName, values, where) {
    console.log('Database.prototype.getUpdateQuery', tableName);
    var self = this;
    var columns = Object.keys(values);
    var valuesString = columns.map(name => `${name} = {${name}}`).join(', ');
    var whereString = columns.map(name => `${name} = {${name}}`).join(' and ');
    return `UPDATE ${tableName} set ${valuesString} where ${whereString}`;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.getInsertQuery = function (tableName, values) {
    console.log('Database.prototype.getInsertQuery');
    //const query = new sqlish.Sqlish().insert(tableName, values).toString();
    //console.log('query:', query);
    //const query2 = query.replace(/"{/g,'{').replace(/}"/g,'}');
    //console.log('query2:', query2);

    var columns = Object.keys(values);
    const columnsString = columns.join(', ');
    const valuesString = columns.map(column => `{${column}}`).join(', ');
    const myQuery = `insert into ${tableName}(${columnsString}) values (${valuesString})`;
    console.log('myQuery:', myQuery);

    return myQuery;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.getDeleteQuery = function (tableName, rowKeyValues) {
    console.log('Database.prototype.getDeleteQuery');
    //var query = new sqlish.Sqlish().deleteFrom(tableName).where(rowKeyValues).toString();
    //console.log('query:', query);

    const columns = Object.keys(rowKeyValues);
    const whereString = columns.map(column => `${column} = {${column}}`).join(' and ');
    var query2 = `delete from ${tableName} where ${whereString}`;
    console.log('query2:', query2);

    return query2;
};