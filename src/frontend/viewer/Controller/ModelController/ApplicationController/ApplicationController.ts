import { Action, JSONString, Key, Nullable, Query } from '../../../../../types';
import { ModelController } from '../ModelController';
import { Page, PageOptions } from '../../../Model/Page/Page';
import { ApplicationView } from './ApplicationView';
import { WebSocketClient } from '../../../WebSocketClient';
import { Helper } from '../../../../common';
import { FrontHostApp, ReactHelper } from '../../../../common';
import { PageController } from '../PageController/PageController';
import { Application } from '../../../Model/Application/Application';
import { Scalar } from '../../../../../types';
import { PageData } from '../../../../../common/ModelData/PageData';
import { ModalController } from '../../ModalController/ModalController';
import { PageActionQuery, PageActionResponse } from '../../../../common';

export interface OpenPageOptions {
    name: string;
    newMode?: boolean;
    selectMode?: boolean;
    params?: Record<string, Nullable<Scalar>>;
    modal?: boolean;
    selectedKey?: Key;
    onCreate?: (page: Page) => void | Promise<void>;
    onSelect?: (key: Key | null) => void | Promise<void>;
    onClose?: () => void | Promise<void>;
}

export class ApplicationController extends ModelController<Application> {
    lastId: number = 0;
    activePage: PageController | null = null; // active non modal page
    modals: (PageController | ModalController)[] = [];
    statusbar: any = null;
    homePageName: string | null = null;
    webSocketClient: any = null;
    view: any;

    constructor(model: Application, private frontHostApp: FrontHostApp) {
        super(model);
        if (typeof window === 'object') {
            console.debug(`${this.constructor.name}.constructor`, model);
        }
    }

    static create(model: Application, frontHostApp: FrontHostApp): ApplicationController {
        // console.debug(
        //     'ApplicationController.create',
        //     'debug:',
        //     this.isDebugMode(),
        //     model,
        // );
        const { ctrlClass } = model.getData();
        if (ctrlClass) {
            const CustomClass = Helper.getGlobalClass(ctrlClass);
            if (!CustomClass) throw new Error(`no class ${ctrlClass}`);
            return new CustomClass(model, frontHostApp);
        }
        return new ApplicationController(model, frontHostApp);
    }

    init() {
        // console.debug('ApplicationController.init');
        super.init();
        // this.getModel().on('logout' , this.onLogout);
        this.getModel().on('request', this.onRequest);
        const pageData = this.getModel().getData().pages[0];
        this.activePage = pageData
            ? this.createPage(pageData, {
                  modal: false,
                  //   params: this.getGlobalParams(),
              })
            : null;
        // this.frontHostApp.setDocumentTitle(this.getTitle());
        // Helper.addClassToDocumentElement(Helper.inIframe() ? 'iframe' : 'not-iframe');
        const activePageName = this.getActivePageName();
        this.homePageName = activePageName ? activePageName : this.frontHostApp.getDocumentTitle();
    }

    deinit() {
        // this.getModel().off('logout', this.onLogout);
        this.getModel().off('request', this.onRequest);
        super.deinit();
    }

    getViewClass() {
        return super.getViewClass() || ApplicationView;
    }

    createView(rootElement: Element) {
        // console.debug('ApplicationController.createView');
        this.view = ReactHelper.createReactComponent2(rootElement, this.getViewClass(), {
            ctrl: this,
            key: this.getModel().getName(),
        });
        if (this.statusbar) {
            this.statusbar.setLastQueryTime(this.getModel().getAttr('time'));
        }
    }

    onRequest = async (e: {
        time: number;
        remotePlatformVersion: string;
        remoteAppVersion: string;
    }) => {
        console.debug('onRequest', e);
        if (this.statusbar) {
            this.statusbar.setLastQueryTime(e.time);
        }
        // console.debug('e.remoteAppVersion', e.remoteAppVersion);
        // console.debug('this.getModel().getData().versions.app', this.getModel().getData().versions.app);
        if (
            this.getModel().getData().versions.app &&
            this.getModel().getData().versions.app !== e.remoteAppVersion
        ) {
            this.createVersionNotificationIfNotExists();
        }
    };

