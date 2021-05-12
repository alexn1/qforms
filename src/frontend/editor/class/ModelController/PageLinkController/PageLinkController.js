class PageLinkController extends ModelController {
    constructor(model, parent) {
        super(model, parent);
        this.node = true;
        this.pageController = null;
        this.items = null;
    }
    getTitle() {
        if (this.pageController) return this.pageController.getTitle();
        return super.getTitle();
    }
    getStyle() {
        return {color: 'red'};
    }
    hasPage() {
        return this.pageController != null;
    }
    async loadPage() {
        console.log('PageLinkController.loadPage', this.getTitle());
        if (this.pageController) throw new Error('page already loaded');
        const pageLink = this.model;
        const pageData = await EditorController.fetchPageData(pageLink.getFileName());

        // page
        const page = new Page(pageData, pageLink);
        page.init();

        // pageController
        const pageController = new PageController(page, this);
        pageController.init();
        this.setPageController(pageController);
        // console.log('pageController:', pageController);

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
        this.items = pageController.items;
    }
    remove() {
        console.log('PageLinkController.remove', this.getTitle());
        this.parent.removePageLink(this);
    }
}
