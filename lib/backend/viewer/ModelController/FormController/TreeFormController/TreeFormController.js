'use strict';

module.exports = TreeForm;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Form   = require('../FormController');

util.inherits(TreeForm, Form);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TreeForm(data, parent) {
    TreeForm.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FormController/TreeFormController/view',
        this.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeForm.create2 = function(data, parent) {
    return Promise.resolve(new TreeForm(data, parent));
};