    createVersionNotificationIfNotExists() {
        // console.debug('ApplicationController.createVersionNotificationIfNotExists');
        if (!document.querySelector('.version-notification')) {
            const div = document.createElement('div');
            div.innerHTML = this.getModel().getText().application.versionNotification;
            div.className = 'version-notification';
            document.querySelector(`.${this.getView().getCssBlockName()}__body`)!.append(div);
        } else {
            // console.debug(`version notification already exists`);
        }
    }

    getGlobalParams() {
        return {
            // foo: 'bar'
        };
    }

    createPage(pageData: PageData, options: PageOptions): PageController {
        if (options.modal === undefined) throw new Error('no options.modal');

        // model
        const pageModel = new Page(pageData, this.getModel(), options);
        pageModel.init();

        // controller
        const pc = PageController.create(pageModel, this, `c${this.getNextId()}`);
        pc.init();

        return pc;
    }

    async openPage(options: OpenPageOptions): Promise<PageController> {
        console.debug('ApplicationController.openPage', options);
        if (!options.name) throw new Error('no name');

        // if this page with this key is already opened, then show it
        const pageController = this.findPageControllerByPageNameAndKey(options.name, null);
        if (pageController) {
            this.onPageSelect(pageController);
            return pageController;
        }

        const query: PageActionQuery = {
            action: Action.page,
            page: options.name,
            newMode:
                options.newMode !== undefined
                    ? (Helper.encodeValue(options.newMode) as JSONString<boolean>)
                    : undefined,
            params: options.params
                ? (Helper.encodeObject(options.params) as Record<
                      string,
                      JSONString<Nullable<Scalar>>
                  >)
                : undefined,
        };

        const { page: pageData } = (await this.getModel().request2(
            'GET',
            `${window.location.pathname}?${Helper.queryToString(query as Query)}`,
        )) as PageActionResponse;

        // modal by default
        if (options.modal === undefined) {
            options.modal = true;
        }
        if (!options.onClose) {
            const activeElement = document.activeElement;
            options.onClose = () => {
                // @ts-ignore
                if (activeElement) activeElement.focus();
            };
        }
        const pc = this.createPage(pageData, options);

        // show
        pc.isModal() ? this.addModal(pc) : this.addPage(pc);
        await this.rerender();

        return pc;
    }

    addModal(ctrl: PageController | ModalController): void {
        this.modals.push(ctrl);
    }

    removeModal(ctrl: PageController | ModalController): void {
        // console.debug('ApplicationController.removeModal', ctrl);
        const i = this.modals.indexOf(ctrl);
        if (i === -1) throw new Error(`cannot find modal: ${ctrl.getId()}`);
        this.modals.splice(i, 1);
    }

    getNextId(): number {
        this.lastId++;
        return this.lastId;
    }

    getNewId(): string {
        return `c${this.getNextId()}`;
    }

    addPage(pc: PageController): void {
        if (this.activePage) {
            this.closePage(this.activePage);
        }
        this.activePage = pc;
        this.frontHostApp.setDocumentTitle(this.getTitle());
    }

    findPageControllerByPageNameAndKey(pageName: string, key: Key | null): PageController | null {
        if (
            this.activePage &&
            this.activePage.getModel().getName() === pageName &&
            this.activePage.getModel().getKey() === key
        ) {
            return this.activePage;
        }
        return null;
    }

    onPageSelect(pc: PageController): void {
        console.debug('ApplicationController.onPageSelect', pc.getModel().getName());
    }

    async closePage(pageController: PageController): Promise<void> {
        console.debug('ApplicationController.closePage', pageController.getModel().getFullName());
        if (this.modals.indexOf(pageController) > -1) {
            this.modals.splice(this.modals.indexOf(pageController), 1);
        } else if (this.activePage === pageController) {
            this.activePage = null;
            document.title = '';
        } else {
            throw new Error('page not found');
        }
        await this.rerender();
        pageController.deinit();
        pageController.getModel().deinit();
    }

    async onActionClick(name: string): Promise<any> {
        console.debug('ApplicationController.onActionClick', name);
    }

