'use strict';

module.exports = LinkField;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Field  = require('../Field');

util.inherits(LinkField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function LinkField(data, parent) {
    var self = this;
    LinkField.super_.call(self, data, parent);
    self.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/LinkFieldController/view',
        self.parent.data['@class'] + self.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
LinkField.create = function(data, parent) {
    return Promise.resolve(new LinkField(data, parent));
};