class PageLinkController extends ModelController {
    constructor(model, item) {
        super(model);
        this.item = item;
    }
    getItem() {
        return {
            ctrl : this,
            title: this.model.getName(),
            items: []
        };
    }
}
