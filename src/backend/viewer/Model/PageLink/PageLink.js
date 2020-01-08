'use strict';

module.exports = PageLink;

var util    = require('util');
var Promise = require('bluebird');

var Model = require('../Model');

util.inherits(PageLink, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageLink(data, parent) {
    var self = this;
    PageLink.super_.call(self, data, parent);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLink.create = function(data, parent) {
    return Promise.resolve(new PageLink(data, parent));
};