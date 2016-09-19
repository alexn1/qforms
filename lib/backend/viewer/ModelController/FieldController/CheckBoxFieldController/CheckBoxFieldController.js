'use strict';

module.exports = CheckBoxField;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server  = require('../../../../../server');
var Field   = require('../FieldController');

util.inherits(CheckBoxField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function CheckBoxField(data, parent) {
    CheckBoxField.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/CheckBoxFieldController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
CheckBoxField.create2 = function(data, parent) {
    return Promise.resolve(new CheckBoxField(data, parent));
};