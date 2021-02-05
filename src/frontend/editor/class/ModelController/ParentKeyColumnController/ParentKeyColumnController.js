class ParentKeyColumnController extends ModelController {

    /*constructor(model) {
        super(model);
        // this.item = item;
    }*/

    getActions() {
        return [
            {'action': 'delete', 'caption': 'Delete'}
        ];
    }

    doAction(action) {
        switch (action) {
            case 'delete':
                this.delete();
                break;
        }
    }

    static async getView(view) {
        return await QForms.doHttpRequest({
            controller: 'ParentKeyColumn',
            action    : 'getView',
            params    : Helper.encodeObject({
                view: view
            })
        });
    }

}
