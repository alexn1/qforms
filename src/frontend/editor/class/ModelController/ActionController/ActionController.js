class ActionController extends ModelController {
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
    async delete() {
        await this.model.delete();
        this.parent.removeAction(this);
        this.parent.editorController.treeWidget2.select(null);
        this.parent.editorController.treeWidget2.rerender();
    }
}
