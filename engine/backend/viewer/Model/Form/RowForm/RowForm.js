'use strict';

module.exports = RowForm;

var util = require('util');
var path = require('path');

var Form = require('../Form');
var app  = require('../../../../qforms');

util.inherits(RowForm, Form);

////////////////////////////////////////////////////////////////////////////////////////////////////
function RowForm(data, parent) {
    RowForm.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        app.get('public'),
        'viewer/class/Controller/ModelController/FormController/RowFormController/view',
        this.constructor.name + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
RowForm.create = function(data, parent, callback) {
    callback(new RowForm(data, parent));
};