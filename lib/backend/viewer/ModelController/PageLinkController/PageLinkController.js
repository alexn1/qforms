'use strict';

module.exports = PageLink;

var util    = require('util');
var Promise = require('bluebird');

var Model = require('../ModelController');

util.inherits(PageLink, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageLink(data, parent) {
    PageLink.super_.call(this, data, parent);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLink.create2 = function(data, parent) {
    return Promise.resolve(new PageLink(data, parent));
};