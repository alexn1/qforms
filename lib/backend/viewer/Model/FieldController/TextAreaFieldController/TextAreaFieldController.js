'use strict';

module.exports = TextAreaField;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Field  = require('../FieldController');

util.inherits(TextAreaField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TextAreaField(data, parent) {
    TextAreaField.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/TextAreaFieldController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TextAreaField.create2 = function(data, parent) {
    return Promise.resolve(new TextAreaField(data, parent));
};