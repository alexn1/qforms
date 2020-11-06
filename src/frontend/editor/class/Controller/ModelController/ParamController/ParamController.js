'use strict';

class ParamController extends ModelController {

    constructor(model, item) {
        super(model);
        this.item = item;
    }

    getActions() {
        return [
            {'action': 'delete', 'caption': 'Delete'}
        ];
    }

    doAction(name) {
        switch (name) {
            case 'delete':
                this.delete();
                break;
        }
    }

    static async getView(view) {
        return await QForms.doHttpRequest({
            controller: 'Param',
            action    : 'getView',
            params    : Helper.encodeObject({
                view: view
            })
        });
    }

}
