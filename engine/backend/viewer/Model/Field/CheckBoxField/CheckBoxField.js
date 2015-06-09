'use strict';

module.exports = CheckBoxField;

var util = require('util');
var path = require('path');

var Field = require('../Field');
var app   = require('../../../../qforms');

util.inherits(CheckBoxField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function CheckBoxField(data, parent) {
    CheckBoxField.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        app.get('public'),
        'viewer/class/Controller/ModelController/FieldController/CheckBoxFieldController/view',
        this.parent.constructor.name + this.constructor.name + 'View.ejs'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
CheckBoxField.create = function(data, parent, callback) {
    callback(new CheckBoxField(data, parent));
};