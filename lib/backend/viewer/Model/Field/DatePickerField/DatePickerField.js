'use strict';

module.exports = DatePickerField;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Field  = require('../Field');

util.inherits(DatePickerField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DatePickerField(data, parent) {
    DatePickerField.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/DatePickerFieldController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
DatePickerField.create2 = function(data, parent) {
    return Promise.resolve(new DatePickerField(data, parent));
};