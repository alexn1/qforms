'use strict';

module.exports = TableFormController;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Form   = require('../FormController');

util.inherits(TableFormController, Form);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TableFormController(data, parent) {
    TableFormController.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FormController/TableFormController/view',
        this.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.create2 = function(data, parent) {
    return Promise.resolve(new TableFormController(data, parent));
};