'use strict';
class SdiApplicationController extends ApplicationController {
    getViewClass() {
        return SdiApplicationView;
    }
    init() {
        super.init();
        this.activePage = this.createPage();
    }
    createPage() {
        const name = Object.keys(this.model.data.pages).length ? Object.keys(this.model.data.pages)[0] : null;
        if (!name) return null;

        // model
        const page = new Page(this.model.data.pages[name], this.model, {
            id   : `p${this.getNextPageId()}`,
            modal: false
        });
        page.init();

        // controller
        const pc = PageController.create(page, this);
        pc.init();
        return pc;
    }
    findPageControllerByPageNameAndKey(pageName, key) {
        if (this.activePage && this.activePage.model.getName() === pageName && this.activePage.model.getKey() === key) {
            return this.activePage;
        }
        return null;
    }
    onPageSelect(pc) {
        console.log('SdiApplicationController.onPageSelect', pc.model.getName());
    }
    onPageCreate(pc) {
        if (this.activePage) {
            this.closePage(this.activePage);
        }
        this.activePage = pc
        this.rerender();
    }
    closePage(pageController) {
        console.log('SdiApplicationController.closePage', pageController.model.getFullName());
        if (this.modalPages.indexOf(pageController) > -1) {
            this.modalPages.splice(this.modalPages.indexOf(pageController), 1);
        } else if (this.activePage === pageController) {
            this.activePage = null;
        } else  {
            throw new Error('page not found');
        }
        this.rerender();
        pageController.deinit();
        pageController.model.deinit();
    }
}
