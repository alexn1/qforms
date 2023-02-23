import path from 'path';
import { v4 as uuidv4 } from 'uuid';
// import axios from 'axios';
// import colors from 'colors/safe';

import { AppInfo } from '../../../AppInfo';
import { BackHostApp } from '../../../BackHostApp';
import { BaseModel } from '../../../BaseModel';
import { BkModel } from '../BkModel';
import { BkAction } from '../BkAction/BkAction';
import { BkDatabase } from '../BkDatabase/BkDatabase';
import { BkDataSource } from '../BkDataSource/BkDataSource';
import { Helper } from '../../../Helper';
import { BkPage } from '../BkPage/BkPage';
import { BkPageLink } from '../BkPageLink/BkPageLink';
import { Context } from '../../../Context';
import { JsonFile } from '../../../JsonFile';
import { MyError } from '../../../MyError';
import { Result } from '../../../../Result';

import * as text from '../../text';
const pkg = require('../../../../../package.json');

export class BkApplication extends BkModel {
    env: string;
    databases: BkDatabase[] = [];
    actions: BkAction[] = [];
    dataSources: BkDataSource[] = [];
    pages: any = {};
    links: any[];
    scripts: any[];
    menu: any;
    nav: any;
    clients: any[] = [];

    constructor(
        data: any,
        public appInfo: AppInfo,
        protected hostApp: BackHostApp,
        context: Context,
    ) {
        super(data);
        if (!hostApp) throw new Error('no hostApp');
        if (!context) throw new Error('no route');
        this.env = context.getEnv();
    }

    async init(context: Context): Promise<void> {
        await super.init(context);
        await this.createColItems('databases', context);
        await this.createColItems('actions', context);
        await this.createColItems('dataSources', context);
        this.links = await this.getLinks(context);
        this.scripts = await this.getScripts(context);
        await this.createMenu(context);
    }

    getHostApp(): BackHostApp {
        return this.hostApp;
    }

    async getLinks(context: Context): Promise<any[]> {
        const virtualPath = context.getVirtualPath();
        return (await Helper.getFilePaths(this.getPublicDirPath(), 'css')).map(
            (src) => `${virtualPath}/${src}`,
        );
    }

    async getScripts(context: Context): Promise<any[]> {
        const virtualPath = context.getVirtualPath();
        const publicDirPath = this.getPublicDirPath();
        // console.log('publicDirPath:', publicDirPath);
        return (await Helper.getFilePaths(publicDirPath, 'js')).map(
            (src) => `${virtualPath}/${src}`,
        );
    }

    async deinit(): Promise<void> {
        console.log('Application.deinit: ' + this.getName());

        // databases
        for (const database of this.databases) {
            await database.deinit();
        }
    }

    getDirPath(): string {
        return this.appInfo.dirPath;
    }

    getDistDirPath(): string | null {
        return this.appInfo.distDirPath;
    }

    getPublicDirPath(): string {
        const distDirPath = this.getDistDirPath();
        if (!distDirPath) throw new Error('no distDirPath');
        return path.join(distDirPath, 'public');
    }

    getText(): any {
        const lang = this.getAttr('lang') || 'en';
        return text[lang];
    }

    getVersion(): string | null {
        return null;
    }

    fillAttributes(response: any): void {
        response.class = this.getClassName();
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
        response.lang = this.getAttr('lang');
        response.theme = this.getAttr('theme');
        response.cssBlock = this.getAttr('cssBlock');
        response.viewClass = this.getAttr('viewClass');
        response.ctrlClass = this.getAttr('ctrlClass');
    }

