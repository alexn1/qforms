'use strict';

module.exports = CheckBoxFieldController;

var util = require('util');
var path = require('path');

var FieldController = require('../FieldController');
var app             = require('../../../../qforms');

util.inherits(CheckBoxFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function CheckBoxFieldController(data, parent) {
    CheckBoxFieldController.super_.call(this, data, parent);
    this.viewFilePath = path.join(
        app.get('public'),
        'viewer/class/Controller/ModelController/FieldController/CheckBoxFieldController/view',
        this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
CheckBoxFieldController.create = function(data, parent, callback) {
    callback(new CheckBoxFieldController(data, parent));
};