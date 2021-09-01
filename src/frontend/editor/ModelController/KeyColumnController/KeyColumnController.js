class KeyColumnController extends ModelController {

    /*constructor(model, parent) {
        super(model, parent);
    }*/

    getActions() {
        return [
            {'action':'delete', 'caption':'Delete'}
        ];
    }

    async doAction(name) {
        switch (name) {
            case 'delete':
                await this.delete();
                break;
        }
    }

    static async getView(view) {
        return await FrontHostApp.doHttpRequest({
            controller: 'KeyColumn',
            action    : 'getView',
            params    : {
                view: view
            }
        });
    }
    async delete() {
        await this.model.delete();
        this.parent.removeKeyColumn(this);
        EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }
}
