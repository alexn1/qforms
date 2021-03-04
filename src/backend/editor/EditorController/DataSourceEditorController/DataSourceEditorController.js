const path = require('path');
const _    = require('underscore');
const EditorController = require('../EditorController');

class DataSourceEditorController extends EditorController {

    constructor(...args) {
        super(...args);
        this.viewDirPath = path.join(
            this.hostApp.publicDirPath,
            'editor/class/Controller/ModelController/DocumentController/DataSourceController/view'
        );
    }

    async _new(params) {
        const appEditor = await this.createApplicationEditor();
        if (params.page) {
            const pageEditor = await appEditor.getPageByFileName(params.page);
            if (params.form) {
                // form data source
                const formEditor = pageEditor.createFormEditor(params.form);
                const dataSourceData  = formEditor.newDataSourceData(params);
                const dataSourceEditor = formEditor.createDataSourceEditor(params.name);
                await pageEditor.save();
                return dataSourceEditor.getData();
            } else {
                // page data source
                const dataSourceData = pageEditor.newDataSourceData(params);
                await pageEditor.save();
                return dataSourceData;
            }
        } else {
            // app data source
            const dataSourceData = appEditor.newDataSourceData(params);
            await appEditor.save();
            return dataSourceData;
        }
    }

    async delete(params) {
        const appEditor = await this.createApplicationEditor();
        if (params.page) {
            const pageEditor = await appEditor.getPageByFileName(params.page);
            if (params.form) {
                // form data source
                const formEditor = pageEditor.createFormEditor(params['form']);
                formEditor.deleteFormDataSource(params['dataSource']);
                await pageEditor.save();
                return null;
            } else {
                // page data source
                pageEditor.deleteDataSource(params['dataSource']);
                await pageEditor.save();
                return null;
            }
        } else {
            // app data source
            appEditor.deleteDataSource(params.dataSource);
            await appEditor.save();
            return null;
        }
    }

    async moveUp(params) {
        const appEditor = await this.createApplicationEditor();
        if (params.page) {
            const pageEditor = await appEditor.getPageByFileName(params.page);
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
            await appEditor.appFile.save();
            return null;
        }
    }

    async moveDown(params) {
        const appEditor = await this.createApplicationEditor();
        if (params.page) {
            const pageEditor = await appEditor.getPageByFileName(params.page);
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
            await appEditor.appFile.save();
            return null;
        }
    }

    async save(params) {
        console.log('DataSourceEditorController.save');
        let editor = await this.createApplicationEditor();
        if (params.pageFileName) {
            editor = await editor.getPageByFileName(params.pageFileName);
            if (params.form) {
                editor = editor.createFormEditor(params.form);
            }
        }
        const dataSourceEditor = editor.createDataSourceEditor(params.dataSource);
        await dataSourceEditor.setAttr(params.attr, params.value);
        return null;
    }

    async createDataSourceEditor(params) {
        let editor = await this.createApplicationEditor();
        if (params.pageFileName) {
            editor = await editor.getPageByFileName(params.pageFileName);
            if (params.form) {
                editor = editor.createFormEditor(params.form);
            }
        }
        return editor.createDataSourceEditor(params.dataSource);
    }

    async getView(params) {
        const result = await super.getView(params);
        switch (params.view) {
            case 'QueryView.ejs':
                const dataSourceEditor = await this.createDataSourceEditor(params);
                const backendJs = await dataSourceEditor.getCustomFile('back.js');
                result.data.backendJs = backendJs;
                return result;
            default:
                return result;
        }
    }

    async saveController(params) {
        const dataSourceEditor = await this.createDataSourceEditor(params);
        await dataSourceEditor.saveCustomFile('back.js', params.text);
        return null;
    }

    async createController(params) {
        const dataSourceEditor = await this.createDataSourceEditor(params);
        const backendJs = await dataSourceEditor.createBackendJs(params);
        return {backendJs};
    }

}

module.exports = DataSourceEditorController;
