'use strict';

module.exports = TreeForm;

var util = require('util');
var path = require('path');

var Form = require('../Form');
var app  = require('../../../../qforms');

util.inherits(TreeForm, Form);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TreeForm(data, parent) {
    TreeForm.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        app.get('public'),
        'viewer/class/Controller/ModelController/FormController/TreeFormController/view',
        this.constructor.name + 'View.ejs'
    );
};