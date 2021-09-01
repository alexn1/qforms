"use strict";
const FormEditor = require('../FormEditor');
const backend = require('../../../../../backend');
class RowFormEditor extends FormEditor {
    static createData(params) {
        console.log('RowFormEditor.createData', params);
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
                ...(params.dataSources ? Object.keys(params.dataSources).map(name => {
                    const dataSourceParams = params.dataSources[name];
                    return backend[`${dataSourceParams.class}Editor`].createData(dataSourceParams);
                }) : [])
            ],
            actions: [],
            fields: [],
        };
    }
}
module.exports = RowFormEditor;
