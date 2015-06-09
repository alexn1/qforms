'use strict';

module.exports = DatePickerField;

var util = require('util');
var path = require('path');

var Field = require('../Field');
var app   = require('../../../../qforms');

util.inherits(DatePickerField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DatePickerField(data, parent) {
    DatePickerField.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        app.get('public'),
        'viewer/class/Controller/ModelController/FieldController/DatePickerFieldController/view',
        this.parent.constructor.name + this.constructor.name + 'View.ejs'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatePickerField.create = function(data, parent, callback) {
    callback(new DatePickerField(data, parent));
};