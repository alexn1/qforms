'use strict';

module.exports = DatabaseController;

var util  = require('util');
var mysql = require('mysql');

var qforms = require('../../../../qforms');

var ModelController = require('../ModelController');

util.inherits(DatabaseController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.create = function(data, parent, callback) {
    callback(new DatabaseController(data, parent));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function DatabaseController(data, parent) {
    DatabaseController.super_.call(this, data, parent);
    this.pool = null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.deinit = function(callback) {
    if (this.pool !== null) {
        this.pool.end(callback);
    } else {
        callback();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype._getPool = function() {
    if (this.pool === null) {
        //console.log('creating connection pool for: ' + database);
        this.pool = mysql.createPool({
            host        : this.data.params.host['@attributes'].value,
            port        : this.data.params.port ? this.data.params.port['@attributes'].value : 3306,
            user        : this.data.params.user['@attributes'].value,
            database    : this.data.params.database['@attributes'].value,
            password    : this.data.params.password['@attributes'].value,
            queryFormat : qforms.helper.queryFormat
        });
    }
    //console.log('mysql pool connections count: ' + this.pool._allConnections.length);
    return this.pool;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.getConnection = function(context, callback) {
    var self = this;
    if (context.connections[self.name] === undefined) {
        self._getPool().getConnection(function(err, cnn) {
            if (err) {
                throw err;
            } else {
                context.connections[self.name] = cnn;
                callback(context.connections[self.name]);
            }
        });
    } else {
        callback(context.connections[self.name]);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.query = function(context, query, params, callback, nest) {
    nest = (nest !== undefined) ? nest : true;
    var self = this;
    this.getConnection(context, function(cnn) {
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