'use strict';

module.exports = Database;

var util    = require('util');
var mysql   = require('mysql');
var Promise = require('bluebird');

var qforms = require('../../../../qforms');
var Model  = require('../Model');

util.inherits(Database, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.create = function(data, parent) {
    return Promise.resolve(new Database(data, parent));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function Database(data, parent) {
    var self = this;
    Database.super_.call(self, data, parent);
    self.pool = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.deinit = function() {
    var self = this;
    console.log('DatabaseController.prototype.deinit: ' + self.name);
    return Promise.try(function () {
        if (self.pool !== null) {
            return new Promise(function (resolve) {
                self.pool.end(function () {
                    resolve();
                });
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype._getPool = function() {
    var self = this;
    if (self.pool === null) {
        //console.log('creating connection pool for: ' + database);
        self.pool = mysql.createPool({
            host       : self.data.params.host['@attributes'].value,
            port       : self.data.params.port ? self.data.params.port['@attributes'].value : 3306,
            user       : self.data.params.user['@attributes'].value,
            database   : self.data.params.database['@attributes'].value,
            password   : self.data.params.password['@attributes'].value,
            queryFormat: qforms.helper.queryFormat
        });
    }
    //console.log('mysql pool connections count: ' + this.pool._allConnections.length);
    return self.pool;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.getConnection = function(context) {
    var self = this;
    return new Promise(function (resolve, reject) {
        if (context.connections[self.name] === undefined) {
            self._getPool().getConnection(function(err, cnn) {
                if (err) {
                    reject(err);
                } else {
                    context.connections[self.name] = cnn;
                    resolve(context.connections[self.name]);
                }
            });
        } else {
            resolve(context.connections[self.name]);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.query = function(context, query, params, nest) {
    var self = this;
    nest = (nest !== undefined) ? nest : true;
    return self.getConnection(context).then(function (cnn) {
        return new Promise(function (resolve, reject) {
            cnn.query({sql: query, typeCast: qforms.helper.typeCast, nestTables: nest}, params, function(err, result, fields) {
                if (err) {
                    reject(err);
                } else {
                    if (nest) {
                        var rows = self._getRows(result, fields);   // for duplicate column names
                        resolve(rows);
                    } else {
                        resolve(result);
                    }
                }
            });
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype._getRows = function(result, fields) {
    var self = this;
    var fieldCount = {};
    for (var j = 0; j < fields.length; j++) {
        var f = fields[j];
        if (!fieldCount[f.name]) {
            fieldCount[f.name] = 0;
        }
        fieldCount[f.name]++;
        f.numb = fieldCount[f.name] - 1;
    }
    var rows = [];
    for (var i = 0; i < result.length; i++) {
        var r = result[i];
        var row = {};
        for (var j=0; j < fields.length; j++) {
            var f = fields[j];
            var column = f.name + (f.numb > 0 ? f.numb : '');
            row[column] = r[f.table][f.name];
        }
        rows.push(row);
    }
    return rows;
};