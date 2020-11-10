const Editor = require('../Editor');
const ParamEditor = require('../ParamEditor/ParamEditor');
const TableEditor = require('../TableEditor/TableEditor');

class DatabaseEditor extends Editor {

    constructor(...args) {
        super(...args);
        this.colName = 'databases';
    }

    static createData(params) {
        throw new Error('DatabaseEditor.createData not implemented');
    }

    newTable(params) {
        const name = params.name;
        if (!name) throw new Error('need param name');
        if (!this.data.tables) this.data.tables = {};
        if (this.data.tables[name]) throw new Error(`table ${name} already exists`);
        const tableData = this.data.tables[name] = TableEditor.createData(params);
        if (params.columns) {
            params.columns.forEach(column => {
                this.getTableEditor(params.name).newColumn(column);
            });
        }
        return tableData;
    }

    getTableData(name) {
        return this.data.tables[name];
    }

    getTableEditor(name) {
        return new TableEditor(this.getTableData(name), this);
    }

    newParam(params) {
        const name = params.name;
        if (!name) throw new Error('need param name');
        if (!this.data.params) this.data.params = {};
        if (this.data.params[name]) throw new Error(`param ${name} already exists`);
        return this.data.params[name] = ParamEditor.createData(params);
    }

    deleteParam(name) {
        if (!name) throw new Error('no name');
        delete this.data.params[name];
    }

    deleteTable(name) {
        if (!name) throw new Error('no name');
        delete this.data.tables[name];
    }

    getParamData(name) {
        if (!this.data.params[name]) throw new Error(`no param: ${name}`);
        return this.data.params[name];
    }

    getParamEditor(name) {
        return new ParamEditor(this.getParamData(name), this);
    }

}

module.exports = DatabaseEditor;