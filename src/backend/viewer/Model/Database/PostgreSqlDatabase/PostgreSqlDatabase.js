'use strict';

module.exports = PostgreSqlDatabase;

var util    = require('util');
var Promise = require('bluebird');
const { Pool } = require('pg');

var qforms    = require('../../../../../qforms');
var Database  = require('../Database');

util.inherits(PostgreSqlDatabase, Database);

////////////////////////////////////////////////////////////////////////////////////////////////////
PostgreSqlDatabase.create = function(data, parent) {
    console.log('PostgreSqlDatabase.create');
    return Promise.resolve(new PostgreSqlDatabase(data, parent));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function PostgreSqlDatabase(data, parent) {
    var self = this;
    console.log('new PostgreSqlDatabase');
    PostgreSqlDatabase.super_.call(self, data, parent);
    self.pool = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
PostgreSqlDatabase.prototype.deinit = function() {
    var self = this;
    console.log('PostgreSqlDatabase.prototype.deinit: ' + self.name);
    return Promise.try(function () {
        if (self.pool !== null) {
            return self.pool.end();
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PostgreSqlDatabase.prototype._getPool = function(databaseName) {
    var self = this;
    console.log('PostgreSqlDatabase.prototype._getPool');
    if (self.pool === null) {
        const config = {
            host       : self.data.params.host['@attributes'].value,
            port       : self.data.params.port ? self.data.params.port['@attributes'].value : 5432,
            user       : self.data.params.user['@attributes'].value,
            database   : self.data.params.database['@attributes'].value,
            password   : self.data.params.password['@attributes'].value,
        };
        console.log('creating connection pool for: ' + databaseName, config);
        self.pool = new Pool(config);
    }
    return self.pool;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PostgreSqlDatabase.prototype.getConnection = function(context) {
    var self = this;
    console.log('PostgreSqlDatabase.prototype.getConnection');
    return Promise.try(function () {
        if (context.connections[self.name]) {
            return context.connections[self.name];
        } else {
            return context.connections[self.name] = self._getPool(self.name);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PostgreSqlDatabase.prototype.query = function(context, query, params, nest) {
    var self = this;
    console.log('PostgreSqlDatabase.prototype.query');
    console.log('query:', query);
    console.log('params:', params);
    // if (process.env.NODE_ENV === 'development') {
    //     console.log('PostgreSqlDatabase.prototype.query', query, params);
    // }
    nest = (nest !== undefined) ? nest : true;
    return self.getConnection(context).then(function (cnn) {
        const {sql, values} = PostgreSqlDatabase.formatQuery(query, params);
        console.log('sql:', sql);
        console.log('values:', values);
        return cnn.query(sql, values).then(function (result) {
            for (let i = 0; i < result.rows.length; i++) {
                PostgreSqlDatabase.checkRow(result.rows[i]);
            }
            // console.log('rows:', result.rows);
            return result.rows;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PostgreSqlDatabase.checkRow = function (row) {
    // console.log('PostgreSqlDatabase.checkRow', row);
    for (const column in row) {
        if (row[column] !== null && /*!Array.isArray(row[column]) &&*/ typeof row[column] === 'object' && !(row[column] instanceof Date)) {
            row[column] = JSON.stringify(row[column], null, 4);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PostgreSqlDatabase.prototype.beginTransaction = function(cnn) {
    console.log('PostgreSqlDatabase.prototype.beginTransaction');
    return Promise.try(function () {
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PostgreSqlDatabase.prototype.commit = function (cnn) {
    console.log('PostgreSqlDatabase.prototype.commit');
    return Promise.try(function () {
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PostgreSqlDatabase.prototype.rollback = function (cnn, err) {
    console.log('PostgreSqlDatabase.prototype.rollback');
    return Promise.try(function () {
        throw err;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PostgreSqlDatabase.formatQuery = function (query, params) {
    console.log(`PostgreSqlDatabase.formatQuery: ${query}`);
    console.log('params:', params);
    if (!params) {
        return {sql: query, values: null};
    }
    const items = query.match(/\{([\w\.@]+)\}/g);
    if (!items) {
        return {sql: query, values: null};
    }
    // console.log('items:', items);
    const usedValues = items.map(str => str.substr(1, str.length-2));
    // console.log('usedValues:', usedValues);
    const keys = Object.keys(params).filter(key => usedValues.indexOf(key) > -1);
    // console.log('keys:', keys);
    const values = keys.map(key => params[key]);
    const sql =  query.replace(/\{([\w\.@]+)\}/g, (text, name) => {
        if (keys.indexOf(name) > -1) {
            return `$${keys.indexOf(name) + 1}`;
        }
        return `{${name}}`;
    });
    return {sql, values};
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PostgreSqlDatabase.prototype.desc = function(context, table) {
    var self = this;
    console.log('PostgreSqlDatabase.prototype.desc', table);
    return Promise.try(function () {
        var desc = {};
        var aiFieldName = 'id';
        var query = `select column_name from INFORMATION_SCHEMA.COLUMNS where table_name = '${table}';`;
        return self.query(context, query, null, true).then(function(rows) {
            rows.forEach(function(info) {
                desc[info.column_name] = info;
                // if (info.Extra === 'auto_increment') {
                //     aiFieldName = info.Field;
                // }
            });
            console.log('desc:', desc);
            console.log('aiFieldName:', aiFieldName);
            return [desc, aiFieldName];
        });
    });
};