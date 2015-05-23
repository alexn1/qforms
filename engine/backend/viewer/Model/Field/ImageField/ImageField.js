"use strict"
module.exports = ImageField;
var util = require('util');
var path = require('path');
var Field = require('../Field');
var app = require('../../../../qforms');
util.inherits(ImageField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ImageField(data, parent) {
    ImageField.super_.prototype.constructor.call(this, data, parent);
    this.viewFilePath = path.join(
        app.get('public'),
        'viewer/class/Controller/ModelController/FieldController/ImageFieldController/view',
        this.parent.constructor.name + this.constructor.name + 'View.ejs'
    );
};