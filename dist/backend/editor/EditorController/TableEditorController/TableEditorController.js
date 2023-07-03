"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableEditorController = void 0;
const EditorController_1 = require("../EditorController");
class TableEditorController extends EditorController_1.EditorController {
    /*constructor(...args) {
        super(...args);
    }*/
    async _new(params) {
        console.debug('TableEditorController._new');
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        // const data = databaseEditor.newTableData(params);
        const data = databaseEditor.newItemData('Table', 'tables', params);
        await appEditor.save();
        return data;
    }
    async delete(params) {
        console.debug('TableEditorController.delete');
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const data = databaseEditor.removeColData('tables', params.table);
        await appEditor.save();
        return data;
    }
    async moveUp(params) {
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        databaseEditor.moveItemUp('tables', params.table);
        await appEditor.save();
        return 'ok';
    }
    async moveDown(params) {
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        databaseEditor.moveItemDown('tables', params.table);
        await appEditor.save();
        return 'ok';
    }
    async save(params) {
        console.debug('TableEditorController.save');
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const tableEditor = databaseEditor.createItemEditor('tables', params.table);
        tableEditor.setAttr(params.attr, params.value);
        await appEditor.save();
        return null;
    }
}
exports.TableEditorController = TableEditorController;
