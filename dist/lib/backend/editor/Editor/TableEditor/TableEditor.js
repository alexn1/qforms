"use strict";
const Editor = require('../Editor');
const ColumnEditor = require('../ColumnEditor/ColumnEditor');
class TableEditor extends Editor {
    static createData(params) {
        return {
            '@class': 'Table',
            '@attributes': {
                name: params.name
            },
            columns: [],
        };
    }
    newColumnData(params) {
        const name = params.name;
        if (!name)
            throw new Error('need name');
        if (this.getColItemData('columns', name))
            throw new Error(`Column ${name} already exists.`);
        const data = ColumnEditor.createData(params);
        this.addModelData('columns', data);
        return data;
    }
    createColumnEditor(name) {
        return new ColumnEditor(this.getColItemData('columns', name), this);
    }
}
module.exports = TableEditor;
