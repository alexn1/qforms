'use strict';

module.exports = SqlDataAdapter;

var util   = require('util');
var mysql  = require('mysql');

var helper      = require('../../../common/helper');
var DataAdapter = require('../DataAdapter');

util.inherits(SqlDataAdapter, DataAdapter);

////////////////////////////////////////////////////////////////////////////////////////////////////
function SqlDataAdapter(dataSource) {
    SqlDataAdapter.super_.call(this, dataSource);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
SqlDataAdapter.prototype._query = function(query, params, callback, select) {
    select = select !== undefined ? select : false;
    console.log({dsName: this.dataSource.name, query: query, params: params});
    this.dataSource.getPool().getConnection(function(err, cnn) {
        if (err) {
            throw err;
        } else {
            cnn.query({sql:query,typeCast:helper.typeCast,nestTables: true}, params, function(err, result, fields) {
                cnn.release();
                if (err) {
                    throw err;
                } else {
                    if (select) {
                        // for dublicate column names
                        var fieldCount = {};
                        for (var j=0;j<fields.length;j++) {
                            var f = fields[j];
                            if (!fieldCount[f.name]) {
                                fieldCount[f.name] = 0;
                            }
                            fieldCount[f.name]++;
                            f.numb = fieldCount[f.name] - 1;
                        }
                        var rows = [];
                        for (var i=0; i<result.length; i++) {
                            var r = result[i];
                            var row = {};
                            for (var j=0; j<fields.length; j++) {
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