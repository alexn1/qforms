class ApplicationController extends ModelController {
    constructor(model) {
        // console.log('ApplicationController.constructor', model, view);
        super(model, null);
        this.lastId = 0;
        this.activePage = null;     // active non modal page
        this.modals = [];
        this.statusbar  = null;
        this.homePageName = null;
    }
    static create(model) {
        // console.log('ApplicationController.create', 'debug:', ApplicationController.isInDebugMode());
        const CustomClass = FrontHostApp.getClassByName(`${model.getName()}ApplicationController`);
        const Class = CustomClass ? CustomClass : ApplicationController;
        return new Class(model);
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
        super.init();
        // this.model.on('logout' , this.onLogout);
        this.model.on('request', this.onRequest);
        const pageData = this.model.data.pages[0];
        this.activePage = pageData ? this.createPage(pageData, {
            modal : false,
            params: this.getGlobalParams()
        }) : null;
        document.title = this.getTitle();
        this.homePageName = this.activePage.getModel().getName();
    }
    deinit() {
        // this.model.off('logout', this.onLogout);
        this.model.off('request', this.onRequest);
        super.deinit();
    }
    getViewClass() {
        return ApplicationView;
    }
    createView(root) {
        // console.log('ApplicationController.createView');
        this.view = Helper.createReactComponent(root, this.getViewClass(), {ctrl: this});
        if (this.statusbar) {
            this.statusbar.setLastQueryTime(this.model.getAttr('time'));
        }
    }
    onRequest = async e => {
        // console.log('onRequest', e);
        if (this.statusbar) {
            this.statusbar.setLastQueryTime(e.time);
        }
    }
    getGlobalParams() {
        return {
            // foo: 'bar'
        };
    }
    createPage(pageData, options) {
        if (options.modal === undefined) throw new Error('no options.modal');

        const pageModel = new Page(pageData, this.model, {
            modal      : options.modal,
            newMode    : options.newMode,
            selectMode : options.selectMode,
            selectedKey: options.selectedKey,
            onCreate   : options.onCreate,
            onSelect   : options.onSelect,
            params     : options.params || {}
        });
        pageModel.init();

        // controller
        const pc = PageController.create(pageModel, this, `c${this.getNextId()}`);
        pc.init();

        return pc;
    }
    async openPage(options) {
        console.log('ApplicationController.openPage', options);
        if (!options.name) throw new Error('no name');
        if (options.key) throw new Error('openPage: key param is deprecated');

        // if this page with this key is already opened, then show it
        const pageController = this.findPageControllerByPageNameAndKey(options.name, null);
        // console.log('pageController:', pageController);
        if (pageController) {
            this.onPageSelect(pageController);
            return pageController;
        }

        const {page: pageData} = await this.model.request({
            action : 'page',
            page   : options.name,
            newMode: !!options.newMode,
            params : options.params || {}
        });

        const pc = this.createPage(pageData, {
            ...options,
            modal: options.modal !== undefined ? options.modal : true
        });
        // console.log('pc:', pc);

        // show
        pc.getModel().isModal() ? this.addModal(pc) : this.addPage(pc);
        await this.rerender();

        return pc;
    }
    addModal(ctrl) {
        this.modals.push(ctrl);
    }
    removeModal(ctrl) {
        const i = this.modals.indexOf(ctrl);
        if (i === -1) throw new Error(`cannot find modal: ${ctrl.getId()}`);
        this.modals.splice(i, 1);
    }
    getNextId() {
        this.lastId++;
        return this.lastId;
    }
    addPage(pc) {
        if (this.activePage) {
            this.closePage(this.activePage);
        }
        this.activePage = pc;
        document.title = this.getTitle();
    }
    findPageControllerByPageNameAndKey(pageName, key) {
        if (this.activePage && this.activePage.model.getName() === pageName && this.activePage.model.getKey() === key) {
            return this.activePage;
        }
        return null;
    }
    onPageSelect(pc) {
        console.log('ApplicationController.onPageSelect', pc.model.getName());
    }
    closePage(pageController) {
        console.log('ApplicationController.closePage', pageController.model.getFullName());
        if (this.modals.indexOf(pageController) > -1) {
            this.modals.splice(this.modals.indexOf(pageController), 1);
        } else if (this.activePage === pageController) {
            this.activePage = null;
            document.title = '';
        } else  {
            throw new Error('page not found');
        }
        this.rerender();
        pageController.deinit();
        pageController.model.deinit();
    }
    async onActionClick(name) {
        console.log('ApplicationController.onActionClick', name);
    }
    getMenuItemsProp() {
        // console.log('ApplicationController.getMenuItemsProp');
        return [
            // pages & actions
            ...(this.model.data.menu ? Object.keys(this.model.data.menu).map(key => ({
                name : key,
                title: key,
                items: this.model.data.menu[key].map(item => ({
                    type : item.type,
                    name : item.page || item.action,
                    title: item.caption
                }))
            })) : []),
            // user
            ...(this.model.getUser() ? [{
                name : 'user',
                title: `${this.model.getDomain()}/${this.model.getUser().login}`,
                items: [
                    {
                        type : 'custom',
                        name : 'logout',
                        title: 'Logout'
                    }
                ]
            }] : [])
        ];
    }
    onStatusbarCreate = statusbar => {
        this.statusbar = statusbar;
    }
    onLogout = async () => {
        console.log('ApplicationController.onLogout');
        const result = await this.model.request({action: 'logout'});
        location.reload();
    }
    onMenuItemClick = async (menu, type, name) => {
        console.log('ApplicationController.onMenuItemClick', menu, type, name);
        if (type === 'page') {
            await this.openPage({name: name, modal: false});
            history.pushState({pageName: name}, '', PageController.createLink({page: name}));
        } else if (type === 'action') {
            const result = await this.onActionClick(name);
            if (!result) {
                throw new Error(`no handler for action '${name}'`);
            }
        } else if (type === 'custom' && name === 'logout') {
            await this.onLogout();
        } else {
            throw new Error(`unknown menu type/name: ${type}/${name}`);
        }
    }
    async onDocumentKeyDown(e) {
        // console.log('ApplicationController.onDocumentKeyDown', e);
        const page = this.getFocusCtrl();
        // console.log('page:', page.getModel().getFullName());
        if (page) {
            await page.onDocumentKeyDown(e);
        }
    }
    getFocusCtrl() {
        if (this.modals.length > 0) {
            return this.modals[this.modals.length - 1];
        }
        return this.activePage;
    }
    getActivePageName() {
        if (this.activePage) {
            return this.activePage.getModel().getName();
        }
        return null;
    }
    async onWindowPopState(e) {
        console.log('ApplicationController.onWindowPopState', e.state);
        await this.openPage({
            name : e.state ? e.state.pageName : this.homePageName,
            modal: false
        });
    }
    getTitle() {
        // console.log('ApplicationController.getTitle', this.activePage);
        if (this.activePage) {
            return `${this.activePage.getTitle()} - ${this.getModel().getCaption()}`;
        }
        return this.getModel().getCaption();
    }
    invalidate() {
        if (this.activePage) this.activePage.invalidate();
        this.modals.filter(ctrl => ctrl instanceof PageController).forEach(page => page.invalidate());
    }
}

window.QForms.ApplicationController = ApplicationController;
