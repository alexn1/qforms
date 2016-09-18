'use strict';

module.exports = RowFormController;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');

var FormController = require('../FormController');

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

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
RowFormController.create = function(data, parent, callback) {
    callback(new RowFormController(data, parent));
};
*/

////////////////////////////////////////////////////////////////////////////////////////////////////
RowFormController.create2 = function(data, parent) {
    return Promise.resolve(new RowFormController(data, parent));
};