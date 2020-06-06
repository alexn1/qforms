'use strict';

class ApplicationController extends ModelController {
    constructor(model, view) {
        super(model);
        this.view  = view;
        this.appTC = null;
        this.statusbar = null;
        this.lastPageId = 0;
    }

    static create(model, view) {
        const customClassName   = '{app}Controller'.replace('{app}', model.name);
        const typeOfCustomClass = 'typeof({customClassName})'.replace('{customClassName}', customClassName);
        const custom            = 'new {customClassName}(model, view)'.replace('{customClassName}', customClassName);
        const general           = 'new {class}Controller(model, view)'.replace('{class}', model.data.class);
        let obj;
        if (model.data.js !== undefined) {
            if (eval(typeOfCustomClass) === 'function') {
                obj = eval(custom);
            } else {
                $.globalEval(model.data.js);
                obj = (eval(typeOfCustomClass) === 'function') ? eval(custom) : eval(general);
            }
        } else {
            obj = eval(general);
        }
        return obj;
    }

    init() {
        console.log('ApplicationController.init');

        // appTC
        this.appTC = new TabWidget(this.view.querySelector('#appTC'));
        this.appTC.init();
        this.appTC.on('tabClosingByUser', this.listeners.tabClosingByUser = this.onTabClosingByUser.bind(this));
        this.appTC.on('tabShow', this.listeners.tabShow = this.onTabShow.bind(this));
        this.appTC.on('tabHide', this.listeners.tabHide = this.onTabHide.bind(this));

        // app
        this.model.on('logout'      , this.listeners.logout = this.onLogout.bind(this));
        this.model.on('request'     , this.listeners.request = this.onRequest.bind(this));

        // statusbar
        this.statusbar = this.view.querySelector('#statusbar');

        // menu
        for (const name in this.model.data.menu) {
            const menu = this.model.data.menu[name];
            menu.forEach(submenu => {
                $(this.view).find(`#${this.model.data.name}-${submenu.page}`).click(async () => {
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
        });

        // pages
        for (const name in this.model.data.pages) {

            const page = new Page({
                app : this.model,
                data: this.model.data.pages[name]
            });
            page.init();

            // notify subscribers (view), that page is opened
            this.onPageOpened({source: this, page: page, track: false, select: false});
        }

    }

    deinit() {
        // app
        this.model.off('logout', this.listeners.logout);
        this.model.off('request', this.listeners.request);

        // TabWidget
        this.appTC.off('tabClosingByUser', this.listeners.tabClosingByUser);
        this.appTC.off('tabShow', this.listeners.tabShow);
        this.appTC.off('tabHide', this.listeners.tabHide);
    }

    onPageOpened(e) {
        console.log('ApplicationController.onPageOpened', e.page);
        const model = e.page;
        model.id = `p${this.getNextPageId()}`;
        const html = QForms.render(model.data.view, {
            model  : model,
            newMode: e.newMode
        });
        const view = $(html).get(0);

        // tab
        const tab = this.appTC.createTab(view);
        if (e.select) this.appTC.selectTab(tab, e.track);

        // pageController
        const pageController = PageController.create(model, view, this);
        tab.pageController = pageController;
        pageController.tab = tab;
        pageController.init();
        pageController.fill();
    }

    onPageClosed(e) {
        console.log('ApplicationController.onPageClosed');
        const tab = this.findTabByPageController(e.pageController);
        this.appTC.closeTab(tab);
        e.pageController.deinit();
    }

    onPageSelected(e) {
        console.log('ApplicationController.onPageSelected');
        const tab = this.findTabByPageController(e.pageController);
        this.appTC.selectTab(tab);
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
        this.statusbar.innerHTML = `Last query time: ${e.time} ms`;
    }

    async saveAndClosePage(pageController) {
        console.log('ApplicationController.saveAndClosePage');
        await pageController.model.update();
        console.log('page model updated');
        this.onPageClosed({source: this, pageController: pageController});
    }

    closePage(pageController) {
        console.log('ApplicationController.closePage');
        this.onPageClosed({source: this, pageController: pageController});
        pageController.model.deinit();
    }

    findPageControllerByPageNameAndKey(pageName, key) {
        console.log('ApplicationController.findPageControllerByPageNameAndKey', pageName, key);
        for (let i = 0; i < this.appTC.tabList.childNodes.length; i++) {
            const tab = this.appTC.tabList.childNodes[i];
            if (tab.pageController.model.name === pageName && tab.pageController.model.getKey() === key) {
                return tab.pageController;
            }
        }
        return null;
    }

    findTabByPageController(pageController) {
        console.log('ApplicationController.findTabByPageController');
        for (let i = 0; i < this.appTC.tabList.childNodes.length; i++) {
            const tab = this.appTC.tabList.childNodes[i];
            if (tab.pageController === pageController) {
                return tab;
            }
        }
        return null;
    }

    async openPage(args) {
        console.log('ApplicationController.openPage', args.name);
        const name            = args.name;
        const newMode         = (args.newMode === undefined) ? false : args.newMode;
        const key             = args.key || null;
        const parentPage      = args.parentPage;
        const parentPageName  = parentPage ? parentPage.name : undefined;
        let keyParams       = {};
        const params = {};
        //console.log('open ' + name + ' with key: ' + key);
        if (key) {
            keyParams = QForms.keyToParams(key);
            for (const keyName in keyParams) {
                params[keyName] = keyParams[keyName];
            }
        }
        // if this page with this key is already opened, then show it
        const pageController = this.findPageControllerByPageNameAndKey(name, key);
        // console.log('pageController:', pageController);
        if (pageController !== null) {
            this.onPageSelected({source: this, pageController: pageController});
            return;
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
            data          : response.data,
            key           : key,
            newMode       : newMode,
            params        : params,
            parentPageName: parentPageName
        });
        page.init();

        // notify subscribers (controller), that page has been opened
        this.onPageOpened({
            source : this,
            page   : page,
            track  : parentPage !== undefined,
            select : true,
            newMode: newMode
        });
    }

    getNextPageId() {
        this.lastPageId++;
        return this.lastPageId;
    }
}
