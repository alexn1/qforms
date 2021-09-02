const FormEditor = require('../FormEditor');
const backend = require('../../../../../backend');

class RowFormEditor extends FormEditor {
    static createData(params) {
        console.log('RowFormEditor.createData', params);
        return {
            '@class'     : 'RowForm',
            '@attributes': {
                name    : params.name,
                caption : params.caption  ? params.caption : params.name,
                visible : params.visible  ? params.visible : 'true',
                newMode : params.newMode  ? params.newMode : '',
                backOnly: params.backOnly ? params.backOnly: 'false'
            },
            dataSources: [
                ...(params.dataSources ? params.dataSources.map(dataSourceParams => {
                    return backend[`${dataSourceParams.class}Editor`].createData(dataSourceParams)
                }) : [])
            ],
            actions    : [],
            fields     : [
                ...(params.fields ? params.fields.map(fieldParams => {
                    return backend[`${fieldParams.class}Editor`].createData(fieldParams)
                }) : [])
            ],
        };
    }
}

export = RowFormEditor;
