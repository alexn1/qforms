'use strict';

module.exports = FileFieldController;

var util    = require('util');
var path    = require('path');
var Promise = require('bluebird');

var server = require('../../../../../server');
var Field  = require('../FieldController');

util.inherits(FileFieldController, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FileFieldController(data, parent) {
    FileFieldController.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FieldController/FileFieldController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FileFieldController.create2 = function(data, parent) {
    return Promise.resolve(new FileFieldController(data, parent));
};