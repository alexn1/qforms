'use strict';

module.exports = Page;

var util = require('util');
var path = require('path');

var qforms = require('../../../qforms');
var Model  = require('../Model');

util.inherits(Page, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Page(data, parent) {
    Page.super_.prototype.constructor.call(this,data, parent);
    this.dirPath            = path.join(this.parent.dirPath, this.name);
    this.viewFilePath       = path.join(
        qforms.get('public'),
        'viewer/class/Controller/ModelController/PageController/view',
        this.constructor.name + 'View.ejs'
    );
    this.customViewFilePath = path.join(this.dirPath, this.name + '.ejs');
    this.createCollections  = ['dataSources', 'forms'];
    this.fillCollections    = ['forms'];
    this.params             = {};
};