'use strict';

module.exports = TreeFormController;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Form   = require('../FormController');

util.inherits(TreeFormController, Form);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TreeFormController(data, parent) {
    TreeFormController.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FormController/TreeFormController/view',
        this.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeFormController.create2 = function(data, parent) {
    return Promise.resolve(new TreeFormController(data, parent));
};