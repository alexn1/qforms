'use strict';

module.exports = LabelField;

var util = require('util');
var path = require('path');

var Field = require('../Field');
var app   = require('../../../../qforms');

util.inherits(LabelField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function LabelField(data, parent) {
    LabelField.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        app.get('public'),
        'viewer/class/Controller/ModelController/FieldController/LabelFieldController/view',
        this.parent.constructor.name + this.constructor.name + 'View.ejs'
    );
};