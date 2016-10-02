'use strict';

module.exports = FileField;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Field  = require('../Field');

util.inherits(FileField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FileField(data, parent) {
    var self = this;
    FileField.super_.call(self, data, parent);
    self.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/FileFieldController/view',
        self.parent.data['@class'] + self.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FileField.create2 = function(data, parent) {
    return Promise.resolve(new FileField(data, parent));
};