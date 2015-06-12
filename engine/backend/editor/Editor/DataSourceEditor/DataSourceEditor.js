'use strict';

module.exports = DataSourceEditor;

var util = require('util');

var Editor = require('../Editor');

util.inherits(DataSourceEditor, Editor);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataSourceEditor(parent, name, data) {
    DataSourceEditor.super_.call(this);
    this.parent = parent;
    this.name   = name;
    this.data   = data;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceEditor.prototype.newKeyColumn = function(params) {
    var name = params.name;
    if (!this.data.keyColumns) {
        this.data.keyColumns = {};
    }
    if (this.data.keyColumns[name]) {
        throw  new Error('Key Column {name} already exist.'.replace('{name}', name));
    }
    return this.data.keyColumns[name] = {
        "@class":"KeyColumn",
        "@attributes": {
            'name':name
        }
    };
};