const Editor = require('../Editor');
const ParamEditor = require('../ParamEditor/ParamEditor');
const TableEditor = require('../TableEditor/TableEditor');

class DatabaseEditor extends Editor {
    static createData(params) {
        throw new Error('DatabaseEditor.createData not implemented');
    }
    /*newTableData(params) {
        const name = params.name;
        if (!name) throw new Error('need param name');
        if (this.getColItemData('tables', name)) throw new Error(`table ${name} already exists`);
        const data = TableEditor.createData(params);
        this.addModelData('tables', data);
        if (params.columns) {
            const tableEditor = this.createItemEditor('tables', name);
            params.columns.forEach(column => tableEditor.newColumnData(column));
        }
        return data;
    }*/
    newParamData(params) {
        const name = params.name;
        if (!name) throw new Error('need param name');
        if (this.getColItemData('params', name)) throw new Error(`param ${name} already exists`);
        const data = ParamEditor.createData(params);
        this.addModelData('params', data);
        return data;
    }
}

export = DatabaseEditor;
