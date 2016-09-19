'use strict';

module.exports = TextAreaFieldController;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Field  = require('../FieldController');

util.inherits(TextAreaFieldController, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TextAreaFieldController(data, parent) {
    TextAreaFieldController.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/TextAreaFieldController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TextAreaFieldController.create2 = function(data, parent) {
    return Promise.resolve(new TextAreaFieldController(data, parent));
};