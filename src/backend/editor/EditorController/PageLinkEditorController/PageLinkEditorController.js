const EditorController = require('../EditorController');

class PageLinkEditorController extends EditorController {

    async save(params) {
        const appEditor = await this.createApplicationEditor();
        const pageLinkEditor = appEditor.createPageLinkEditor(params.pageLink);
        await pageLinkEditor.setAttr(params.attr, params.value);
        return null;
    }

    async moveUp(params) {
        const appEditor = await this.createApplicationEditor();
        appEditor.movePageLinkUp(params.page);
        await appEditor.appFile.save();
        return 'ok';
    }

    async moveDown(params) {
        const appEditor = await this.createApplicationEditor();
        appEditor.movePageLinkDown(params.page);
        await appEditor.appFile.save();
        return 'ok';
    }

}

module.exports = PageLinkEditorController;
