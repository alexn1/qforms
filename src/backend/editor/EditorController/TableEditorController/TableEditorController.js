const EditorController = require('../EditorController');

class TableEditorController extends EditorController {

    /*constructor(...args) {
        super(...args);
    }*/

    async _new(params) {
        console.log('TableEditorController._new');
        const appEditor = await this.createApplicationEditor();
        const databaseEditor = appEditor.createDatabaseEditor(params.database);
        const data = databaseEditor.newTableData(params);
        await appEditor.save();
        return data;
    }

    async delete(params) {
        console.log('TableEditorController.delete');
        const appEditor = await this.createApplicationEditor();
        const databaseEditor = appEditor.createDatabaseEditor(params.database)
        const data = databaseEditor.removeColData('tables', params.table);
        await appEditor.save();
        return data;
    }

}

module.exports = TableEditorController;
