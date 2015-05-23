"use strict"
module.exports = ComboBoxField;
var util = require('util');
var path = require('path');
var Field = require('../Field');
var app = require('../../../../qforms');
util.inherits(ComboBoxField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ComboBoxField(data, parent) {
    ComboBoxField.super_.prototype.constructor.call(this, data, parent);
    this.viewFilePath = path.join(
        app.get('public'),
        'viewer/class/Controller/ModelController/FieldController/ComboBoxFieldController/view',
        this.parent.constructor.name + this.constructor.name + 'View.ejs'
    );
};