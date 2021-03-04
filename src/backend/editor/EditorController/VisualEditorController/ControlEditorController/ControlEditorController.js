const path = require('path');
const VisualEditorController = require('../VisualEditorController');

class ControlEditorController extends VisualEditorController {

    constructor(...args) {
        super(...args);
        /*this.viewDirPath = path.join(
            this.hostApp.publicDirPath,
            'editor/class/Controller/ModelController/DocumentController/VisualController/ControlController'
        );*/
    }

    async _new(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPageByFileName(params.pageFileName);
        const formEditor = pageEditor.createFormEditor(params.form);
        const controlData = await formEditor.createControl(params);
        return controlData;
    }

    async save(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPageByFileName(params.pageFileName);
        const formEditor = pageEditor.createFormEditor(params.form);
        const controlEditor = formEditor.createControlEditor(params.control);
        await controlEditor.setAttr(params['attr'], params['value']);
        return null;
    }

    async delete(params) {
        const appEditor = await this.createApplicationEditor();
        const pageEditor = await appEditor.getPageByFileName(params.pageFileName);
        const formEditor = pageEditor.createFormEditor(params.form);
        await formEditor.removeControl(params.control);
        return null;
    }

}

module.exports = ControlEditorController;
