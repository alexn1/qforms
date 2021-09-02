"use strict";
const FormEditor = require('../FormEditor');
const Editor = require('../../Editor');
class RowFormEditor extends FormEditor {
    static createData(params) {
        // console.log('RowFormEditor.createData', params);
        return {
            '@class': 'RowForm',
            '@attributes': {
                name: params.name,
                caption: params.caption ? params.caption : params.name,
                visible: params.visible ? params.visible : 'true',
                newMode: params.newMode ? params.newMode : '',
                backOnly: params.backOnly ? params.backOnly : 'false'
            },
            dataSources: [
                ...(params.dataSources ? params.dataSources.map(Editor.createItemData) : [])
            ],
            actions: [
                ...(params.actions ? params.actions.map(Editor.createItemData) : [])
            ],
            fields: [
                ...(params.fields ? params.fields.map(Editor.createItemData) : [])
            ],
        };
    }
}
module.exports = RowFormEditor;
