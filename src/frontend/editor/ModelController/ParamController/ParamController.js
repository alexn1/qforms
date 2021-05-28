class ParamController extends ModelController {

    /*constructor(model, parent) {
        super(model, parent);
    }*/

    getActions() {
        return [
            {'action': 'delete', 'caption': 'Delete'}
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
            controller: 'Param',
            action    : 'getView',
            params    : Helper.encodeObject({
                view: view
            })
        });
    }
    async delete() {
        await this.model.delete();
        this.parent.removeParam(this);
        EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }
}
