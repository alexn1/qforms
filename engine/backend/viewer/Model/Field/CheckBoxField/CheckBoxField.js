"use strict"

var util = require('util');
var path = require('path');
var Field = require('../Field');
var app = require('../../../../qforms');
util.inherits(CheckBoxField, Field);
module.exports = CheckBoxField;

////////////////////////////////////////////////////////////////////////////////////////////////////
function CheckBoxField(data, parent) {
    CheckBoxField.super_.prototype.constructor.call(this, data, parent);
    this.viewFilePath = path.join(
        app.get('public'),
        'viewer/class/Controller/ModelController/FieldController/CheckBoxFieldController/view',
        this.parent.constructor.name + this.constructor.name + 'View.ejs'
    );
};