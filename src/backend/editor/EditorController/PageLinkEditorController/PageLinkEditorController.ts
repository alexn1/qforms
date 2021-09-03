const EditorController = require('../EditorController');

class PageLinkEditorController extends EditorController {
    async save(params) {
        const appEditor = this.createApplicationEditor();
        //const pageLinkEditor = appEditor.createPageLinkEditor(params.pageLink);
        const pageLinkEditor = appEditor.createItemEditor('pageLinks', params.pageLink);
        pageLinkEditor.setAttr(params.attr, params.value);
        await appEditor.save();
        return null;
    }
    async moveUp(params) {
        const appEditor = this.createApplicationEditor();
        appEditor.moveItemUp('pageLinks', params.page);
        await appEditor.save();
        return 'ok';
    }
    async moveDown(params) {
        const appEditor = this.createApplicationEditor();
        appEditor.moveItemDown('pageLinks', params.page);
        await appEditor.save();
        return 'ok';
    }
}

export = PageLinkEditorController;
