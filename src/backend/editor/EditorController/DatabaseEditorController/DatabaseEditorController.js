'use strict';

const util    = require('util');
const path    = require('path');
const _       = require('underscore');

const qforms           = require('../../../qforms');
const EditorController = require('../EditorController');

class DatabaseEditorController extends EditorController {
    constructor(...args) {
        super(...args);
        this.viewDirPath = path.join(
            this.hostApp.publicDirPath,
            'editor/class/Controller/ModelController/DocumentController/DatabaseController/view'
        );
    }

    async _new(params) {
        const appEditor = await this.createApplicationEditor();
        appEditor.newDatabase(params);
        if (params.params) {
            const databaseEditor = appEditor.createDatabaseEditor(params.name);
            for (const name in params.params) {
                const param = params.params[name];
                databaseEditor.newParam(param);
            }
        }
        await appEditor.save();
        return appEditor.getDatabaseData(params.name);
    }

    async save(params) {
        console.log('DatabaseEditorController.save');
        const appEditor = await this.createApplicationEditor();
        const databaseEditor = appEditor.createDatabaseEditor(params.database);
        await databaseEditor.setAttr(params.attr, params.value);
        return null;
    }

    async delete(params) {
        const appEditor = await this.createApplicationEditor();
        appEditor.deleteDatabase(params.database);
        await appEditor.save();
        return null;
    }

    async getView(params) {
        const result = await super.getView(params);
        if (params.view === 'DatabaseView/DatabaseView.html') {
            // database
            const database = this.application.createDatabase(params.database);

            // tables
            result.data.tables = await database.getTableList();

            // table view
            const filePath = path.join(this.viewDirPath, 'TableView/TableView.ejs');
            result.data.tableView = await qforms.Helper.readFile(filePath);
        }
        return result;
    }

    async getTableInfo(params) {
        const database = this.application.createDatabase(params.database);
        const tableInfo = await database.getTableInfo(params.table);
        return {tableInfo};
    }

}

module.exports = DatabaseEditorController;
