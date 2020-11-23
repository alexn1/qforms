const path = require('path');
const FormEditor = require('../FormEditor');

class RowFormEditor extends FormEditor {

    constructor(pageEditor, name, data) {
        super(pageEditor, name, data);
        this.defaultEjsFilePath = path.join(
            this.getAppEditor().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FormController/RowFormController/view/RowFormView.ejs'
        );
        this.defaultCssFilePath = path.join(
            this.getAppEditor().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FormController/RowFormController/view/RowFormView.css'
        );
    }

    static createData(params) {
        return {
            '@class'     : 'RowForm',
            '@attributes': {
                name    : params.name,
                caption : params.caption  ? params.caption : params.name,
                visible : params.visible  ? params.visible : 'true',
                newMode : params.newMode  ? params.newMode : '',
                backOnly: params.backOnly ? params.backOnly  : 'false'
            },
            dataSources: {},
            fields     : {},
            controls   : {},
            actions    : {}
        };
    }

}

module.exports = RowFormEditor;
