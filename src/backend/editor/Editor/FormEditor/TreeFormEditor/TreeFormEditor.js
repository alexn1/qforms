'use strict';

const path = require('path');
const FormEditor = require('../FormEditor');

class TreeFormEditor extends FormEditor {

    constructor(pageEditor, name, data) {
        super(pageEditor, name, data);
        this.defaultEjsFilePath = path.join(
            this.getAppEditor().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FormController/TreeFormController/view/TreeFormView.ejs'
        );
        this.defaultCssFilePath = path.join(
            this.getAppEditor().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FormController/TreeFormController/view/TreeFormView.css'
        );
    }

    static createData(params) {
        return {
            '@class'     : 'TreeForm',
            '@attributes': {
                name        : params.name,
                caption     : (params.caption) && params.caption ? params.caption : params.name,
                itemEditPage: ''
            },
            dataSources: {},
            fields     : {},
            controls   : {},
            actions    : {}
        };
    }

}

module.exports = TreeFormEditor;
