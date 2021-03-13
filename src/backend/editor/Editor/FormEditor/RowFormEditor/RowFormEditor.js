const FormEditor = require('../FormEditor');

class RowFormEditor extends FormEditor {

    /*constructor(pageEditor, name, data) {
        super(pageEditor, name, data);
    }*/

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
            dataSources: [],
            actions    : [],
            fields     : [],
        };
    }

}

module.exports = RowFormEditor;
