'use strict';

var HostApp = require('../../viewer/HostApp');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = (req, res, next) => {
    console.warn(req.method, 'routes/viewer', req.params);
    var hostApp = new HostApp();
    hostApp.init();
    hostApp.actionViewer(req, res, next);
};