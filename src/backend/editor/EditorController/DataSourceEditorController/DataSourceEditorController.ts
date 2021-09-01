const EditorController = require('../EditorController');

class DataSourceEditorController extends EditorController {

    /*constructor(...args) {
        super(...args);
    }*/

    async createDataSourceEditor(params) {
        let editor: any = await this.createApplicationEditor();
        if (params.pageFileName) {
            editor = await editor.createPageEditor(params.pageFileName);
            if (params.form) {
                editor = editor.createItemEditor('forms', params.form);
            }
        }
        return editor.createItemEditor('dataSources', params.dataSource);
    }

    async _new(params) {
        const appEditor = await this.createApplicationEditor();
        let data;
        if (params.page) {
            const pageEditor = await appEditor.createPageEditor(params.page);
            if (params.form) {
                const formEditor = pageEditor.createItemEditor('forms', params.form);
                data = formEditor.newItemData(params.class, 'dataSources', params);
            } else {
                data = pageEditor.newItemData(params.class,  'dataSources', params);
            }
            await pageEditor.save();
        } else {
            data = appEditor.newItemData(params.class, 'dataSources', params);
            await appEditor.save();
        }
        return data;
    }

    async delete(params) {
        const appEditor = await this.createApplicationEditor();
        let data;
        if (params.page) {
            const pageEditor = await appEditor.createPageEditor(params.page);
            if (params.form) {
                const formEditor = pageEditor.createItemEditor('forms', params.form);
                data = formEditor.removeColData('dataSources', params.dataSource);
            } else {
                data = pageEditor.removeColData('dataSources', params.dataSource);
            }
            await pageEditor.save();
        } else {
            data = appEditor.removeColData('dataSources', params.dataSource);
            await appEditor.save();
        }
        return data;
    }

    async moveUp(params) {
        const appEditor = await this.createApplicationEditor();
        if (params.page) {
            const pageEditor = await appEditor.createPageEditor(params.page);
            if (params.form) {
                // form data source
                const formEditor = pageEditor.createItemEditor('forms', params.form);
                formEditor.moveItemUp('dataSources', params.dataSource);
                await pageEditor.save();
                return null;
            } else {
                // page data source
                pageEditor.moveItemUp('dataSources', params.dataSource);
                await pageEditor.save();
                return null;
            }
        } else {
            // app data source
            appEditor.moveItemUp('dataSources', params.dataSource);
            await appEditor.save();
            return null;
        }
    }

    async moveDown(params) {
        const appEditor = await this.createApplicationEditor();
        if (params.page) {
            const pageEditor = await appEditor.createPageEditor(params.page);
            if (params.form) {
                // form data source
                const formEditor = pageEditor.createItemEditor('forms', params.form);
                formEditor.moveItemDown('dataSources', params.dataSource);
                await pageEditor.save();
                return null;
            } else {
                // page data source
                pageEditor.moveItemDown('dataSources', params.dataSource);
                await pageEditor.save();
                return null;
            }
        } else {
            // app data source
            appEditor.moveItemDown('dataSources', params.dataSource);
            await appEditor.save();
            return null;
        }
    }

    async save(params) {
        console.log('DataSourceEditorController.save');
        const dataSourceEditor = await this.createDataSourceEditor(params);
        dataSourceEditor.setAttr(params.attr, params.value);
        await dataSourceEditor.save();
        return null;
    }

    async createModelBackJs(params) {
        const dataSourceEditor = await this.createDataSourceEditor(params);
        const js = await dataSourceEditor.createModelBackJs(params);
        return {js};
    }

    async getView(params) {
        const result = await super.getView(params);
        switch (params.view) {
            /*case 'QueryView.ejs':
                const dataSourceEditor = await this.createDataSourceEditor(params);
                const backendJs = await dataSourceEditor.getCustomFile('back.js');
                result.data.backendJs = backendJs;
                return result;*/
            default:
                return result;
        }
    }

    /*async createController(params) {
        const dataSourceEditor = await this.createDataSourceEditor(params);
        const backendJs = await dataSourceEditor.createBackendJs(params);
        return {backendJs};
    }*/

    /*async saveController(params) {
        const dataSourceEditor = await this.createDataSourceEditor(params);
        await dataSourceEditor.saveCustomFile('back.js', params.text);
        return null;
    }*/

}

export = DataSourceEditorController;
