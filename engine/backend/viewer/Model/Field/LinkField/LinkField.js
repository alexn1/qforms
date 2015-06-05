'use strict';

module.exports = LinkField;

var util = require('util');
var path = require('path');

var Field = require('../Field');
var app   = require('../../../../qforms');

util.inherits(LinkField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function LinkField(data, parent) {
    LinkField.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        app.get('public'),
        'viewer/class/Controller/ModelController/FieldController/LinkFieldController/view',
        this.parent.constructor.name + this.constructor.name + 'View.ejs'
    );
};