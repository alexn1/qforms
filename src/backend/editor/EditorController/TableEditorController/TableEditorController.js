'use strict';

const path = require('path');
const _    = require('underscore');
const EditorController = require('../EditorController');

class TableEditorController extends EditorController {

    constructor(...args) {
        super(...args);
        this.viewDirPath = path.join(
            this.hostApp.publicDirPath,
            'editor/class/Controller/ModelController/DocumentController/TableController/view'
        );
    }

    async _new(params) {
        console.log('TableEditorController._new');
        const appEditor = await this.createApplicationEditor();
        const databaseEditor = appEditor.createDatabaseEditor(params.database);
        const tableData = databaseEditor.newTable(params);
        await appEditor.save();
        return tableData;
    }

    async delete(params) {
        console.log('TableEditorController.delete');
        const appEditor = await this.createApplicationEditor();
        appEditor.createDatabaseEditor(params.database).deleteTable(params.table)
        await appEditor.save();
        return null;
    }

}

module.exports = TableEditorController;
