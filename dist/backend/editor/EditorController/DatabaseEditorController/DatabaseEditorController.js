"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseEditorController = void 0;
const EditorController_1 = require("../EditorController");
class DatabaseEditorController extends EditorController_1.EditorController {
    constructor() {
        super(...arguments);
        this.application = null;
    }
    /*constructor(...args) {
        super(...args);
        this.application = null;
    }*/
    async init(context) {
        await super.init(context);
        this.application = await this.hostApp.createApplication(context);
    }
    async _new(params) {
        const appEditor = this.createApplicationEditor();
        const data = appEditor.newItemData(params.class, 'databases', params);
        /*
        if (params.params) {
            const databaseEditor = appEditor.createItemEditor('databases', params.name);
            for (const name in params.params) {
                const param = params.params[name];
                databaseEditor.newItemData('Param', 'params', param);
            }
        }*/
        await appEditor.save();
        return data;
    }
    async save(params) {
        console.debug('DatabaseEditorController.save');
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        databaseEditor.setAttr(params.attr, params.value);
        await appEditor.save();
        return 'ok';
    }
    async delete(params) {
        const appEditor = this.createApplicationEditor();
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
            // @ts-ignore
            result.data.tables = await database.getTableList();
        }
        return result;
    }
    async getTableInfo(params) {
        const database = this.application.getDatabase(params.database);
        const tableInfo = await database.getTableInfo(params.table);
        return { tableInfo };
    }
    async moveUp(params) {
        const appEditor = this.createApplicationEditor();
        appEditor.moveItemUp('databases', params.database);
        await appEditor.save();
        return 'ok';
    }
    async moveDown(params) {
        const appEditor = this.createApplicationEditor();
        appEditor.moveItemDown('databases', params.database);
        await appEditor.save();
        return 'ok';
    }
}
exports.DatabaseEditorController = DatabaseEditorController;
