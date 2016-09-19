'use strict';

module.exports = PageLink;

var util    = require('util');
var Promise = require('bluebird');

var ModelController = require('../ModelController');

util.inherits(PageLink, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageLink(data, parent) {
    PageLink.super_.call(this, data, parent);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLink.create2 = function(data, parent) {
    return Promise.resolve(new PageLink(data, parent));
};