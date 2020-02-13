'use strict';

module.exports = MySqlDatabase;

var util    = require('util');
var Promise = require('bluebird');

var qforms    = require('../../../../../qforms');
var Database  = require('../Database');

util.inherits(MySqlDatabase, Database);

////////////////////////////////////////////////////////////////////////////////////////////////////
MySqlDatabase.create = function(data, parent) {
    console.log('MySqlDatabase.create');
    return Promise.resolve(new MySqlDatabase(data, parent));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
function MySqlDatabase(data, parent) {
    var self = this;
    MySqlDatabase.super_.call(self, data, parent);
}
