const EditorController = require('../EditorController');

class ColumnEditorController extends EditorController {

    /*constructor(...args) {
        console.log('ColumnEditorController.constructor');
        super(...args);
    }*/

    async save(params) {
        console.log('ColumnEditorController.save');
        const appEditor = await this.createApplicationEditor();
        // const databaseEditor = appEditor.createDatabaseEditor(params.database);
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const tableEditor = databaseEditor.createItemEditor('tables', params.table);
        const columnEditor = tableEditor.createItemEditor('columns', params.column);
        columnEditor.setAttr(params.attr, params.value);
        await appEditor.save();
        return null;
    }

    async _new(params) {
        console.log('ColumnEditorController._new');
        const appEditor = await this.createApplicationEditor();
        // const databaseEditor = appEditor.createDatabaseEditor(params.database);
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const columnData = databaseEditor.createItemEditor('tables', params.table).newColumnData(params);
        await appEditor.save();
        return columnData;
    }

    async delete(params) {
        console.log('ColumnEditorController.delete');
        const appEditor = await this.createApplicationEditor();
        // const databaseEditor = appEditor.createDatabaseEditor(params.database);
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const tableEditor = databaseEditor.createItemEditor('tables', params.table);
        const data = tableEditor.removeColData('columns', params.column);
        await appEditor.save();
        return data;
    }

}

export = ColumnEditorController;
