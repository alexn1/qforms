'use strict';

module.exports = ComboBoxField;

var util = require('util');
var path = require('path');

var Field = require('../Field');
var app   = require('../../../../qforms');

util.inherits(ComboBoxField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ComboBoxField(data, parent) {
    ComboBoxField.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        app.get('public'),
        'viewer/class/Controller/ModelController/FieldController/ComboBoxFieldController/view',
        this.parent.constructor.name + this.constructor.name + 'View.ejs'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxField.create = function(data, parent, callback) {
    callback(new ComboBoxField(data, parent));
};