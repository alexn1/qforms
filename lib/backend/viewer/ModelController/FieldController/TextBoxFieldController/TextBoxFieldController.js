'use strict';

module.exports = TextBoxField;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Field  = require('../FieldController');

util.inherits(TextBoxField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TextBoxField(data, parent) {
    TextBoxField.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/TextBoxFieldController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TextBoxField.create2 = function(data, parent) {
    return Promise.resolve(new TextBoxField(data, parent));
};