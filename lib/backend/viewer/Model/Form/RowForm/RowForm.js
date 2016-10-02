'use strict';

module.exports = RowForm;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Form   = require('../Form');

util.inherits(RowForm, Form);

////////////////////////////////////////////////////////////////////////////////////////////////////
function RowForm(data, parent) {
    var self = this;
    RowForm.super_.call(self, data, parent);
    self.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FormController/RowFormController/view',
        self.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
RowForm.create2 = function(data, parent) {
    return Promise.resolve(new RowForm(data, parent));
};