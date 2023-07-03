"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdPageLinkController = void 0;
const EdModelController_1 = require("../EdModelController");
const EditorFrontHostApp_1 = require("../../EditorFrontHostApp/EditorFrontHostApp");
const PageEditor_1 = require("../../Editor/PageEditor/PageEditor");
const EdPageController_1 = require("../EdDocumentController/EdVisualController/EdPageController/EdPageController");
class EdPageLinkController extends EdModelController_1.EdModelController {
    constructor(model, parent) {
        super(model, parent);
        this.node = true;
        this.pageController = null;
        this.items = null;
    }
    getTitle() {
        if (this.pageController)
            return this.pageController.getTitle();
        return super.getTitle();
    }
    getStyle() {
        return {
            // fontWeight: 'bold',
            color: 'red',
        };
    }
    hasPage() {
        return this.pageController != null;
    }
    async loadPage() {
        console.debug('PageLinkController.loadPage', this.getTitle());
        if (this.pageController)
            throw new Error('page already loaded');
        const pageLink = this.model;
        const pageData = await EditorFrontHostApp_1.EditorFrontHostApp.fetchPageData(pageLink.getFileName());
        // page
        const page = new PageEditor_1.PageEditor(pageData, pageLink);
        page.init();
        // pageController
        const pageController = new EdPageController_1.EdPageController(page, this);
        pageController.init();
        this.setPageController(pageController);
        // console.debug('pageController:', pageController);
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
        if (this.pageController)
            throw new Error('pageLinkController already has pageController');
        this.pageController = pageController;
        this.items = pageController.items;
    }
    remove() {
        console.debug('PageLinkController.remove', this.getTitle());
        this.parent.removePageLink(this);
    }
}
exports.EdPageLinkController = EdPageLinkController;
