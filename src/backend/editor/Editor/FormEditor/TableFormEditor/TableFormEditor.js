const FormEditor = require('../FormEditor');

class TableFormEditor extends FormEditor {

    static createData(params) {
        return {
            '@class'     : 'TableForm',
            '@attributes': {
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
            dataSources: [],
            actions    : [],
            fields     : [],
        };
    }

}

module.exports = TableFormEditor;
