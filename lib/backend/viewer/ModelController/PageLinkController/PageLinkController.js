'use strict';

module.exports = PageLinkController;

var util    = require('util');
var Promise = require('bluebird');

var ModelController = require('../ModelController');

util.inherits(PageLinkController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageLinkController(data, parent) {
    PageLinkController.super_.call(this, data, parent);
}

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkController.create = function(data, parent, callback) {
    callback(new PageLinkController(data, parent));
};
*/

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkController.create2 = function(data, parent) {
    return Promise.resolve(new PageLinkController(data, parent));
};