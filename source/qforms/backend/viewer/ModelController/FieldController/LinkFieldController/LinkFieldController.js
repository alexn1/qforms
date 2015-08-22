'use strict';

module.exports = LinkFieldController;

var util = require('util');
var path = require('path');

var server = require('../../../../../server');

var FieldController = require('../FieldController');

util.inherits(LinkFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function LinkFieldController(data, parent) {
    LinkFieldController.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/LinkFieldController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
LinkFieldController.create = function(data, parent, callback) {
    callback(new LinkFieldController(data, parent));
};