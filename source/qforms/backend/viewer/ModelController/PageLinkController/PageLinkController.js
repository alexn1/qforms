'use strict';

module.exports = PageLinkController;

var util = require('util');

var ModelController = require('../ModelController');

util.inherits(PageLinkController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageLinkController(data, parent) {
    PageLinkController.super_.call(this, data, parent);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkController.create = function(data, parent, callback) {
    callback(new PageLinkController(data, parent));
};