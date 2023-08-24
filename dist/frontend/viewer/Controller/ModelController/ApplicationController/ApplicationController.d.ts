import { Key } from '../../../../../types';
import { ModelController } from '../ModelController';
import { Page, PageOptions } from '../../../Model/Page/Page';
import { FrontHostApp } from '../../../../common';
import { PageController } from '../PageController/PageController';
import { Application } from '../../../Model/Application/Application';
import { Scalar } from '../../../../../types';
import { PageData } from '../../../../../common/ModelData/PageData';
import { ModalController } from '../../ModalController/ModalController';
export interface OpenPageOptions {
    name: string;
    newMode?: boolean;
    selectMode?: boolean;
    params?: Record<string, Scalar>;
    modal?: boolean;
    selectedKey?: Key;
    onCreate?: (page: Page) => void | Promise<void>;
    onSelect?: (key: Key | null) => void | Promise<void>;
    onClose?: () => void | Promise<void>;
}
export declare class ApplicationController extends ModelController<Application> {
    private frontHostApp;
    lastId: number;
    activePage: PageController | null;
    modals: (PageController | ModalController)[];
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
    onRequest: (e: {
        time: number;
        remotePlatformVersion: string;
        remoteAppVersion: string;
    }) => Promise<void>;
    createVersionNotificationIfNotExists(): void;
    getGlobalParams(): {};
    createPage(pageData: PageData, options: PageOptions): PageController;
    openPage(options: OpenPageOptions): Promise<PageController>;
    addModal(ctrl: PageController | ModalController): void;
    removeModal(ctrl: PageController | ModalController): void;
    getNextId(): number;
    getNewId(): string;
    addPage(pc: PageController): void;
    findPageControllerByPageNameAndKey(pageName: string, key: Key | null): PageController | null;
    onPageSelect(pc: PageController): void;
    closePage(pageController: PageController): Promise<void>;
    onActionClick(name: string): Promise<any>;
    getMenuItemsProp(): {
        name: string;
        title: string;
        items: {
            type: string;
            name: string | undefined;
            title: string;
        }[];
    }[];
    onStatusbarCreate: (statusbar: any) => void;
    onLogout: () => Promise<void>;
    onMenuItemClick: (menu: any, type: any, name: any) => Promise<void>;
    getActivePageName(): string | null;
    onWindowPopState(e: any): Promise<void>;
    getTitle(): string;
    invalidate(): void;
    alert(options: {
        message: string;
        title?: string;
    }): Promise<void>;
    confirm(options: {
        message: string;
        title?: string;
        yesButton?: string;
        noButton?: string;
    }): Promise<boolean>;
    getRootPath(): string;
    openModal(ctrl: ModalController | PageController): Promise<void>;
    closeModal(ctrl: ModalController | PageController): Promise<void>;
    getHostApp(): FrontHostApp;
    connect(): Promise<void>;
    rpc(name: string, params?: {
        [name: string]: any;
    }): Promise<any>;
    getDomain(): string;
    getBaseUrl(): string;
}
