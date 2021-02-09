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
                this.delete();
                break;
        }
    }

    static async getView(view) {
        return await QForms.doHttpRequest({
            controller: 'KeyColumn',
            action    : 'getView',
            params    : Helper.encodeObject({
                view: view
            })
        });
    }
    async delete() {
        await this.model.delete();
        this.parent.removeKeyColumn(this);
        this.parent.parent.editorController.treeWidget2.select(null);
        this.parent.parent.editorController.treeWidget2.rerender();
    }
}