    async fill(context: Context): Promise<any> {
        // console.log('Application.fill');
        const start = Date.now();
        const response = await super.fill(context);

        response.route = context.getRoute();
        response.domain = context.getDomain();
        response.virtualPath = context.getVirtualPath();
        response.logErrorUrl = this.getHostApp().logErrorUrl || '/error';
        response.versions = {
            platform: pkg.version,
            app: this.getVersion(),
        };

        await this.fillCollection(response, 'databases', context);
        await this.fillCollection(response, 'actions', context);
        await this.fillCollection(response, 'dataSources', context);

        // nodeEnv
        response.nodeEnv = this.getHostApp().getNodeEnv();

        // text
        response.text = this.getText();

        // menu
        response.menu = this.menu;

        // nav
        response.nav = this.nav;

        // uuid
        response.uuid = uuidv4();

        // actions
        response.actions = this.getCol('actions').map((data) => ({
            name: BaseModel.getName(data),
            caption: BaseModel.getAttr(data, 'caption'),
        }));

        // pages
        response.pages = await this.fillPages(context);

        // user
        response.user = this.isAuthentication()
            ? await this.getClientUserFromServerUser(context)
            : null;

        // time
        response.time = Date.now() - start;

        return response;
    }

    async getClientUserFromServerUser(context: Context): Promise<any> {
        const user = context.getUser();
        return {
            id: user.id,
            login: user.name,
        };
    }

    async createMenu(context: Context): Promise<void> {
        // console.log('Application.createMenu');
        const menu = {};
        const nav = {};

        // pages
        const pageLinkNames = this.getItemNames('pageLinks');
        for (const pageLinkName of pageLinkNames) {
            const pageLink = this.createPageLink(pageLinkName);
            const pageLinkMenu = pageLink.getAttr('menu');
            if (pageLinkMenu) {
                const pageFilePath = pageLink.getPageFilePath();
                const pageFile = new JsonFile(pageFilePath);
                await pageFile.read();

                // menu
                if (!menu[pageLinkMenu]) {
                    menu[pageLinkMenu] = [];
                }
                menu[pageLinkMenu].push({
                    type: 'page',
                    page: pageLink.getAttr('name'),
                    caption: pageFile.getAttr('caption'),
                });

                // nav
                if (!nav[pageLinkMenu]) {
                    nav[pageLinkMenu] = [];
                }
                nav[pageLinkMenu].push({
                    page: pageLink.getAttr('name'),
                    caption: pageFile.getAttr('caption'),
                });
            }
        }

        // actions
        const actions = this.getCol('actions');
        if (actions.length) {
            menu['Actions'] = actions.map((actionData) => ({
                type: 'action',
                action: BaseModel.getName(actionData),
                caption: BaseModel.getAttr(actionData, 'caption'),
            }));
        }

        this.menu = menu;
        this.nav = nav;
    }

    createPageLink(name: string): BkPageLink {
        const data = this.getColItemData('pageLinks', name);
        return new BkPageLink(data, this);
    }

    async createPage(pageLinkName: string): Promise<BkPage> {
        // console.log('Application.createPage', pageLinkName);
        if (!this.isData('pageLinks', pageLinkName)) {
            throw new Error(`no page with name: ${pageLinkName}`);
        }
        const pageLink = this.createPageLink(pageLinkName);
        const relFilePath = pageLink.getAttr('fileName');
        const pageFilePath = path.join(this.getDirPath(), relFilePath);
        const content = await Helper.readTextFile(pageFilePath);
        const data = JSON.parse(content);
        const page = await this.createChildModel('pages', data);
        await page.init();
        return page;
    }

    authorizePage(user: any, pageName: string): boolean {
        return true;
    }

    async getPage(context: Context, pageLinkName: string): Promise<BkPage> {
        // console.log('Application.getPage', pageLinkName);
        const user = context.getUser();
        if (user && this.authorizePage(user, pageLinkName) === false) {
            throw new Error('authorization error');
        }
        if (this.pages[pageLinkName]) {
            return this.pages[pageLinkName];
        }
        return (this.pages[pageLinkName] = await this.createPage(pageLinkName));
    }

