'use strict';

var HostApp = require('./HostApp');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function(req, res, next) {
    var hostApp = new HostApp();
    hostApp.init();
    hostApp.actionViewer(req, res, next);
};