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
    LinkField.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/LinkFieldController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
LinkField.create2 = function(data, parent) {
    return Promise.resolve(new LinkField(data, parent));
};