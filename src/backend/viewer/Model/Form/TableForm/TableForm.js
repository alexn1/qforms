'use strict';

module.exports = TableForm;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Form   = require('../Form');

util.inherits(TableForm, Form);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TableForm(data, parent) {
    var self = this;
    TableForm.super_.call(self, data, parent);
    self.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FormController/TableFormController/view',
        self.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TableForm.create = function(data, parent) {
    return Promise.resolve(new TableForm(data, parent));
};