class ApplicationController extends Controller {
    static create(model) {
        // console.log('ApplicationController.create', 'debug:', ApplicationController.isInDebugMode());
        const customClassName = `${model.getName()}ApplicationController`;
        if (eval(`typeof ${customClassName}`) === 'function') {
            const CustomClass = eval(customClassName);
            // console.log('CustomClass:', CustomClass);
            return new CustomClass(model);
        }
        return new SdiApplicationController(model);
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
    constructor(model) {
        // console.log('ApplicationController.constructor', model, view);
        super(model, null);
        this.lastPageId = 0;
        this.modalPages = [];
        this.activePage = null;
        this.statusbar  = null;
    }
    init() {
        // console.log('ApplicationController.init');
        super.init();
        // this.model.on('logout' , this.onLogout);
        this.model.on('request', this.onRequest);
        this.activePage = this.createPage();
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
    onRequest = e => {
        // console.log('onRequest', e);
        if (this.statusbar) {
            this.statusbar.setLastQueryTime(e.time);
        }
    }
    async openPage(options) {
        console.log('ApplicationController.openPage', options);
        const name       = options.name;
        const key        = options.key || null;
        const parentPage = options.parentPage;
        const isModal    = options.modal   !== undefined ? options.modal   : true;
        const isNewMode  = options.newMode !== undefined ? options.newMode : false;
        const params     = options.params || {};

        // if this page with this key is already opened, then show it
        const pageController = this.findPageControllerByPageNameAndKey(name, key);
        // console.log('pageController:', pageController);
        if (pageController) {
            this.onPageSelect(pageController);
            return;
        }

        //console.log('open ' + name + ' with key: ' + key);

        const {page: pageData} = await this.model.request({
            action        : 'page',
            page          : name,
            newMode       : isNewMode,
            parentPageName: parentPage ? parentPage.getName() : null,
            params        : Helper.encodeObject({
                ...(parentPage ? parentPage.getParams() : {}),
                ...params,
                ...(key ? DataSource.keyToParams(key) : {})
            })
        });

        const pageModel = new Page(pageData, this.model, {
            id            : `p${this.getNextPageId()}`,
            modal         : isModal,
            parentPage    : parentPage,
            params        : {
                ...params,
                ...(key ? DataSource.keyToParams(key) : {}),
            },
        });
        pageModel.init();
        const pc = PageController.create(pageModel, this);
        pc.init();
        isModal ? this.modalPages.push(pc) : this.onPageCreate(pc);
        this.rerender();
        // console.log('pc:', pc);
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
    onPageCreate(pc) {
        if (this.activePage) {
            this.closePage(this.activePage);
        }
        this.activePage = pc
        this.rerender();
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
                title: this.model.getUser().name,
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
        try {
            if (type === 'page') {
                await this.openPage({name: name, modal: false});
            } else if (type === 'action') {
                const result = await this.onActionClick(name);
                if (!result) alert(`no handler for action '${name}'`);
            } else if (type === 'custom' && name === 'logout') {
                await this.onLogout();
            } else {
                throw new Error(`unknown menu type/name: ${type}/${name}`);
            }
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }
}
