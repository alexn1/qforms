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
                caption : params.caption ? params.caption : params.name,
                newMode : params.newMode ? params.newMode : ''
            },
            dataSources: {},
            fields     : {},
            controls   : {},
            actions    : {}
        };
    }

}

module.exports = RowFormEditor;
