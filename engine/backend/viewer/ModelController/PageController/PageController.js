'use strict';

module.exports = PageController;

var util = require('util');
var path = require('path');

var qforms = require('../../../qforms');
var ModelController  = require('../ModelController');

util.inherits(PageController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageController(data, parent) {
    PageController.super_.call(this,data, parent);
    this.application        = parent;
    this.dirPath            = path.join(this.parent.dirPath, 'pages', this.name);
    this.viewFilePath       = path.join(
        qforms.get('public'),
        'viewer/class/Controller/ModelController/PageController/view',
        this.data['@class'] + 'View.ejs'
    );
    this.customViewFilePath = path.join(this.dirPath, this.name + '.ejs');
    this.createCollections  = ['dataSources', 'forms'];
    this.fillCollections    = ['dataSources', 'forms'];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.create = function(data, parent, callback) {
    callback(new PageController(data, parent));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype._call = function(args, callback) {
    callback({
        result:'ok'
    });
};