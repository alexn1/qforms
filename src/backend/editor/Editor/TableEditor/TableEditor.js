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
                name : params.name
            },
            columns: {},
            columns2: [],
        };
    }

    deleteColumn(name) {
        delete this.data.columns[name];
    }

    newColumnData(params) {
        const name = params.name;
        if (!name) throw new Error('need name');
        if (!this.data.columns) this.data.columns = {};
        if (!this.data.columns2) this.data.columns2 = [];
        if (this.getModelData('tables', name)) throw new Error(`Column ${name} already exists.`);
        const data = ColumnEditor.createData(params);
        // this.data.columns[name] = data;
        this.addModelData('columns2', data);
        return data;
    }

    getColumnData(name) {
        return this.getModelData('columns', name);
        /*if (data) return data;
        data = this.findModelData('columns2', name);
        if (data) return data;
        throw new Error(`no column ${name}`);*/
    }

    getColumnEditor(name) {
        return new ColumnEditor(this.getColumnData(name), this);
    }

}

module.exports = TableEditor;