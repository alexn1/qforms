'use strict';

const Editor = require('../Editor');
const ColumnEditor = require('../ColumnEditor/ColumnEditor');

class TableEditor extends Editor {

    constructor(...args) {
        super(...args);
        this.colName = 'tables';
    }

    static createData(params) {
        return {
            '@class'      : 'Table',
            '@attributes' : {
                'name' : params.name
            }
        };
    }

    deleteColumn(name) {
        delete this.data.columns[name];
    }

    newColumn(params) {
        const name = params.name;
        if (!name) throw new Error('need name');
        if (!this.data.columns) {
            this.data.columns = {};
        }
        if (this.data.columns[name]) {
            throw new Error(`Column ${name} already exists.`);
        }
        return this.data.columns[name] = ColumnEditor.createData(params);
    }

    getColumnData(name) {
        return this.data.columns[name];
    }

    getColumnEditor(name) {
        return new ColumnEditor(this.getColumnData(name), this);
    }

}

module.exports = TableEditor;