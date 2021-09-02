"use strict";
const FormEditor = require('../FormEditor');
const backend = require('../../../../../backend');
class TableFormEditor extends FormEditor {
    static createData(params) {
        console.log('TableFormEditor.createData', params);
        return {
            '@class': 'TableForm',
            '@attributes': {
                name: params.name,
                caption: params.caption ? params.caption : params.name,
                visible: params.visible ? params.visible : 'true',
                editMethod: 'disabled',
                itemEditPage: '',
                itemCreatePage: '',
                newRowMode: 'disabled',
                deleteRowMode: 'disabled',
                refreshButton: 'true'
            },
            dataSources: [
                ...(params.dataSources ? params.dataSources.map(dataSourceParams => {
                    return backend[`${dataSourceParams.class}Editor`].createData(dataSourceParams);
                }) : [])
            ],
            actions: [],
            fields: [
                ...(params.fields ? params.fields.map(fieldParams => {
                    return backend[`${fieldParams.class}Editor`].createData(fieldParams);
                }) : [])
            ],
        };
    }
}
module.exports = TableFormEditor;
