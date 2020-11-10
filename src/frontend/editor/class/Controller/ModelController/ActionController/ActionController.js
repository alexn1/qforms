class ActionController extends ModelController {
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
}