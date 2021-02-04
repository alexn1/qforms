class PageLinkController extends ModelController {
    constructor(model) {
        super(model);
        this.item = null;
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
        const pageController = new PageController(page);
        pageController.init();
        this.setPageController(pageController);
        console.log('pageController:', pageController);

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
    setPageController(pageController) {
        if (this.pageController) throw new Error('pageLinkController already has pageController');
        this.pageController = pageController;
        pageController.items.forEach(item => this.items.push(item));
    }
}
