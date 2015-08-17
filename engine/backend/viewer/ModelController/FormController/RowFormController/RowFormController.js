'use strict';

module.exports = RowFormController;

var util = require('util');
var path = require('path');

var FormController = require('../FormController');
var server            = require('../../../../server');

util.inherits(RowFormController, FormController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function RowFormController(data, parent) {
    RowFormController.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FormController/RowFormController/view',
        this.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
RowFormController.create = function(data, parent, callback) {
    callback(new RowFormController(data, parent));
};