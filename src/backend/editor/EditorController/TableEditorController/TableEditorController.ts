const EditorController = require('../EditorController');

class TableEditorController extends EditorController {
    /*constructor(...args) {
        super(...args);
    }*/
    async _new(params) {
        console.log('TableEditorController._new');
        const appEditor = await this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        // const data = databaseEditor.newTableData(params);
        const data = databaseEditor.newItemData('Table', 'tables', params);
        await appEditor.save();
        return data;
    }
    async delete(params) {
        console.log('TableEditorController.delete');
        const appEditor = await this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const data = databaseEditor.removeColData('tables', params.table);
        await appEditor.save();
        return data;
    }
    async moveUp(params) {
        const appEditor = await this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const result = databaseEditor.moveItemUp('tables', params.table);
        await appEditor.save();
        return result;
    }

    async moveDown(params) {
        const appEditor = await this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const result = databaseEditor.moveItemDown('tables', params.table);
        await appEditor.save();
        return result;
    }

}

export = TableEditorController;