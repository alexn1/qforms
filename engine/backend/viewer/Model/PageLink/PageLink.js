'use strict';

module.exports = PageLink;

var util = require('util');

var Model = require('../Model');

util.inherits(PageLink, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageLink(data, parent) {
    PageLink.super_.call(this, data, parent);
};