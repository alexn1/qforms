const path = require('path');
const _    = require('underscore');
const EditorController = require('../EditorController');

class ColumnEditorController extends EditorController {

    constructor(...args) {
        console.log('ColumnEditorController.constructor');
        super(...args);
        this.viewDirPath = path.join(
            this.hostApp.publicDirPath,
            'editor/class/Controller/ModelController/ColumnController'
        );
    }

    async save(params) {
        console.log('ColumnEditorController.save');
        const appEditor = await this.createApplicationEditor();
        const databaseEditor = appEditor.createDatabaseEditor(params.database);
        const tableEditor = databaseEditor.createTableEditor(params.table);
        const columnEditor = tableEditor.getColumnEditor(params.column);
        await columnEditor.setAttr(params.attr, params.value);
        return null;
    }

    async _new(params) {
        console.log('ColumnEditorController._new');
        const appEditor = await this.createApplicationEditor();
        const column = appEditor.createDatabaseEditor(params.database).createTableEditor(params.table).newColumn(params);
        await appEditor.save();
        return column;
    }

    async delete(params) {
        console.log('ColumnEditorController.delete');
        const appEditor = await this.createApplicationEditor();
        appEditor.createDatabaseEditor(params.database).createTableEditor(params.table).deleteColumn(params.column);
        await appEditor.save();
        return null;
    }

}

module.exports = ColumnEditorController;
