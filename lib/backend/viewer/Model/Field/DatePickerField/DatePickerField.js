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
    var self = this;
    DatePickerField.super_.call(self, data, parent);
    self.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/DatePickerFieldController/view',
        self.parent.data['@class'] + self.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
DatePickerField.create2 = function(data, parent) {
    return Promise.resolve(new DatePickerField(data, parent));
};