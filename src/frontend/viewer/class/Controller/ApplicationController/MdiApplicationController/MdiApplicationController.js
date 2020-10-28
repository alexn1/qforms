'use strict';
class MdiApplicationController extends ApplicationController {
    constructor(model) {
        super(model);
        this.tab = null;
    }
    deinit() {
        // TabWidget
        /*this.tabWidget.off('tabClosingByUser', this.listeners.tabClosingByUser);
        this.tabWidget.off('tabShow', this.listeners.tabShow);
        this.tabWidget.off('tabHide', this.listeners.tabHide);*/
        super.deinit();
    }
    /*onTabShow(e) {
        // console.log('ApplicationController.onTabShow', e.tab.pageController);
        if (e.tab.pageController) {
            e.tab.pageController.emit('show', {source: this});
        }
    }*/

    /*onTabHide(e) {
        if (e.tab.pageController) {
            e.tab.pageController.emit('hide', {source: this});
        }
    }*/
    onTabCreate = tab => {
        // console.log('ApplicationController.onTabCreate', tab);
        this.tab = tab;
    }
    onTabMouseDown = i => {
        // console.log('PageController.onTabMouseDown');
        if (this.activePage !== this.pages[i]) {
            this.activePage = this.pages[i];
            this.rerender();
        }
    }
}
