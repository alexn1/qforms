'use strict';

module.exports = TableFormController;

var util = require('util');
var path = require('path');

var FormController = require('../FormController');
var server            = require('../../../../server');

util.inherits(TableFormController, FormController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TableFormController(data, parent) {
    TableFormController.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FormController/TableFormController/view',
        this.data['@class'] + 'View.ejs'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormController.create = function(data, parent, callback) {
    callback(new TableFormController(data, parent));
};