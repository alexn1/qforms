"use strict"

var util = require('util');
var path = require('path');
var Field = require('../Field');
var app = require('../../../../qforms');
util.inherits(DatePickerField, Field);
module.exports = DatePickerField;

////////////////////////////////////////////////////////////////////////////////////////////////////
function DatePickerField(data, parent) {
    DatePickerField.super_.prototype.constructor.call(this, data, parent);
    this.viewFilePath = path.join(
        app.get('public'),
        'viewer/class/Controller/ModelController/FieldController/DatePickerFieldController/view',
        this.parent.constructor.name + this.constructor.name + 'View.ejs'
    );
};