'use strict';

class KeyColumnController extends ModelController {

    constructor(model, item) {
        super(model);
        this.item = item;
    }

    getActions() {
        return [
            {'action':'delete', 'caption':'Delete'}
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
            controller: 'KeyColumn',
            action    : 'getView',
            params    : {
                view: view
            }
        });
    }

}
