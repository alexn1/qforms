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
    TableForm.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FormController/TableFormController/view',
        this.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TableForm.create2 = function(data, parent) {
    return Promise.resolve(new TableForm(data, parent));
};