'use strict';

module.exports = TreeForm;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Form   = require('../Form');

util.inherits(TreeForm, Form);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TreeForm(data, parent) {
    var self = this;
    TreeForm.super_.call(self, data, parent);
    self.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FormController/TreeFormController/view',
        self.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeForm.create2 = function(data, parent) {
    return Promise.resolve(new TreeForm(data, parent));
};