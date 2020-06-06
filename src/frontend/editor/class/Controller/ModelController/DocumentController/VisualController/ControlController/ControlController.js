'use strict';

class ControlController extends VisualController {

    constructor(model, item) {
        super(model);
        this.item = item;
    }

    getCaption(controlData) {
        const caption = "<span class='blue'>{class}:</span> <span class='green'>{name}</span>"
            .replace('{name}', controlData['@attributes'].name)
            .replace('{class}', controlData['@class']);
        return caption;
    }

    getActions() {
        return [
            {'action': 'delete', 'caption': 'Delete'}
        ];
    }

    getPropList() {
        const list = this.model.data['@attributes'];
        const options = {};
        options['isVisible'] = ['true', 'false'];
        options['readOnly']  = ['true', 'false'];
        options['notNull']   = ['true', 'false'];
        return {list: list, options: options};
    }

    doAction(action) {
        switch (action) {
            case 'delete':
                this.delete();
                break;
        }
    }

}
