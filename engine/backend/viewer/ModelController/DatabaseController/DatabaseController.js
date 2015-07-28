'use strict';

module.exports = DatabaseController;

var util  = require('util');
var mysql = require('mysql');

var helper          = require('../../../common/helper');
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
DatabaseController.prototype._getPool = function() {
    if (this.pool === null) {
        //console.log('creating connection pool for: ' + database);
        this.pool = mysql.createPool({
            host        : this.data.params.host['@attributes'].value,
            user        : this.data.params.user['@attributes'].value,
            database    : this.data.params.database['@attributes'].value,
            password    : this.data.params.password['@attributes'].value,
            queryFormat : helper.queryFormat
        });
    }
    //console.log('mysql pool connections count: ' + this.pool._allConnections.length);
    return this.pool;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatabaseController.prototype.query = function(query, params, callback, select) {
    select = (select !== undefined) ? select : true;
    this._getPool().getConnection(function(err, cnn) {
        if (err) {
            throw err;
        } else {
            cnn.query({sql: query, typeCast: helper.typeCast, nestTables: true}, params, function(err, result, fields) {
                cnn.release();
                if (err) {
                    throw err;
                } else {
                    if (select) {
                        // for dublicate column names
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
                        callback(rows);
                    } else {
                        callback(result);
                    }
                }
            });
        }
    });
};