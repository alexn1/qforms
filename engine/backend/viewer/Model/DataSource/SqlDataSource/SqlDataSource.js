"use strict"

module.exports = SqlDataSource;

var util = require('util');

var DataSource     = require('../DataSource');
var SqlDataAdapter = require('../../../DataAdapter/SqlDataAdapter/SqlDataAdapter');

util.inherits(SqlDataSource, DataSource);

////////////////////////////////////////////////////////////////////////////////////////////////////
function SqlDataSource(data, parent) {
    SqlDataSource.super_.call(this, data, parent);
    this.dataAdapter = new SqlDataAdapter(this);
};