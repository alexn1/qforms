const EditorController = require('../EditorController');

class DataSourceEditorController extends EditorController {

    /*constructor(...args) {
        super(...args);
    }*/

    async _new(params) {
        const appEditor = await this.createApplicationEditor();
        let data;
        if (params.page) {
            const pageEditor = await appEditor.createPageEditor(params.page);
            if (params.form) {
                const formEditor = pageEditor.createFormEditor(params.form);
                data = formEditor.newDataSourceData(params);
            } else {
                data = pageEditor.newDataSourceData(params);
            }
            await pageEditor.save();
        } else {
            data = appEditor.newDataSourceData(params);
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
                const formEditor = pageEditor.createFormEditor(params.form);
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
                const formEditor = pageEditor.createFormEditor(params.form);
                formEditor.moveDataSourceUp(params.dataSource);
                await pageEditor.save();
                return null;
            } else {
                // page data source
                pageEditor.moveDataSourceUp(params.dataSource);
                await pageEditor.save();
                return null;
            }
        } else {
            // app data source
            appEditor.moveDataSourceUp(params.dataSource);
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
                const formEditor = pageEditor.createFormEditor(params.form);
                formEditor.moveDataSourceDown(params.dataSource);
                await pageEditor.save();
                return null;
            } else {
                // page data source
                pageEditor.moveDataSourceDown(params.dataSource);
                await pageEditor.save();
                return null;
            }
        } else {
            // app data source
            appEditor.moveDataSourceDown(params.dataSource);
            await appEditor.save();
            return null;
        }
    }

    async save(params) {
        console.log('DataSourceEditorController.save');
        const dataSourceEditor = await this.createDataSourceEditor(params);
        await dataSourceEditor.setAttr(params.attr, params.value);
        await dataSourceEditor.save();
        return null;
    }

    async createDataSourceEditor(params) {
        let editor = await this.createApplicationEditor();
        if (params.pageFileName) {
            editor = await editor.createPageEditor(params.pageFileName);
            if (params.form) {
                editor = editor.createFormEditor(params.form);
            }
        }
        return editor.createDataSourceEditor(params.dataSource);
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

    /*async saveController(params) {
        const dataSourceEditor = await this.createDataSourceEditor(params);
        await dataSourceEditor.saveCustomFile('back.js', params.text);
        return null;
    }*/

    /*async createController(params) {
        const dataSourceEditor = await this.createDataSourceEditor(params);
        const backendJs = await dataSourceEditor.createBackendJs(params);
        return {backendJs};
    }*/

}

module.exports = DataSourceEditorController;
