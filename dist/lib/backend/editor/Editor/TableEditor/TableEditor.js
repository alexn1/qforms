"use strict";
const Editor = require('../Editor');
const ColumnEditor = require('../ColumnEditor/ColumnEditor');
class TableEditor extends Editor {
    static createData(params) {
        console.log('TableEditor.createData', params);
        return {
            '@class': 'Table',
            '@attributes': {
                name: params.name
            },
            columns: [
                ...(params.columns ? params.columns.map(columnParams => ColumnEditor.createData(columnParams)) : [])
            ],
        };
    }
    getColName() {
        return 'tables';
    }
}
module.exports = TableEditor;
