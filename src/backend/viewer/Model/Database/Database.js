'use strict';

module.exports = Database;

var util    = require('util');
var Promise = require('bluebird');

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
Database.prototype.getUpdateQuery = function(table, values, where) {
    throw new Error('Database.prototype.getUpdateQuery not implemented');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.getUpdateQuery = function(tableName, values, where) {
    console.log('Database.prototype.getUpdateQuery', tableName);
    var self = this;
    var valuesString = Object.keys(values).map(name => `${name} = {${name}}`).join(', ');
    var whereString = Object.keys(where).map(name => `${name} = {${name}}`).join(' and ');
    return `UPDATE ${tableName} set ${valuesString} where ${whereString}`;
};