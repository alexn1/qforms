'use strict';

const path = require('path');
const _    = require('underscore');
const EditorController = require('../EditorController');

class ParentKeyColumnEditorController extends EditorController {

    constructor(...args) {
        super(...args);
        this.viewDirPath = path.join(
            this.hostApp.publicDirPath,
            'editor/class/Controller/ModelController/ParentKeyColumnController'
        );
    }

    async _new(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPageByFileName(params.page);
        const formEditor = pageEditor.createFormEditor(params.form);
        const parentKeyColumnData = formEditor.newDataSourceParentKeyColumn(params);
        await pageEditor.save();
        return parentKeyColumnData;
    }

    async save(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPageByFileName(params.pageFileName);
        const formEditor = pageEditor.createFormEditor(params['form']);
        formEditor.setDataSourceParentKeyColumnAttr(params['dataSource'], params['parentKeyColumn'], params['attr'], params['value']);
        await pageEditor.save();
        return null;
    }

    async delete(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPageByFileName(params.page);
        const formEditor = pageEditor.createFormEditor(params['form']);
        formEditor.deleteFormDataSourceParentKeyColumn(params['dataSource'], params['parentKeyColumn']);
        await pageEditor.save();
        return null;
    }

}

module.exports = ParentKeyColumnEditorController;
