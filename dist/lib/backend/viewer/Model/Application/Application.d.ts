import { AppInfo } from "../../../AppInfo";
import BackHostApp from '../../../BackHostApp';
import Model from '../Model';
import Action from '../Action/Action';
import Database from '../Database/Database';
import DataSource from '../DataSource/DataSource';
import Page from '../Page/Page';
import PageLink from '../PageLink/PageLink';
import Context from '../../../Context';
import JsonFile from '../../../JsonFile';
import Result from "../../../Result";
declare class Application extends Model {
    appInfo: AppInfo;
    hostApp: any;
    env: string;
    databases: Database[];
    actions: Action[];
    dataSources: DataSource[];
    pages: any;
    links: any[];
    scripts: any[];
    menu: any;
    nav: any;
    clients: any[];
    constructor(data: any, appInfo: AppInfo, hostApp: BackHostApp, context: Context);
    init(context: Context): Promise<void>;
    getLinks(context: Context): Promise<string[]>;
    getScripts(context: Context): Promise<string[]>;
    deinit(): Promise<void>;
    getDirPath(): string;
    getFrontendDirPath(): any;
    getText(): any;
    getVersion(): any;
    fillAttributes(response: any): void;
    fill(context: Context): Promise<any>;
    getClientUserFromServerUser(context: Context): Promise<any>;
    createMenu(context: Context): Promise<void>;
    createPageLink(name: string): PageLink;
    createPage(pageLinkName: string): Promise<Page>;
    authorizePage(user: any, pageName: string): boolean;
    getPage(context: Context, pageLinkName: string): Promise<Page>;
    getStartupPageLinkNames(): string[];
    fillPages(context: Context): Promise<any[]>;
    authenticate(context: Context, username: string, password: string): Promise<{
        id: number;
        name: string;
    }>;
    isAuthentication(): boolean;
    getUsers(context: Context): Promise<any>;
    rpc(name: string, context: Context): Promise<any>;
    request(options: any): Promise<any>;
    getEnv(): string;
    getEnvVarValue(name: string): any;
    getApp(): Application;
    getDatabase(name: string): Database;
    initContext(context: Context): Promise<void>;
    static makeAppInfoFromAppFile(appFile: JsonFile): AppInfo;
    static loadAppInfo(appFilePath: any): Promise<AppInfo>;
    static getAppInfos(appsDirPath: any): Promise<any[]>;
    getDataSource(name: any): DataSource;
    getViewClassName(): string;
    connect(context: Context): Promise<void>;
    release(context: any): void;
    addClient(webSocket: any): void;
    removeClient(webSocket: any): void;
    broadcastResultToClients(context: Context, result: Result): void;
}
export = Application;
