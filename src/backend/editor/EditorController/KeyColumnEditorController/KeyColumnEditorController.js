'use strict';

const path = require('path');
const fs   = require('fs');
const _    = require('underscore');
const EditorController = require('../EditorController');

class KeyColumnEditorController extends EditorController {

    constructor(...args) {
        super(...args);
        this.viewDirPath = path.join(
            this.hostApp.publicDirPath,
            'editor/class/Controller/ModelController/KeyColumnController'
        );
    }

    async _new(params) {
        const appEditor = await this.createApplicationEditor();
        if (params.page) {
            const pageEditor = await appEditor.getPageByFileName(params.page);
            if (params.form) {
                const formEditor = pageEditor.getForm(params.form);
                const keyColumnData = formEditor.newDataSourceKeyColumn(params);
                await pageEditor.save();
                return keyColumnData;
            } else {
                const dataSourceEditor = pageEditor.createDataSourceEditor(params.dataSource);
                const keyColumnData = dataSourceEditor.newKeyColumn(params);
                await pageEditor.save();
                return keyColumnData;
            }
        } else {
            const dataSourceEditor = appEditor.createDataSourceEditor(params.dataSource);
            const keyColumnData = dataSourceEditor.newKeyColumn(params);
            await appEditor.appFile.save();
            return keyColumnData;
        }
    }

    async save(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPageByFileName(params.pageFileName);
        const formEditor = pageEditor.getForm(params.form);
        formEditor.setDataSourceKeyColumnAttr(params['dataSource'], params['keyColumn'], params['attr'], params['value']);
        await pageEditor.save();
        return null;
    }

    async delete(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPageByFileName(params.page);
        const formEditor = pageEditor.getForm(params['form']);
        formEditor.deleteFormDataSourceKeyColumn(params['dataSource'], params['keyColumn']);
        await pageEditor.save();
        return null;
    }

}

module.exports = KeyColumnEditorController;
