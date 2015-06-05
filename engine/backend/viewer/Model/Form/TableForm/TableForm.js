'use strict';

module.exports = TableForm;

var util = require('util');
var path = require('path');

var Form = require('../Form');
var app  = require('../../../../qforms');

util.inherits(TableForm, Form);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TableForm(data, parent) {
    TableForm.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        app.get('public'),
        'viewer/class/Controller/ModelController/FormController/TableFormController/view',
        this.constructor.name + 'View.ejs'
    );
};