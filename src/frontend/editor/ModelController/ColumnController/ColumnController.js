class ColumnController extends ModelController {
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
            controller: 'Column',
            action    : 'getView',
            params    : {
                view: view
            }
        });
    }
    getPropList() {
        const propList = super.getPropList();
        propList.options['key']      = ['true', 'false'];
        propList.options['auto']     = ['true', 'false'];
        propList.options['nullable'] = ['true', 'false'];
        propList.options['type']     = ['', 'string', 'number', 'boolean', 'object', 'date'];
        /*propList.options['dbType']   = [
            '',
            'integer',
            'character varying',
            'boolean',
            'timestamp with time zone',
            'text',
            'json',
        ];*/
        return propList;
    }
    async delete() {
        await this.model.delete();
        this.parent.removeColumn(this);
        EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }
}