    getStartupPageLinkNames(): string[] {
        return this.getCol('pageLinks')
            .filter((data) => BaseModel.getAttr(data, 'startup') === 'true')
            .map((data) => BaseModel.getName(data));
    }

    async fillPages(context: Context): Promise<any[]> {
        // console.log('Application.fillPages', context.query.page);
        const pages: any[] = [];
        if (context.query.page) {
            const page = await this.getPage(context, context.query.page);
            const response = await page.fill(context);
            pages.push(response);
        } else {
            for (const pageLinkName of this.getStartupPageLinkNames()) {
                const page = await this.getPage(context, pageLinkName);
                const response = await page.fill(context);
                pages.push(response);
            }
        }
        return pages;
    }

    async authenticate(context: Context, username: string, password: string): Promise<any> {
        console.log('Application.authenticate');
        if (username === this.getAttr('user') && password === this.getAttr('password')) {
            return {
                id: 1,
                name: username,
            };
        }
        return null;
    }

    isAuthentication(): boolean {
        return this.getAttr('authentication') === 'true';
    }

    async getUsers(context: Context) {
        return null;
    }

    async rpc(name: string, context: Context) {
        console.log('Application.rpc', name, context.getReq().body);
        if (this[name]) return await this[name](context);
        throw new MyError({
            message: `no rpc ${this.constructor.name}.${name}`,
            data: { method: `${this.constructor.name}.rpc` },
            context,
        });
    }

    /*async request(options) {
        console.log(colors.magenta('Application.request'), options);
        return await axios(options);
    }*/

    getEnv(): string {
        return this.env;
    }

    getEnvVarValue(name: string) {
        // console.log(`Application.getEnvVarValue: ${name}`);
        if (!name) throw new Error('no name');
        const env = this.getEnv();
        const obj = this.data.env[env];
        if (!obj) throw new Error(`no env ${env}`);
        if (obj[name]) return obj[name];
        throw new Error(`no env ${name} in ${env}`);
    }

    getApp(): BkApplication {
        return this;
    }

    findDatabase(name: string): BkDatabase {
        const db = this.databases.find((database) => database.getName() === name);
        if (!db) throw new Error(`no database with name: ${name}`);
        return db;
    }

    getDatabase(name: string): BkDatabase {
        if (!name) throw new Error('getDatabase: no name');
        return this.findDatabase(name);
    }

    // to init custom context params before each request get/post
    async initContext(context: Context): Promise<void> {}

    static makeAppInfoFromAppFile(appFile: JsonFile, hostApp: BackHostApp): AppInfo {
        // console.log('Application.makeAppInfoFromAppFile:', appFile.filePath, appFile.data);
        const appFilePath = appFile.filePath;
        const data = appFile.data;
        const fileName = path.basename(appFilePath, path.extname(appFilePath));
        const dirName = path.basename(path.dirname(appFilePath));
        return {
            appFile: appFile,
            name: BaseModel.getName(data),
            caption: BaseModel.getAttr(data, 'caption'),
            fullName: [dirName, fileName].join('/'),
            envs: BaseModel.getEnvList(data),
            fileName: fileName,
            dirName: dirName,
            filePath: path.resolve(appFilePath),
            fileNameExt: path.basename(appFilePath),
            extName: path.extname(appFilePath),
            dirPath: path.resolve(path.dirname(appFilePath)),
            distDirPath: hostApp ? path.join(hostApp.getDistDirPath(), dirName) : null,
        };
    }

    static async loadAppInfo(appFilePath: string, hostApp: BackHostApp): Promise<AppInfo> {
        // console.log('Application.loadAppInfo', appFilePath);
        const appFile = new JsonFile(appFilePath);
        await appFile.read();
        const appInfo = BkApplication.makeAppInfoFromAppFile(appFile, hostApp);
        return appInfo;
    }

