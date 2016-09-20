'use strict';

module.exports = ComboBoxField;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Field  = require('../Field');

util.inherits(ComboBoxField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ComboBoxField(data, parent) {
    ComboBoxField.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/ComboBoxFieldController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxField.create2 = function(data, parent) {
    return Promise.resolve(new ComboBoxField(data, parent));
};