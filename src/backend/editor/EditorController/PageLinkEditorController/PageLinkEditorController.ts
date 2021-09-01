const EditorController = require('../EditorController');

class PageLinkEditorController extends EditorController {

    async save(params) {
        const appEditor = await this.createApplicationEditor();
        //const pageLinkEditor = appEditor.createPageLinkEditor(params.pageLink);
        const pageLinkEditor = appEditor.createItemEditor('pageLinks', params.pageLink);
        pageLinkEditor.setAttr(params.attr, params.value);
        await appEditor.save();
        return null;
    }

    async moveUp(params) {
        const appEditor = await this.createApplicationEditor();
        appEditor.movePageLinkUp(params.page);
        await appEditor.save();
        return 'ok';
    }

    async moveDown(params) {
        const appEditor = await this.createApplicationEditor();
        appEditor.movePageLinkDown(params.page);
        await appEditor.save();
        return 'ok';
    }

}

export = PageLinkEditorController;
