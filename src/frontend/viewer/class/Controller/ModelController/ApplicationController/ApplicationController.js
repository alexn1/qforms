'use strict';

class ApplicationController extends ModelController {

    static create(model, view) {
        // console.log('ApplicationController.create');
        console.log('debug:', ApplicationController.isInDebugMode());
        if (model.data.js) {
            const CustomClass = eval(model.data.js);
            if (!CustomClass) throw new Error(`custom class of "${model.getFullName()}" form does not return type`);
            return new CustomClass(model, view);
        }
        return eval(`new ${model.getClassName()}Controller(model, view)`);
    }

    constructor(model, view) {
        // console.log('ApplicationController.constructor', model, view);
        super(model);
        this.view = view;
        this.lastPageId = 0;
        this.menu       = null;
        this.tabWidget  = null;
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

        // app
        this.model.on('logout' , this.listeners.logout  = this.onLogout.bind(this));
        this.model.on('request', this.listeners.request = this.onRequest.bind(this));

        this.initMenu();
        this.initStatusbar();
        this.initTab();
        this.createPages();
    }

    getMenuItemsProp() {
        return Object.keys(this.model.data.menu).map(key => ({
            name: key,
            title: key,
            items: this.model.data.menu[key].map(item => ({
                name: item.page,
                title: item.caption
            }))
        }));
    }

    initMenu() {
        this.menu = ApplicationController.createReactComponent(this.view.querySelector('.Menu'), Menu, {
            items: this.getMenuItemsProp(),
            onClick: this.onMenuItemClick.bind(this),
            cb: menu => this.menu = menu
        });
        // setTimeout(() => this.menu.toggleMenu('Pages'), 1000);
    }

    initStatusbar() {
        this.statusbar = ApplicationController.createReactComponent(this.view.querySelector('.Statusbar'), Statusbar);
    }

    initTab() {
        this.tabWidget = new TabWidget(this.view.querySelector('.ApplicationView > .TabWidget'));
        this.tabWidget.init();
        this.tabWidget.on('tabClosingByUser', this.listeners.tabClosingByUser = this.onTabClosingByUser.bind(this));
        this.tabWidget.on('tabShow'         , this.listeners.tabShow = this.onTabShow.bind(this));
        this.tabWidget.on('tabHide'         , this.listeners.tabHide = this.onTabHide.bind(this));
    }

    createPages() {
        for (const name in this.model.data.pages) {
            const page = new Page({
                app : this.model,
                data: this.model.data.pages[name],
                id  : `p${this.getNextPageId()}`
            });
            page.init();
            this.createPageController(page);
        }
    }

    deinit() {
        // app
        this.model.off('logout', this.listeners.logout);
        this.model.off('request', this.listeners.request);

        // TabWidget
        this.tabWidget.off('tabClosingByUser', this.listeners.tabClosingByUser);
        this.tabWidget.off('tabShow', this.listeners.tabShow);
        this.tabWidget.off('tabHide', this.listeners.tabHide);
        super.deinit();
    }

    createPageController(model, select = false, track = false) {
        console.log('ApplicationController.createPageController', model);
        const html = QForms.render(model.data.view, {model});
        const view = $(html).get(0);

        // tab
        const tab = this.tabWidget.createTab(view);
        if (select) this.tabWidget.selectTab(tab, track);

        // pageController
        const pageController = PageController.create(model, view, this);
        tab.pageController = pageController;
        pageController.tab = tab;
        pageController.init();
        pageController.fill();
    }
    createModalPageController(model) {
        console.log('ApplicationController.createModalPageController', model);
        const html = QForms.render(model.data.view, {model});
        const view = $(html).get(0);

        const el = ModalWidget.createElement(view);
        this.view.appendChild(el);
        const modal = new ModalWidget(el);

        // pageController
        const pageController = PageController.create(model, view, this);
        pageController.modal = modal;
        pageController.init();
        pageController.fill();
    }

    onPageSelected(e) {
        console.log('ApplicationController.onPageSelected');
        const tab = this.findTabByPageController(e.pageController);
        this.tabWidget.selectTab(tab);
    }

    onTabClosingByUser(e) {
        e.tab.pageController.close();
    }

    onTabShow(e) {
        // console.log('ApplicationController.onTabShow', e.tab.pageController);
        if (e.tab.pageController) {
            e.tab.pageController.emit('show', {source: this});
        }
    }

    onTabHide(e) {
        if (e.tab.pageController) {
            e.tab.pageController.emit('hide', {source: this});
        }
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
        console.log('ApplicationController.closePage', pageController.model.getFullName());
        if (pageController.tab) {
            this.tabWidget.closeTab(pageController.tab);
        } else if (pageController.modal) {
            pageController.modal.close();
        }
        pageController.deinit();
        pageController.model.deinit();
    }

    findPageControllerByPageNameAndKey(pageName, key) {
        // console.log('ApplicationController.findPageControllerByPageNameAndKey', pageName, key);
        for (let i = 0; i < this.tabWidget.tabList.childNodes.length; i++) {
            const tab = this.tabWidget.tabList.childNodes[i];
            if (tab.pageController.model.getName() === pageName && tab.pageController.model.getKey() === key) {
                return tab.pageController;
            }
        }
        return null;
    }

    findTabByPageController(pageController) {
        // console.log('ApplicationController.findTabByPageController');
        for (let i = 0; i < this.tabWidget.tabList.childNodes.length; i++) {
            const tab = this.tabWidget.tabList.childNodes[i];
            if (tab.pageController === pageController) {
                return tab;
            }
        }
        return null;
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
            this.onPageSelected({source: this, pageController});
            return;
        }

        const parentPageName = parentPage ? parentPage.getName() : null;
        let keyParams = {};
        const params = {};
        //console.log('open ' + name + ' with key: ' + key);
        if (key) {
            keyParams = QForms.keyToParams(key);
            for (const keyName in keyParams) {
                params[keyName] = keyParams[keyName];
            }
        }

        // if page doesn't exist, create it
        const response = await this.model.request({
            action        : 'page',
            page          : name,
            newMode       : newMode,
            parentPageName: parentPageName,
            params        : params
        });

        // copy params from parent page to make possible refer to parent page params
        if (parentPage !== undefined) {
            for (const name in parentPage.params) {
                if (keyParams[name] === undefined) {
                    params[name] = parentPage.params[name];
                }
            }
        }
        const page = new Page({
            app           : this.model,
            data          : response.page,
            id            : `p${this.getNextPageId()}`,
            params        : params,
            parentPageName: parentPageName,
        });
        page.init();
        if (modal) {
            this.createModalPageController(page);
        } else {
            this.createPageController(page, true, parentPage !== undefined);
        }
    }

    getNextPageId() {
        this.lastPageId++;
        return this.lastPageId;
    }

    async onMenuItemClick(menu, item) {
        console.log('ApplicationController.onMenuItemClick', menu, item);
        try {
            await this.openPage({name: item});
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    // static createReactRoot(name, props, children) {
    //     console.log('ApplicationController.createReactRoot', name, props);
    //     const div = document.createElement('div');
    //     div.className = name;
    //     ReactDOM.render(React.createElement(eval(name), props, children), div);
    //     return div;
    // }

    static createReactComponent(root, type, props = {}, children) {
        // console.log('ApplicationController.createReactComponent', root, type);
        let component;
        props.cb = c => component = c;
        const reactElement = React.createElement(type, props, children);
        ReactDOM.render(reactElement, root);
        return component;
    }
}
