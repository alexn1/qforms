import { EditorController } from '../EditorController';
import { debug } from '../../../../console';

export class ColumnEditorController extends EditorController {
    /* constructor(...args) {
        debug('ColumnEditorController.constructor');
        super(...args);
    } */

    async save(params) {
        debug('ColumnEditorController.save');
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const tableEditor = databaseEditor.createItemEditor('tables', params.table);
        const columnEditor = tableEditor.createItemEditor('columns', params.column);
        columnEditor.setAttr(params.attr, params.value);
        await appEditor.save();
        return 'ok';
    }

    async _new(params) {
        debug('ColumnEditorController._new');
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const tableEditor = databaseEditor.createItemEditor('tables', params.table);
        const columnData = tableEditor.newItemData('Column', 'columns', params);
        await appEditor.save();
        return columnData;
    }

    async delete(params) {
        debug('ColumnEditorController.delete');
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const tableEditor = databaseEditor.createItemEditor('tables', params.table);
        const data = tableEditor.removeColData('columns', params.column);
        await appEditor.save();
        return data;
    }
}
