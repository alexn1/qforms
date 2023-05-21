import { ModelController } from '../ModelController';
import { Page, PageOptions } from '../../../Model/Page/Page';
import { FrontHostApp } from '../../../../common';
import { PageController } from '../PageController/PageController';
import { Application } from '../../../Model/Application/Application';
import { QueryParams } from '../../../../../types';
export interface OpenPageOptions {
    name: string;
    key?: any;
    newMode?: boolean;
    selectMode?: boolean;
    params?: QueryParams;
    modal?: boolean;
    selectedKey?: string;
    onClose?: any;
    onSelect?: any;
    onCreate?: (page: Page) => void;
}
export declare class ApplicationController extends ModelController<Application> {
    private frontHostApp;
    lastId: number;
    activePage: PageController;
    modals: any[];
    statusbar: any;
    homePageName: string | null;
    webSocketClient: any;
    view: any;
    constructor(model: Application, frontHostApp: FrontHostApp);
    static create(model: Application, frontHostApp: FrontHostApp): ApplicationController;
    init(): void;
    deinit(): void;
    getViewClass(): any;
    createView(rootElement: Element): void;
    onRequest: (e: any) => Promise<void>;
    createVersionNotificationIfNotExists(): void;
    getGlobalParams(): {};
    createPage(pageData: any, options: PageOptions): PageController;
    openPage(options: OpenPageOptions): Promise<PageController>;
    addModal(ctrl: any): void;
    removeModal(ctrl: any): void;
    getNextId(): number;
    getNewId(): string;
    addPage(pc: PageController): void;
    findPageControllerByPageNameAndKey(pageName: any, key: any): PageController;
    onPageSelect(pc: PageController): void;
    closePage(pageController: PageController): Promise<void>;
    onActionClick(name: string): Promise<any>;
    getMenuItemsProp(): {
        name: string;
        title: string;
        items: any;
    }[];
    onStatusbarCreate: (statusbar: any) => void;
    onLogout: () => Promise<void>;
    onMenuItemClick: (menu: any, type: any, name: any) => Promise<void>;
    getActivePageName(): any;
    onWindowPopState(e: any): Promise<void>;
    getTitle(): string;
    invalidate(): void;
    alert(options: any): Promise<any>;
    confirm(options: any): Promise<any>;
    getRootPath(): string;
    openModal(ctrl: any): Promise<void>;
    closeModal(ctrl: any): Promise<void>;
    getHostApp(): FrontHostApp;
    connect(): Promise<void>;
    rpc(name: string, params?: {
        [name: string]: any;
    }): Promise<any>;
    getDomain(): any;
    getBaseUrl(): string;
}