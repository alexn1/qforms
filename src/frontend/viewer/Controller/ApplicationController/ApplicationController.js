class ApplicationController extends Controller {
    constructor(model) {
        // console.log('ApplicationController.constructor', model, view);
        super(model, null);
        this.lastPageId = 0;
        this.modalPages = [];
        this.activePage = null;     // active non modal page
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
        this.activePage = this.createPage();
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
    async openPage(options) {
        console.log('ApplicationController.openPage', options);
        if (!options.name) throw new Error('no name');
        if (options.key) throw new Error('openPage: key param is deprecated');
        const name         = options.name;
        const params       = options.params || {};
        // const key          = options.key    || null;
        // const isModal      = options.modal   !== undefined ? options.modal  : true;
        // const isNewMode    = options.newMode !== undefined ? options.newMode: false;

        // if this page with this key is already opened, then show it
        const pageController = this.findPageControllerByPageNameAndKey(name, null);
        // console.log('pageController:', pageController);
        if (pageController) {
            this.onPageSelect(pageController);
            return pageController;
        }

        const {page: pageData} = await this.model.request({
            action : 'page',
            page   : name,
            newMode: !!options.newMode,
            params : params
        });

        // pageModel
        const pageModel = new Page(pageData, this.model, {
            id         : `p${this.getNextPageId()}`,
            modal      : options.modal !== undefined ? options.modal : true,
            newMode    : options.newMode,
            selectMode : options.selectMode,
            selectedKey: options.selectedKey,
            onCreate   : options.onCreate,
            onSelect   : options.onSelect,
            params     : params
        });
        pageModel.init();

        // pageController
        const pc = PageController.create(pageModel, this);
        pc.init();
        // console.log('pc:', pc);

        // show
        pc.getModel().isModal() ? this.addModalPage(pc) : this.addPage(pc);
        await this.rerender();

        return pc;
    }
    addModalPage(pc) {
        this.modalPages.push(pc);
    }
    getNextPageId() {
        this.lastPageId++;
        return this.lastPageId;
    }
    createPage() {
        if (!this.model.data.pages[0]) return;
        const pageData = this.model.data.pages[0];

        // model
        const page = new Page(pageData, this.model, {
            id   : `p${this.getNextPageId()}`,
            modal: false
        });
        page.init();

        // controller
        const pc = PageController.create(page, this);
        pc.init();
        return pc;
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
        if (this.modalPages.indexOf(pageController) > -1) {
            this.modalPages.splice(this.modalPages.indexOf(pageController), 1);
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
        const page = this.getFocusPage();
        // console.log('page:', page.getModel().getFullName());
        if (page) {
            await page.onDocumentKeyDown(e);
        }
    }
    getFocusPage() {
        if (this.modalPages.length > 0) {
            return this.modalPages[this.modalPages.length-1];
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
}

window.QForms.ApplicationController = ApplicationController;
