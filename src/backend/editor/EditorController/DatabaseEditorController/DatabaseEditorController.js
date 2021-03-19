const util    = require('util');
const path    = require('path');
const _       = require('underscore');

const qforms           = require('../../../qforms');
const EditorController = require('../EditorController');

class DatabaseEditorController extends EditorController {
    /*constructor(...args) {
        super(...args);
    }*/

    async _new(params) {
        const appEditor = await this.createApplicationEditor();
        const data = appEditor.newDatabaseData(params);
        if (params.params) {
            const databaseEditor = appEditor.createDatabaseEditor(params.name);
            for (const name in params.params) {
                const param = params.params[name];
                databaseEditor.newParamData(param);
            }
        }
        await appEditor.save();
        return data;
    }

    async save(params) {
        console.log('DatabaseEditorController.save');
        const appEditor = await this.createApplicationEditor();
        const databaseEditor = appEditor.createDatabaseEditor(params.database);
        await databaseEditor.setAttr(params.attr, params.value);
        await appEditor.save();
        return null;
    }

    async delete(params) {
        const appEditor = await this.createApplicationEditor();
        const data = appEditor.removeColData('databases', params.database);
        await appEditor.save();
        return data;
    }

    async getView(params) {
        const result = await super.getView(params);
        if (params.view === 'DatabaseView/DatabaseView.html') {
            // database
            const database = this.application.getDatabase(params.database);

            // tables
            result.data.tables = await database.getTableList();
        }
        return result;
    }

    async getTableInfo(params) {
        const database = this.application.getDatabase(params.database);
        const tableInfo = await database.getTableInfo(params.table);
        return {tableInfo};
    }

}

module.exports = DatabaseEditorController;
