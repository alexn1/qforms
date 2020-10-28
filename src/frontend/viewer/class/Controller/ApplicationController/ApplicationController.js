'use strict';

class ApplicationController extends Controller {

    static create(model) {
        // console.log('ApplicationController.create', 'debug:', ApplicationController.isInDebugMode());
        if (model.data.js) {
            const CustomClass = eval(model.data.js);
            if (!CustomClass) throw new Error(`custom class of "${model.getFullName()}" form does not return type`);
            return new CustomClass(model);
        }
        return new MdiApplicationController(model);
    }

    constructor(model) {
        // console.log('ApplicationController.constructor', model, view);
        super(model, null);
        this.lastPageId = 0;
        this.pages      = null;
        this.modalPages = [];
        this.activePage = null;
        this.statusbar  = null;
    }

    static getSearchObj() {
        // console.log('ApplicationController.getSearchObj:', window.location);
        if (!window.location.search.split('?')[1]) return {};
        return window.location.search.split('?')[1].split('&').reduce((acc, item) => {
            const kv = item.split('=');
            acc[kv[0]] = kv[1];
            return acc;
        }, {});
    }

    static isInDebugMode() {
        return ApplicationController.getSearchObj()['debug'] === '1';
    }

    init() {
        // console.log('ApplicationController.init');
        this.model.on('logout' , this.listeners.logout  = this.onLogout.bind(this));
        this.model.on('request', this.listeners.request = this.onRequest.bind(this));
        this.pages = this.createPages();
        this.activePage = this.pages.length ? this.pages[0] : null;
    }

    getActivePageIndex = () => {
        const i = this.activePage ? this.pages.indexOf(this.activePage) : null;
        if (i === -1) throw new Error('active page not in list');
        return i;
    }

    createView(root) {
        console.log('ApplicationController.createView');
        this.view = Helper.createReactComponent(root, this.getViewClass(), {ctrl: this});
        if (this.statusbar) {
            this.statusbar.setLastQueryTime(this.model.data.time);
        }
    }
    getViewClass() {
        return ApplicationView;
    }
    getMenuItemsProp() {
        return Object.keys(this.model.data.menu).map(key => ({
            name : key,
            title: key,
            items: this.model.data.menu[key].map(item => ({
                name : item.page,
                title: item.caption
            }))
        }));
    }

    createPages() {
        return Object.keys(this.model.data.pages).map(name => {
            // model
            const page = new Page(this.model.data.pages[name], this.model, {
                id   : `p${this.getNextPageId()}`,
                modal: false
            });
            page.init();

            // controller
            const pageController = PageController.create(page, this);
            pageController.init();
            return pageController;
        });
    }

    deinit() {
        this.model.off('logout', this.listeners.logout);
        this.model.off('request', this.listeners.request);
        super.deinit();
    }

    onPageSelect(pc) {
        console.log('ApplicationController.onPageSelect', pc.model.getName());
        const i = this.pages.indexOf(pc);
        if (i === -1) throw new Error(`no page controller ${pc.model.getName()} in pages`);
        this.activePage = pc;
        this.tab.rerender();
    }

    onLogout(ea) {
        location.reload();
    }

    onRequest(e) {
        // console.log('onRequest', e);
        if (this.statusbar) {
            this.statusbar.setLastQueryTime(e.time);
        }
    }

    closePage(pageController) {
        // console.log('ApplicationController.closePage', pageController.model.getFullName());
        if (this.pages.indexOf(pageController) > -1) {
            this.pages.splice(this.pages.indexOf(pageController), 1);
            if (this.activePage === pageController) {
                this.activePage = this.pages[this.pages.length - 1];
            }
        } else if (this.modalPages.indexOf(pageController) > -1) {
            this.modalPages.splice(this.modalPages.indexOf(pageController), 1);
        } else {
            throw new Error('page not found');
        }
        this.rerender();
        pageController.deinit();
        pageController.model.deinit();
    }

    onPageClose = i => {
        console.log('ApplicationController.onPageClose', this.pages[i].model.getFullName());
        this.closePage(this.pages[i]);
    }

    findPageControllerByPageNameAndKey(pageName, key) {
        return this.pages.find(({model}) => model.getName() === pageName && model.getKey() === key);
    }

    async openPage(options) {
        console.log('ApplicationController.openPage', options);
        const name       = options.name;
        const key        = options.key || null;
        const parentPage = options.parentPage;
        const newMode    = !!options.newMode;
        const modal      = !!options.modal;

        // if this page with this key is already opened, then show it
        const pageController = this.findPageControllerByPageNameAndKey(name, key);
        // console.log('pageController:', pageController);
        if (pageController) {
            this.onPageSelect(pageController);
            return;
        }
        const parentPageName = parentPage ? parentPage.getName() : null;

        const params = {
            ...(parentPage ? parentPage.params : {}),
            ...(key ? QForms.keyToParams(key) : {})
        };
        //console.log('open ' + name + ' with key: ' + key);

        const response = await this.model.request({
            action        : 'page',
            page          : name,
            newMode       : newMode,
            parentPageName: parentPageName,
            params        : Helper.encodeObject(params)
        });

        const page = new Page(response.page, this.model, {
            id            : `p${this.getNextPageId()}`,
            params        : params,
            parentPageName: parentPageName,
            modal         : modal
        });
        page.init();
        const pc = PageController.create(page, this);
        pc.init();
        modal ? this.modalPages.push(pc) : this.pages.push(this.activePage = pc);
        this.rerender();
        // console.log('pc:', pc);
    }

    getNextPageId() {
        this.lastPageId++;
        return this.lastPageId;
    }

    onMenuItemClick = async (menu, item) => {
        // console.log('ApplicationController.onMenuItemClick', menu, item);
        try {
            await this.openPage({name: item});
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    onStatusbarCreate = statusbar => {
        this.statusbar = statusbar;
    }
}
