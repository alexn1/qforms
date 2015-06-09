'use strict';

module.exports = TextAreaField;

var util = require('util');
var path = require('path');

var Field = require('../Field');
var app   = require('../../../../qforms');

util.inherits(TextAreaField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TextAreaField(data, parent) {
    TextAreaField.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        app.get('public'),
        'viewer/class/Controller/ModelController/FieldController/TextAreaFieldController/view',
        this.parent.constructor.name + this.constructor.name + 'View.ejs'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TextAreaField.create = function(data, parent, callback) {
    callback(new TextAreaField(data, parent));
};