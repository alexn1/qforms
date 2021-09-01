const FormEditor = require('../FormEditor');
const backend = require('../../../../../backend');

class TableFormEditor extends FormEditor {
    static createData(params) {
        console.log('TableFormEditor.createData', params);
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
            dataSources: [
                ...(params.dataSources ? Object.keys(params.dataSources).map(name => {
                    const dataSourceParams = params.dataSources[name];
                    return backend[`${dataSourceParams.class}Editor`].createData(dataSourceParams)
                }) : [])
            ],
            actions    : [],
            fields     : [
                ...(params.fields ? Object.keys(params.fields).map(name => {
                    const fieldParams = params.fields[name];
                    return backend[`${fieldParams.class}Editor`].createData(fieldParams)
                }) : [])
            ],
        };
    }
}

export = TableFormEditor;
