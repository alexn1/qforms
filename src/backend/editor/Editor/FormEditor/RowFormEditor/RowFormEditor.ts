const FormEditor = require('../FormEditor');
const Editor = require('../../Editor');

class RowFormEditor extends FormEditor {
    static createData(params) {
        // console.log('RowFormEditor.createData', params);
        return {
            '@class'     : 'RowForm',
            '@attributes': {
                ...FormEditor.createAttributes(params),
                newMode : params.newMode  ? params.newMode : '',
                backOnly: params.backOnly ? params.backOnly: 'false'
            },
            dataSources: [
                ...(params.dataSources ? params.dataSources.map(Editor.createItemData) : [])
            ],
            actions    : [
                ...(params.actions ? params.actions.map(Editor.createItemData) : [])
            ],
            fields     : [
                ...(params.fields ? params.fields.map(Editor.createItemData) : [])
            ],
        };
    }
}

export = RowFormEditor;
