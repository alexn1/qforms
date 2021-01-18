class ColumnController extends ModelController {

    constructor(model, item) {
        super(model);
        this.item = item;
    }

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
        return await QForms.doHttpRequest({
            controller: 'Column',
            action    : 'getView',
            params    : Helper.encodeObject({
                view: view
            })
        });
    }

    getPropList() {
        const propList = super.getPropList();
        propList.options['key']      = ['true', 'false'];
        propList.options['auto']     = ['true', 'false'];
        propList.options['nullable'] = ['true', 'false'];
        return propList;
    }

}
