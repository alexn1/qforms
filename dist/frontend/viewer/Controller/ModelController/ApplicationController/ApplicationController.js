"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationController = void 0;
const ModelController_1 = require("../ModelController");
const Page_1 = require("../../../Model/Page/Page");
const ApplicationView_1 = require("./ApplicationView");
const WebSocketClient_1 = require("../../../WebSocketClient");
const common_1 = require("../../../../common");
const PageController_1 = require("../PageController/PageController");
class ApplicationController extends ModelController_1.ModelController {
    constructor(model, frontHostApp) {
        super(model, null);
        this.frontHostApp = frontHostApp;
        this.lastId = 0;
        this.activePage = null; // active non modal page
        this.modals = [];
        this.statusbar = null;
        this.homePageName = null;
        this.webSocketClient = null;
        this.onRequest = async (e) => {
            console.log('onRequest', e);
            if (this.statusbar) {
                this.statusbar.setLastQueryTime(e.time);
            }
            // console.log('e.remoteAppVersion', e.remoteAppVersion);
            // console.log('this.getModel().getData().versions.app', this.getModel().getData().versions.app);
            if (this.getModel().getData().versions.app &&
                this.getModel().getData().versions.app !== e.remoteAppVersion) {
                this.createVersionNotificationIfNotExists();
            }
        };
        this.onStatusbarCreate = (statusbar) => {
            this.statusbar = statusbar;
        };
        this.onLogout = async () => {
            console.log('ApplicationController.onLogout');
            const result = await this.model.request({ action: 'logout' });
            location.href = this.getRootPath();
        };
        this.onMenuItemClick = async (menu, type, name) => {
            console.log('ApplicationController.onMenuItemClick', menu, type, name);
            if (type === 'page') {
                await this.openPage({ name: name, modal: false });
                history.pushState({ pageName: name }, '', this.getHostApp().createLink({ page: name }));
            }
            else if (type === 'action') {
                try {
                    const result = await this.onActionClick(name);
                    if (!result) {
                        throw new Error(`no handler for action '${name}'`);
                    }
                }
                catch (err) {
                    console.error(err);
                    await this.alert({ message: err.message });
                }
            }
            else if (type === 'custom' && name === 'logout') {
                await this.onLogout();
            }
            else {
                throw new Error(`unknown menu type/name: ${type}/${name}`);
            }
        };
        if (typeof window === 'object') {
            console.log(`${this.constructor.name}.constructor`, model);
        }
    }
    static create(model, frontHostApp) {
        // console.log(
        //     'ApplicationController.create',
        //     'debug:',
        //     this.getHostApp().isDebugMode(),
        //     model,
        // );
        const { ctrlClass } = model.data;
        if (ctrlClass) {
            const CustomClass = common_1.Helper.getGlobalClass(ctrlClass);
            if (!CustomClass)
                throw new Error(`no class ${ctrlClass}`);
            return new CustomClass(model, frontHostApp);
        }
        return new ApplicationController(model, frontHostApp);
    }
    init() {
        // console.log('ApplicationController.init');
        super.init();
        // this.model.on('logout' , this.onLogout);
        this.model.on('request', this.onRequest);
        const pageData = this.model.data.pages[0];
        this.activePage = pageData
            ? this.createPage(pageData, {
                modal: false,
                params: this.getGlobalParams(),
            })
            : null;
        // this.frontHostApp.setDocumentTitle(this.getTitle());
        // Helper.addClassToDocumentElement(Helper.inIframe() ? 'iframe' : 'not-iframe');
        const activePageName = this.getActivePageName();
        this.homePageName = activePageName ? activePageName : this.frontHostApp.getDocumentTitle();
    }
    deinit() {
        // this.model.off('logout', this.onLogout);
        this.model.off('request', this.onRequest);
        super.deinit();
    }
    getViewClass() {
        return super.getViewClass() || ApplicationView_1.ApplicationView;
    }
    createView(rootElement) {
        // console.log('ApplicationController.createView');
        this.view = common_1.Helper.createReactComponent2(rootElement, this.getViewClass(), {
            ctrl: this,
            key: this.getModel().getName(),
        });
        if (this.statusbar) {
            this.statusbar.setLastQueryTime(this.model.getAttr('time'));
        }
    }
    createVersionNotificationIfNotExists() {
        // console.log('ApplicationController.createVersionNotificationIfNotExists');
        if (!document.querySelector('.version-notification')) {
            const div = document.createElement('div');
            div.innerHTML = this.getModel().getText().application.versionNotification;
            div.className = 'version-notification';
            document.querySelector(`.${this.getView().getCssBlockName()}__body`).append(div);
        }
        else {
            // console.log(`version notification already exists`);
        }
    }
    getGlobalParams() {
        return {
        // foo: 'bar'
        };
    }
    // options
    // - modal      : boolean,
    // - newMode    : boolean,
    // - selectMode : boolean,
    // - selectedKey: string,
    // - onCreate   : function,
    // - onSelect   : function,
    // - onClose    : function,
    // - params     : object,
    createPage(pageData, options) {
        if (options.modal === undefined)
            throw new Error('no options.modal');
        // model
        const pageModel = new Page_1.Page(pageData, this.model, options);
        pageModel.init();
        // controller
        const pc = PageController_1.PageController.create(pageModel, this, `c${this.getNextId()}`);
        pc.init();
        return pc;
    }
    async openPage(options) {
        console.log('ApplicationController.openPage', options);
        if (!options.name)
            throw new Error('no name');
        if (options.key)
            throw new Error('openPage: key param is deprecated');
        // if this page with this key is already opened, then show it
        const pageController = this.findPageControllerByPageNameAndKey(options.name, null);
        // console.log('pageController:', pageController);
        if (pageController) {
            this.onPageSelect(pageController);
            return pageController;
        }
        const { page: pageData } = await this.model.request({
            action: 'page',
            page: options.name,
            newMode: !!options.newMode,
            params: options.params || {},
        });
        // modal by default
        if (options.modal === undefined) {
            options.modal = true;
        }
        if (!options.onClose) {
            const activeElement = document.activeElement;
            options.onClose = () => {
                // @ts-ignore
                if (activeElement)
                    activeElement.focus();
            };
        }
        const pc = this.createPage(pageData, options);
        // console.log('pc:', pc);
        // show
        pc.isModal() ? this.addModal(pc) : this.addPage(pc);
        await this.rerender();
        return pc;
    }
    addModal(ctrl) {
        this.modals.push(ctrl);
    }
    removeModal(ctrl) {
        // console.log('ApplicationController.removeModal', ctrl);
        const i = this.modals.indexOf(ctrl);
        if (i === -1)
            throw new Error(`cannot find modal: ${ctrl.getId()}`);
        this.modals.splice(i, 1);
    }
    getNextId() {
        this.lastId++;
        return this.lastId;
    }
    getNewId() {
        return `c${this.getNextId()}`;
    }
    addPage(pc) {
        if (this.activePage) {
            this.closePage(this.activePage);
        }
        this.activePage = pc;
        this.frontHostApp.setDocumentTitle(this.getTitle());
    }
    findPageControllerByPageNameAndKey(pageName, key) {
        if (this.activePage &&
            this.activePage.model.getName() === pageName &&
            this.activePage.model.getKey() === key) {
            return this.activePage;
        }
        return null;
    }
    onPageSelect(pc) {
        console.log('ApplicationController.onPageSelect', pc.model.getName());
    }
    async closePage(pageController) {
        console.log('ApplicationController.closePage', pageController.model.getFullName());
        if (this.modals.indexOf(pageController) > -1) {
            this.modals.splice(this.modals.indexOf(pageController), 1);
        }
        else if (this.activePage === pageController) {
            this.activePage = null;
            document.title = '';
        }
        else {
            throw new Error('page not found');
        }
        await this.rerender();
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
            ...(this.model.data.menu
                ? Object.keys(this.model.data.menu).map((key) => ({
                    name: key,
                    title: key,
                    items: this.model.data.menu[key].map((item) => ({
                        type: item.type,
                        name: item.page || item.action,
                        title: item.caption,
                    })),
                }))
                : []),
            // user
            ...(this.model.getUser()
                ? [
                    {
                        name: 'user',
                        title: `${this.model.getDomain()}/${this.model.getUser().login}`,
                        items: [
                            {
                                type: 'custom',
                                name: 'logout',
                                title: 'Logout',
                            },
                        ],
                    },
                ]
                : []),
        ];
    }
    /*getFocusCtrl() {
        if (this.modals.length > 0) {
            return this.modals[this.modals.length - 1];
        }
        return this.activePage;
    }*/
    getActivePageName() {
        if (this.activePage) {
            return this.activePage.getModel().getName();
        }
        return null;
    }
    async onWindowPopState(e) {
        console.log('ApplicationController.onWindowPopState', e.state);
        await this.openPage({
            name: e.state ? e.state.pageName : this.homePageName,
            modal: false,
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
        if (this.activePage)
            this.activePage.invalidate();
        this.modals
            .filter((ctrl) => ctrl instanceof PageController_1.PageController)
            .forEach((page) => page.invalidate());
    }
    async alert(options) {
        if (!options.title) {
            options.title = this.getModel().getText().application.alert;
        }
        const activeElement = document.activeElement;
        try {
            return await this.frontHostApp.alert(options);
        }
        finally {
            // @ts-ignore
            if (activeElement)
                activeElement.focus();
        }
    }
    async confirm(options) {
        if (!options.title) {
            options.title = this.getModel().getText().application.confirm;
        }
        if (!options.yesButton) {
            options.yesButton = this.getModel().getText().confirm.yes;
        }
        if (!options.noButton) {
            options.noButton = this.getModel().getText().confirm.no;
        }
        const activeElement = document.activeElement;
        try {
            return await this.frontHostApp.confirm(options);
        }
        finally {
            // @ts-ignore
            if (activeElement)
                activeElement.focus();
        }
    }
    getRootPath() {
        return '/';
    }
    async openModal(ctrl) {
        this.addModal(ctrl);
        await this.rerender();
    }
    async closeModal(ctrl) {
        this.removeModal(ctrl);
        await this.rerender();
    }
    getHostApp() {
        return this.frontHostApp;
    }
    async connect() {
        const data = this.getModel().getData();
        this.webSocketClient = new WebSocketClient_1.WebSocketClient({
            applicationController: this,
            protocol: window.location.protocol === 'https:' ? 'wss' : 'ws',
            route: data.route,
            uuid: data.uuid,
            userId: data.user ? data.user.id : null,
        });
        await this.webSocketClient.connect();
    }
    async rpc(name, params = {}) {
        const result = await this.getModel().rpc(name, params);
        /*if (result.errorMessage) {
            this.getHostApp().logError(new Error(result.errorMessage));
            await this.alert({
                title     : this.getModel().getText().application.error,
                titleStyle: {color: 'red'},
                message   : result.errorMessage
            });
        }*/
        return result;
    }
    getDomain() {
        return this.getModel().getDomain();
    }
    getBaseUrl() {
        return `/${this.getDomain()}`;
    }
}
exports.ApplicationController = ApplicationController;
common_1.Helper.registerGlobalClass(ApplicationController);
