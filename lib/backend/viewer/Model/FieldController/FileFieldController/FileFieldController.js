'use strict';

module.exports = FileField;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Field  = require('../FieldController');

util.inherits(FileField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FileField(data, parent) {
    FileField.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/FileFieldController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FileField.create2 = function(data, parent) {
    return Promise.resolve(new FileField(data, parent));
};