    static async getAppInfos(appsDirPath: string, hostApp: BackHostApp): Promise<AppInfo[]> {
        // console.log('BkApplication.getAppInfos', appsDirPath);
        const appFilesPaths = await Helper._glob(path.join(appsDirPath, '*/*.json'));
        const appInfos: AppInfo[] = [];
        for (let i = 0; i < appFilesPaths.length; i++) {
            const appFilePath = appFilesPaths[i];
            const appInfo = await BkApplication.loadAppInfo(appFilePath, hostApp);
            if (appInfo) {
                appInfos.push(appInfo);
            }
        }
        return appInfos;
    }

    getDataSource(name: string): BkDataSource | undefined {
        return this.dataSources.find((dataSource) => dataSource.getName() === name);
    }

    getViewClassName(): string {
        return this.getAttr('viewClass') || 'ApplicationView';
    }

    async connect(context: Context): Promise<void> {
        for (const db of this.databases) {
            await db.connect(context);
        }
    }
    async release(context): Promise<void> {
        for (const db of this.databases) {
            await db.release(context);
        }
    }
    addClient(webSocket): void {
        // add to clients
        this.clients.push(webSocket);
        // console.log('this.clients', this.clients);
    }
    removeClient(webSocket): void {
        const i = this.clients.indexOf(webSocket);
        if (i === -1) throw new Error(`cannot find socket: ${webSocket.route} ${webSocket.uuid}`);
        // console.log('i:', i);
        this.clients.splice(i, 1);
        // console.log('this.clients', this.clients);
    }

    broadcastDomesticResultToClients(context: Context, result: Result): void {
        console.log(
            'Application.broadcastDomesticResultToClients',
            context.getReq().body.uuid,
            result,
        );
        if (!context.getReq().body.uuid) throw new Error('no uuid');
        if (!result) throw new Error('no result');
        const uuid = context.getReq().body.uuid;
        for (const webSocket of this.clients) {
            if (webSocket.uuid !== uuid) {
                webSocket.send(JSON.stringify({ type: 'result', data: result }));
            }
        }
    }
    broadcastForeignResultToClients(context: Context, result: Result): void {
        console.log(
            'Application.broadcastForeignResultToClients',
            context.getReq().body.uuid,
            result,
        );
        if (!context.getReq().body.uuid) throw new Error('no uuid');
        if (!result) throw new Error('no result');
        const fResult = this.composeForeignResult(result);
        if (fResult) {
            const uuid = context.getReq().body.uuid;
            for (const webSocket of this.clients) {
                if (webSocket.uuid !== uuid) {
                    webSocket.send(JSON.stringify({ type: 'result', data: fResult }));
                }
            }
        }
    }
    composeForeignResult(result: Result): Result | null {
        let fResult: Result | null = null;
        for (const databaseName in result) {
            const database = this.findDatabase(databaseName);
            if (database) {
                for (const tableName in result[databaseName]) {
                    const table = database.findTable(tableName);
                    if (table) {
                        if (!fResult) fResult = new Result();
                        if (!fResult[databaseName]) fResult[databaseName] = {};
                        fResult[databaseName][tableName] = { refresh: true };
                    }
                }
            }
        }
        return fResult;
    }
    getTitle(context: Context) {
        return this.getAttr('caption');
    }

    getLoginViewClassName(): string {
        return 'LoginView';
    }

    isAvailable(): boolean {
        return true;
    }

    async handleGetFile(context: Context, next) {
        // console.log('Application.handleGetFile', context.getUri());
        const filePath = path.join(this.getPublicDirPath(), context.getUri());
        if (await Helper.exists(filePath)) {
            context.getRes().sendFile(filePath);
        } else {
            // next();
            context.getRes().status(404).end('Not Found');
            await this.getHostApp().logError(
                new Error(`not found ${context.getUri()}`),
                context.getReq(),
            );
        }
        /*
        if (this.isAuthentication() && !(context.getReq().session.user && context.getReq().session.user[context.getRoute()])) {
            throw new MyError({message: 'not authenticated', context});
        }
        */
    }
}
