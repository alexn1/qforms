const path = require('path');
const FormEditor = require('../FormEditor');

class TreeFormEditor extends FormEditor {

    /*constructor(pageEditor, name, data) {
        super(pageEditor, name, data);
    }*/

    static createData(params) {
        return {
            '@class'     : 'TreeForm',
            '@attributes': {
                name        : params.name,
                caption     : (params.caption) && params.caption ? params.caption : params.name,
                itemEditPage: ''
            },
            dataSources: {},
            fields     : {},
            actions    : {}
        };
    }

}

module.exports = TreeFormEditor;
