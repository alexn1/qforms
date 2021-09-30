// class MdiApplicationController extends ApplicationController {
//     constructor(model) {
//         super(model);
//         this.pages = null;
//         this.tab = null;
//     }
//     init() {
//         super.init();
//         this.pages = this.createPages();
//         this.activePage = this.pages.length ? this.pages[0] : null;
//     }
//     deinit() {
//         // TabWidget
//         /*this.tabWidget.off('tabClosingByUser', this.listeners.tabClosingByUser);
//         this.tabWidget.off('tabShow', this.listeners.tabShow);
//         this.tabWidget.off('tabHide', this.listeners.tabHide);*/
//         super.deinit();
//     }
//     getViewClass() {
//         return MdiApplicationView;
//     }
//     /*onTabShow(e) {
//         // console.log('ApplicationController.onTabShow', e.tab.pageController);
//         if (e.tab.pageController) {
//             e.tab.pageController.emit('show', {source: this});
//         }
//     }*/
//
//     /*onTabHide(e) {
//         if (e.tab.pageController) {
//             e.tab.pageController.emit('hide', {source: this});
//         }
//     }*/
//     onTabCreate = tab => {
//         // console.log('MdiApplicationController.onTabCreate', tab);
//         this.tab = tab;
//     }
//     onTabMouseDown = i => {
//         // console.log('MdiApplicationController.onTabMouseDown');
//         if (this.activePage !== this.pages[i]) {
//             this.activePage = this.pages[i];
//             this.rerender();
//         }
//     }
//     createPages() {
//         return this.model.data.pages.map(pageData => {
//             const page = new Page(pageData, this.model, {
//                 id   : `p${this.getNextPageId()}`,
//                 modal: false
//             });
//             page.init();
//
//             // controller
//             const pageController = PageController.create(page, this);
//             pageController.init();
//             return pageController;
//         });
//     }
//     onPageSelect(pc) {
//         console.log('ApplicationController.onPageSelect', pc.model.getName());
//         const i = this.pages.indexOf(pc);
//         if (i === -1) throw new Error(`no page controller ${pc.model.getName()} in pages`);
//         this.activePage = pc;
//         this.tab.rerender();
//     }
//     getActivePageIndex = () => {
//         const i = this.activePage ? this.pages.indexOf(this.activePage) : null;
//         if (i === -1) throw new Error('active page not in list');
//         return i;
//     }
//     closePage(pageController) {
//         // console.log('ApplicationController.closePage', pageController.model.getFullName());
//         if (this.pages.indexOf(pageController) > -1) {
//             this.pages.splice(this.pages.indexOf(pageController), 1);
//             if (this.activePage === pageController) {
//                 this.activePage = this.pages[this.pages.length - 1];
//             }
//         } else if (this.modalPages.indexOf(pageController) > -1) {
//             this.modalPages.splice(this.modalPages.indexOf(pageController), 1);
//         } else {
//             throw new Error('page not found');
//         }
//         this.rerender();
//         pageController.deinit();
//         pageController.model.deinit();
//     }
//     onTabClose = i => {
//         console.log('ApplicationController.onTabClose', this.pages[i].model.getFullName());
//         this.closePage(this.pages[i]);
//     }
//     findPageControllerByPageNameAndKey(pageName, key) {
//         return this.pages.find(({model}) => model.getName() === pageName && model.getKey() === key);
//     }
//     addPage(pc) {
//         this.pages.push(this.activePage = pc);
//     }
// }
//
// window.QForms.MdiApplicationController = MdiApplicationController;
