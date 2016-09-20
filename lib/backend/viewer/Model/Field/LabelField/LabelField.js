'use strict';

module.exports = LabelField;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Field  = require('../Field');

util.inherits(LabelField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function LabelField(data, parent) {
    LabelField.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/LabelFieldController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
LabelField.create2 = function(data, parent) {
    return Promise.resolve(new LabelField(data, parent));
};