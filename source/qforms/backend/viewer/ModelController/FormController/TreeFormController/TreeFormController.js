'use strict';

module.exports = TreeFormController;

var util = require('util');
var path = require('path');

var server = require('../../../../../server');

var FormController = require('../FormController');

util.inherits(TreeFormController, FormController);

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
TreeFormController.create = function(data, parent, callback) {
    callback(new TreeFormController(data, parent));
};