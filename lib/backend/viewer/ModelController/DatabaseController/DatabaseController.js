'use strict';

module.exports = DatabaseController;

var util  = require('util');
var mysql = require('mysql');
var Promise = require('bluebird');

var qforms = require('../../../../qforms');

var ModelController = require('../ModelController');

util.inherits(DatabaseController, ModelController);

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.create = function(data, parent, callback) {
    callback(new DatabaseController(data, parent));
};
*/

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.create2 = function(data, parent) {
    return Promise.resolve(new DatabaseController(data, parent));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function DatabaseController(data, parent) {
    DatabaseController.super_.call(this, data, parent);
    this.pool = null;
}

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.deinit = function(callback) {
    var self = this;
    console.log('DatabaseController.prototype.deinit: ' + self.name);
    if (self.pool !== null) {
        self.pool.end(callback);
    } else {
        callback();
    }
};
*/

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.deinit2 = function() {
    var self = this;
    console.log('DatabaseController.prototype.deinit2: ' + self.name);
    return Promise.try(function () {
        if (self.pool !== null) {
            return new Promise(function (resolve) {
                self.pool.end(resolve);
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype._getPool = function() {
    var self = this;
    if (self.pool === null) {
        //console.log('creating connection pool for: ' + database);
        self.pool = mysql.createPool({
            host        : self.data.params.host['@attributes'].value,
            port        : self.data.params.port ? self.data.params.port['@attributes'].value : 3306,
            user        : self.data.params.user['@attributes'].value,
            database    : self.data.params.database['@attributes'].value,
            password    : self.data.params.password['@attributes'].value,
            queryFormat : qforms.helper.queryFormat
        });
    }
    //console.log('mysql pool connections count: ' + this.pool._allConnections.length);
    return self.pool;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.getConnection2 = function(context) {
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

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.query = function(context, query, params, callback, nest) {
    nest = (nest !== undefined) ? nest : true;
    var self = this;
    self.getConnection2(context).then(function (cnn) {
        cnn.query({sql: query, typeCast: qforms.helper.typeCast, nestTables: nest}, params, function(err, result, fields) {
            if (err) {
                throw err;
            } else {
                if (nest) {
                    // for dublicate column names
                    var rows = self._getRows(result, fields);
                    callback(rows);
                } else {
                    callback(result);
                }
            }
        });
    });
};
*/

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.query2 = function(context, query, params, nest) {
    var self = this;
    nest = (nest !== undefined) ? nest : true;
    return self.getConnection2(context).then(function (cnn) {
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
DatabaseController.prototype._getRows = function(result, fields) {
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