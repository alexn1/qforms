'use strict';

module.exports = DataSourceEditor;

var util = require('util');

var Editor = require('../Editor');

util.inherits(DataSourceEditor, Editor);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataSourceEditor(parent, name) {
    DataSourceEditor.super_.call(this);
    this.parent = parent;
    this.name   = name;
};