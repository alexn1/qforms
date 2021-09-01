const EditorController = require('../EditorController');

class DatabaseEditorController extends EditorController {
    /*constructor(...args) {
        super(...args);
    }*/

    async _new(params) {
        const appEditor = await this.createApplicationEditor();
        const data = appEditor.newDatabaseData(params);
        if (params.params) {
            // const databaseEditor = appEditor.createDatabaseEditor(params.name);
            const databaseEditor = appEditor.createItemEditor('databases', params.name);
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
        // const databaseEditor = appEditor.createDatabaseEditor(params.database);
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        databaseEditor.setAttr(params.attr, params.value);
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

    async moveUp(params) {
        const appEditor = await this.createApplicationEditor();
        appEditor.moveDataColItem('databases', params.database, -1);
        await appEditor.save();
        return 'ok';
    }

    async moveDown(params) {
        const appEditor = await this.createApplicationEditor();
        appEditor.moveDataColItem('databases', params.database, 1);
        await appEditor.save();
        return 'ok';
    }

}

export = DatabaseEditorController;
