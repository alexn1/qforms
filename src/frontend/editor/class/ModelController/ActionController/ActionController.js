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
        EditorController.editorController.treeWidget2.select(null);
        EditorController.editorController.treeWidget2.rerender();
    }
}
