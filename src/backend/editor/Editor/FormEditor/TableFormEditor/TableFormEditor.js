const path = require('path');
const FormEditor = require('../FormEditor');

class TableFormEditor extends FormEditor {

    constructor(pageEditor, name, data) {
        super(pageEditor, name, data);
        /*this.defaultEjsFilePath = path.join(
            this.getAppEditor().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FormController/TableFormController/view/TableFormView.ejs'
        );*/
        /*this.defaultCssFilePath = path.join(
            this.getAppEditor().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FormController/TableFormController/view/TableFormView.css'
        );*/
    }

    static createData(params) {
        return {
            '@class'        : 'TableForm',
            '@attributes'   : {
                name          : params.name,
                caption       : params.caption ? params.caption : params.name,
                visible       : params.visible ? params.visible : 'true',
                editMethod    : 'disabled',
                itemEditPage  : '',
                itemCreatePage: '',
                newRowMode    : 'disabled',
                deleteRowMode : 'disabled',
                refreshButton : 'true'
            },
            dataSources   : {},
            fields        : {},
            controls      : {},
            actions       : {}
        };
    }

}

module.exports = TableFormEditor;
