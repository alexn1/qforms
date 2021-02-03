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
        const pageLink = this.model;
        const pageData = await EditorController.fetchPageData(pageLink.getFileName());

        // page
        const page = new Page(pageData, pageLink.parent, pageLink);
        page.init();

        // pageController
        const pageController = this.pageController = new PageController(page, null, pageLink);
        pageController.init();
        console.log('pageController:', pageController);

        pageController.items.forEach(item => this.items.push(item));
        this.view.rerender();
    }
    getActions() {
        return this.pageController.getActions();
    }
    getPropList() {
        return this.pageController.getPropList();
    }
    async setProperty(name, value) {
        this.pageController.setProperty(name, value);
    }

}
