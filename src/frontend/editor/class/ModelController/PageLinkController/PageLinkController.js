class PageLinkController extends ModelController {
    constructor(model, item) {
        super(model);
        this.item = item;
        this.node = true;

        this.pageController = null;

        // items
        this.items = [];
    }
    getTitle() {
        if (this.pageController) return this.pageController.getTitle();
        return super.getTitle();
    }
    hasPage() {
        return this.pageController != null;
    }
    async loadPage() {
        console.log('PageLinkController.loadPage', this.getTitle());
    }

}
