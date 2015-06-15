'use strict';

module.exports = Page;

var util = require('util');
var path = require('path');

var qforms = require('../../../qforms');
var Model  = require('../Model');

util.inherits(Page, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Page(data, parent) {
    Page.super_.call(this,data, parent);
    this.application        = parent;
    this.dirPath            = path.join(this.parent.dirPath, 'pages', this.name);
    this.viewFilePath       = path.join(
        qforms.get('public'),
        'viewer/class/Controller/ModelController/PageController/view',
        this.constructor.name + 'View.ejs'
    );
    this.customViewFilePath = path.join(this.dirPath, this.name + '.ejs');
    this.createCollections  = ['dataSources', 'forms'];
    this.fillCollections    = ['dataSources', 'forms'];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.create = function(data, parent, callback) {
    callback(new Page(data, parent));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype._call = function(args, callback) {
    callback({
        result:'ok'
    });
};