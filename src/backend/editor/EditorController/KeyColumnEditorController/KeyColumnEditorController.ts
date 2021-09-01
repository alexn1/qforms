import KeyColumnEditor from '../../Editor/KeyColumnEditor/KeyColumnEditor';

const EditorController = require('../EditorController');

class KeyColumnEditorController extends EditorController {

    /*constructor(...args) {
        super(...args);
    }*/

    async _new(params) {
        const appEditor = await this.createApplicationEditor();
        if (params.page) {
            const pageEditor = await appEditor.createPageEditor(params.page);
            if (params.form) {
                const formEditor = pageEditor.createItemEditor('forms', params.form);
                // const dataSourceEditor = formEditor.createDataSourceEditor(params.dataSource);
                const dataSourceEditor = formEditor.createItemEditor('dataSources', params.dataSource);
                const data = dataSourceEditor.newKeyColumnData(params);
                await pageEditor.save();
                return data;
            } else {
                // const dataSourceEditor = pageEditor.createDataSourceEditor(params.dataSource);
                const dataSourceEditor = pageEditor.createItemEditor('dataSources', params.dataSource);
                const data = dataSourceEditor.newKeyColumnData(params);
                await pageEditor.save();
                return data;
            }
        } else {
            // const dataSourceEditor = appEditor.createDataSourceEditor(params.dataSource);
            const dataSourceEditor = appEditor.createItemEditor('dataSources', params.dataSource);
            const data = dataSourceEditor.newKeyColumnData(params);
            await appEditor.save();
            return data;
        }
    }

    async save(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        // const dataSourceEditor = formEditor.createDataSourceEditor(params.dataSource);
        const dataSourceEditor = formEditor.createItemEditor('dataSources', params.dataSource);
        const keyColumnEditor: KeyColumnEditor = dataSourceEditor.createItemEditor('keyColumns', params.keyColumn);
        keyColumnEditor.setAttr(params.attr, params.value);
        await pageEditor.save();
        return null;
    }

    async delete(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.page);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        // const dataSourceEditor = formEditor.createDataSourceEditor(params.dataSource);
        const dataSourceEditor = formEditor.createItemEditor('dataSources', params.dataSource);
        const data = dataSourceEditor.removeColData('keyColumns', params.keyColumn);
        await pageEditor.save();
        return data;
    }

}

export = KeyColumnEditorController;