    getMenuItemsProp() {
        // console.debug('ApplicationController.getMenuItemsProp');
        return [
            // pages & actions
            ...(this.getModel().getData().menu
                ? Object.keys(this.getModel().getData().menu).map((key) => ({
                      name: key,
                      title: key,
                      items: this.getModel()
                          .getData()
                          .menu[key].map((item) => ({
                              type: item.type,
                              name: item.page || item.action,
                              title: item.caption,
                          })),
                  }))
                : []),
            // user
            ...(this.getModel().getUser()
                ? [
                      {
                          name: 'user',
                          title: `${this.getModel().getDomain()}/${
                              this.getModel().getUser()!.login
                          }`,
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

    onStatusbarCreate = (statusbar) => {
        this.statusbar = statusbar;
    };

    onLogout = async () => {
        console.debug('ApplicationController.onLogout');
        const result = await this.getModel().request('POST', { action: 'logout' });
        // location.href = this.getRootPath();
        location.reload();
    };

    onMenuItemClick = async (menu, type, name) => {
        console.debug('ApplicationController.onMenuItemClick', menu, type, name);
        if (type === 'page') {
            await this.openPage({ name: name, modal: false });
            history.pushState({ pageName: name }, '', this.getHostApp().createLink({ page: name }));
        } else if (type === 'action') {
            try {
                const result = await this.onActionClick(name);
                if (!result) {
                    throw new Error(`no handler for action '${name}'`);
                }
            } catch (err) {
                console.error(err);
                await this.alert({ message: err.message });
            }
        } else if (type === 'custom' && name === 'logout') {
            await this.onLogout();
        } else {
            throw new Error(`unknown menu type/name: ${type}/${name}`);
        }
    };

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
        console.debug('ApplicationController.onWindowPopState', e.state);
        await this.openPage({
            name: e.state ? e.state.pageName : this.homePageName,
            modal: false,
        });
    }

    getTitle() {
        // console.debug('ApplicationController.getTitle', this.activePage);
        if (this.activePage) {
            return this.activePage.getTitle();
        }
        return this.getModel().getCaption();
    }

    invalidate() {
        if (this.activePage) this.activePage.invalidate();
        this.modals
            .filter((ctrl) => ctrl instanceof PageController)
            .forEach((page) => (page as PageController).invalidate());
    }

    async alert(options: { message: string; title?: string }) {
        if (!options.title) {
            options.title = this.getModel().getText().application.alert;
        }
        const activeElement = document.activeElement;
        try {
            return await this.frontHostApp.alert(options);
        } finally {
            // @ts-ignore
            if (activeElement) activeElement.focus();
        }
    }

    async confirm(options: {
        message: string;
        title?: string;
        yesButton?: string;
        noButton?: string;
    }) {
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
        } finally {
            // @ts-ignore
            if (activeElement) activeElement.focus();
        }
    }

    getRootPath() {
        return '/';
    }

    async openModal(ctrl: ModalController | PageController) {
        this.addModal(ctrl);
        await this.rerender();
    }

    async closeModal(ctrl: ModalController | PageController) {
        this.removeModal(ctrl);
        await this.rerender();
    }

    getHostApp() {
        return this.frontHostApp;
    }

    async connect() {
        const data = this.getModel().getData();
        this.webSocketClient = new WebSocketClient({
            applicationController: this,
            protocol: window.location.protocol === 'https:' ? 'wss' : 'ws',
            route: data.route,
            uuid: data.uuid,
            userId: data.user ? data.user.id : null,
        });
        await this.webSocketClient.connect();
    }

    async rpc(name: string, params: { [name: string]: any } = {}) {
        const result = await this.getModel().rpc(name, params);
        /* if (result.errorMessage) {
            this.getHostApp().logError(new Error(result.errorMessage));
            await this.alert({
                title     : this.getModel().getText().application.error,
                titleStyle: {color: 'red'},
                message   : result.errorMessage
            });
        } */
        return result;
    }

    getDomain() {
        return this.getModel().getDomain();
    }

    getBaseUrl() {
        return `/${this.getDomain()}`;
    }

    isDebugMode(): boolean {
        return this.isDev();
    }

    isDev() {
        return this.getModel().getData().nodeEnv === 'dev';
    }
}

Helper.registerGlobalClass(ApplicationController);
