'use strict';

module.exports = PageLinkController;

var util = require('util');
var path = require('path');
var fs   = require('fs');
var _    = require('underscore');

var qforms          = require('../../../qforms');
var Controller      = require('../Controller');
var ApplicationFile = require('../../JsonFile/ApplicationFile/ApplicationFile');

util.inherits(PageLinkController, Controller);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageLinkController(appInfo) {
    PageLinkController.super_.prototype.constructor.call(this, appInfo);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLinkController.prototype.save = function(params, callback) {
    var appFile = new ApplicationFile(this.appInfo);
    appFile.init(function() {
        appFile.setPageLinkAttr(params["pageLink"], params["attr"], params["value"]);
        appFile.save(function() {
            callback(null);
        });
    });
};