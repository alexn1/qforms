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
        this.view       = view;
        this.lastPageId = 0;
        this.menuWidget       = null;
        this.tabWidget        = null;
        this.statusbarWidget  = null;
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

    initMenu() {
        const menuWidgetElement = this.view.querySelector('.MenuWidget');
        if (menuWidgetElement) {
            this.menuWidget = new MenuWidget(menuWidgetElement);
            this.menuWidget.onClick = async a => {
                try {
                    await this.openPage({name: a.dataset.page});
                } catch (err) {
                    console.error(err);
                    alert(err.message);
                }
            };
        }
        /*
        for (const name in this.model.data.menu) {
            const menu = this.model.data.menu[name];
            menu.forEach(submenu => {
                $(this.view).find(`#${this.model.getName()}-${submenu.page}`).click(async () => {
                    try {
                        await this.openPage({name: submenu.page});
                    } catch (err) {
                        console.error(err);
                        alert(err.message);
                    }
                });
            });
        }

        // logout
        $(this.view).find('#menu-logout').click(() => {
            this.model.logout();
        });*/
    }

    initStatusbar() {
        this.statusbarWidget = this.view.querySelector('.ApplicationView > .StatusbarWidget');
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
    createPageController2(model) {
        console.log('ApplicationController.createPageController2', model);
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
        if (this.statusbarWidget) {
            this.statusbarWidget.innerHTML = `Last query time: ${e.time} ms`;
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

    async openPage(args) {
        console.log('ApplicationController.openPage', args.name);
        const name            = args.name;
        const key             = args.key || null;

        // if this page with this key is already opened, then show it
        const pageController = this.findPageControllerByPageNameAndKey(name, key);
        // console.log('pageController:', pageController);
        if (pageController) {
            this.onPageSelected({source: this, pageController});
            return;
        }

        const parentPage      = args.parentPage;
        const parentPageName  = parentPage ? parentPage.name : null;
        let keyParams       = {};
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
            newMode       : !!args.newMode,
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
        this.createPageController2(page, true, parentPage !== undefined);
    }

    getNextPageId() {
        this.lastPageId++;
        return this.lastPageId;
    }
}
