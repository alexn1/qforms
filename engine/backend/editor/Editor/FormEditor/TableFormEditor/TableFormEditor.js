'use strict';

module.exports = TableFormEditor;

var util = require('util');
var path = require('path');

var QForms = require('../../../../qforms');
var server     = require('../../../../server');

var FormEditor = require('../FormEditor');

util.inherits(TableFormEditor, FormEditor);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function TableFormEditor(pageEditor, name, data) {
    TableFormEditor.super_.call(this, pageEditor, name, data);
    this.defaultEjsFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FormController/TableFormController/view/TableFormView.ejs'
    );
    this.defaultCssFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/FormController/TableFormController/view/TableFormView.css'
    );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
TableFormEditor.createData = function(params) {
    return {
        '@class'        : 'TableForm',
        '@attributes'   : {
            name              : params.name,
            caption           : params.caption ? params.caption : params.name,
            editMethod        : 'disabled',
            itemEditPage      : '',
            itemCreatePage    : '',
            newRowMode        : 'disabled',
            deleteRowMode     : 'disabled',
            refreshButton     : 'false'
        },
        dataSources   : {},
        fields        : {},
        controls      : {}
    };
};