'use strict';

module.exports = FileFieldController;

var util = require('util');
var path = require('path');

var FieldController  = require('../FieldController');
var qforms           = require('../../../../qforms');

util.inherits(FileFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FileFieldController(data, parent) {
    FileFieldController.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        qforms.get('public'),
        'viewer/class/Controller/ModelController/FieldController/FileFieldController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FileFieldController.create = function(data, parent, callback) {
    callback(new FileFieldController(data, parent));
};