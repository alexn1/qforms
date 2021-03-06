const Editor = require('../Editor');
const ParamEditor = require('../ParamEditor/ParamEditor');
const TableEditor = require('../TableEditor/TableEditor');

class DatabaseEditor extends Editor {

    constructor(...args) {
        super(...args);
        // this.colName = 'databases';
    }

    static createData(params) {
        throw new Error('DatabaseEditor.createData not implemented');
    }

    newTableData(params) {
        const name = params.name;
        if (!name) throw new Error('need param name');
        // if (!this.data.tables) this.data.tables = {};
        // if (!this.data.tables2) this.data.tables2 = [];
        if (this.getModelData('tables', name)) throw new Error(`table ${name} already exists`);
        const data = TableEditor.createData(params);
        if (params.columns) {
            const tableEditor = this.createTableEditor(name);
            params.columns.forEach(column => tableEditor.newColumnData(column));
        }
        this.addModelData('tables', data);
        return data;
    }

    createTableEditor(name) {
        return new TableEditor(this.getModelData('tables', name), this);
    }

    newParamData(params) {
        const name = params.name;
        if (!name) throw new Error('need param name');
        // if (!this.data.params) this.data.params = {};
        // if (!this.data.params2) this.data.params2 = [];
        if (this.getModelData('params', name)) throw new Error(`param ${name} already exists`);
        const data = ParamEditor.createData(params);
        this.addModelData('params', data);
        return data;
    }

    deleteParam(name) {
        if (!name) throw new Error('no name');
        delete this.data.params[name];
    }

    deleteTable(name) {
        if (!name) throw new Error('no name');
        delete this.data.tables[name];
    }

    createParamEditor(name) {
        return new ParamEditor(this.getModelData('params', name), this);
    }

}

module.exports = DatabaseEditor;