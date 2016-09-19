'use strict';

module.exports = LinkFieldController;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Field  = require('../FieldController');

util.inherits(LinkFieldController, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function LinkFieldController(data, parent) {
    LinkFieldController.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/LinkFieldController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
LinkFieldController.create2 = function(data, parent) {
    return Promise.resolve(new LinkFieldController(data, parent));
};