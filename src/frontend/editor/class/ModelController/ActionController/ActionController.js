class ActionController extends ModelController {
    /*constructor(model, parent) {
        super(model, parent);
    }*/
    getActions() {
        return [
            {'action': 'moveUp'     , 'caption': 'Move Up'     },
            {'action': 'moveDown'   , 'caption': 'Move Down'   },
            {'action': 'delete', 'caption': 'Delete'}
        ];
    }
    async doAction(name) {
        switch (name) {
            case 'delete':
                await this.delete();
                break;
            case 'moveUp':
                await this.model.moveUp();
                this.parent.moveColItem('actions', this, -1);
                EditorController.editorController.treeWidget2.rerender();
                break;
            case 'moveDown':
                await this.model.moveDown();
                this.parent.moveColItem('actions', this, 1);
                EditorController.editorController.treeWidget2.rerender();
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
