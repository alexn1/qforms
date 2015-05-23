"use strict"

module.exports = TextBoxField;

var util = require('util');
var path = require('path');

var Field  = require('../Field');
var qforms = require('../../../../qforms');

util.inherits(TextBoxField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TextBoxField(data, parent) {
    TextBoxField.super_.prototype.constructor.call(this, data, parent);
    this.viewFilePath = path.join(
        qforms.get('public'),
        'viewer/class/Controller/ModelController/FieldController/TextBoxFieldController/view',
        this.parent.constructor.name + this.constructor.name + 'View.ejs'
    );
};