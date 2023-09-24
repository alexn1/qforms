import path, { join } from 'path';
import { WebSocket } from 'ws';
// import axios from 'axios';
// import colors from 'colors/safe';
import { AppInfo } from '../../../AppInfo';
import { BackHostApp } from '../../../BackHostApp';
import { BaseModel } from '../../../BaseModel';
import { BkModel } from '../BkModel';
import { BkAction } from '../BkAction/BkAction';
import { BkDatabase } from '../BkDatabase/BkDatabase';
import { BkDataSource } from '../BkDataSource/BkDataSource';
import { BkHelper } from '../../../BkHelper';
import { BkPage } from '../BkPage/BkPage';
import { BkPageLink } from '../BkPageLink/BkPageLink';
import { Context } from '../../../Context';
import { JsonFile } from '../../../JsonFile';
import { HttpError } from '../../../HttpError';
import { Result } from '../../../../Result';
import { ApplicationController } from '../../../../frontend/viewer/Controller/ModelController/ApplicationController/ApplicationController';
import { home } from '../../home';
import * as text from '../../text';
import { ApplicationData, MenuItem } from '../../../../common/ModelData/ApplicationData';
import { ApplicationScheme } from '../../../common/Scheme/ApplicationScheme';
import { NextFunction } from 'express';
import { debug } from '../../../../console';
import { ActionScheme } from '../../../common/Scheme/ActionScheme';
import { PageLinkScheme } from '../../../common/Scheme/PageLinkScheme';
import { Link, Nullable } from '../../../../types';
import { PageData } from '../../../../common/ModelData/PageData';
import { pConsole } from '../../../../pConsole';
import { _glob, exists2, getFilePaths, readTextFile } from '../../../FileHelper';
import { newClientId } from '../../../WebScoketHelper';

const pkg = require('../../../../../package.json');

export interface ServerUser {
    id: number;
    name: string;
}

export interface ClientUser {
    id: number;
    login: string;
}

export class BkApplication<
    THostApp extends BackHostApp = BackHostApp,
> extends BkModel<ApplicationScheme> {
    databases: BkDatabase[] = [];
    actions: BkAction[] = [];
    dataSources: BkDataSource[] = [];
    pages: { [pageLinkName: string]: BkPage } = {};
    links: Array<Link | string>;
    scripts: string[];
    menu: Record<string, any[]>;
    nav: Record<string, any[]>;
    clients: WebSocket[] = [];

    constructor(
        private appInfo: AppInfo,
        private hostApp: THostApp,
        private env: string = 'local',
    ) {
        super(appInfo.appFile.data);
        if (!hostApp) throw new Error('BkApplication: no hostApp');
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

    getHostApp(): THostApp {
        return this.hostApp;
    }

    async getLinks(context: Context): Promise<Array<Link | string>> {
        const virtualPath = context.getVirtualPath();
        return (await getFilePaths(this.getPublicDirPath(), 'css')).map(
            (src) => `${virtualPath}/${src}`,
        );
    }

    async getScripts(context: Context): Promise<string[]> {
        const virtualPath = context.getVirtualPath();
        const publicDirPath = this.getPublicDirPath();
        debug('publicDirPath:', publicDirPath);
        return (await getFilePaths(publicDirPath, 'js')).map(
            (src: string) => `${virtualPath}/${src}`,
        );
    }

    async deinit(): Promise<void> {
        debug(`Application.deinit: ${this.getName()}`);
        await super.deinit();

        // databases
        for (const database of this.databases) {
            await database.deinit();
        }
    }

    getDirPath(): string {
        return this.appInfo.dirPath;
    }

    /* getDistDirPath(): string | undefined {
        return this.appInfo.distDirPath;
    } */

    getPublicDirPath(): string {
        // const distDirPath = this.getDistDirPath();
        const dirPath = this.getDirPath();
        // if (!dirPath) throw new Error('no dirPath');
        return path.join(dirPath, 'public');
    }

    getText(): any {
        const lang = this.getAttr('lang') || 'en';
        return text[lang];
    }

    getVersion(): string | null {
        return null;
    }

    fillAttributes(response: ApplicationData): void {
        response.class = this.getClassName();
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
        response.lang = this.getAttr('lang');
        response.theme = this.getAttr('theme');
        response.cssBlock = this.getAttr('cssBlock');
        response.viewClass = this.getAttr('viewClass');
        response.ctrlClass = this.getAttr('ctrlClass');
    }

    async fill(context: Context): Promise<ApplicationData> {
        // debug('Application.fill');
        const start = Date.now();
        const response = (await super.fill(context)) as ApplicationData;

        response.route = context.getRoute();
        response.domain = context.getDomain();
        response.virtualPath = context.getVirtualPath();
        response.logErrorUrl = this.getHostApp().getFrontLogUrl() || '/error';
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
        response.uuid = newClientId();

        // actions
        response.actions = this.getCol('actions').map((action: ActionScheme) => ({
            name: BaseModel.getName(action),
            caption: BaseModel.getAttr(action, 'caption'),
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

    async getClientUserFromServerUser(context: Context): Promise<ClientUser> {
        const user = context.getUser();
        if (!user) throw new Error('getClientUserFromServerUser: no server user');
        return {
            id: user.id,
            login: user.name,
        };
    }

    async createMenu(ctx: Context): Promise<void> {
        // debug('Application.createMenu');
        const menu: Record<string, MenuItem[]> = {};
        const nav: Record<string, any[]> = {};

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
            menu['Actions'] = actions.map((action: ActionScheme) => ({
                type: 'action',
                action: BaseModel.getName(action),
                caption: BaseModel.getAttr(action, 'caption'),
            }));
        }

        this.menu = menu;
        this.nav = nav;
    }

    createPageLink(name: string): BkPageLink {
        const data = this.getColItemData('pageLinks', name);
        return new BkPageLink(data, this);
    }

    async createPage(context: Context, pageLinkName: string): Promise<BkPage> {
        // debug('Application.createPage', pageLinkName);
        if (!this.isData('pageLinks', pageLinkName)) {
            throw new Error(`no page with name: ${pageLinkName}`);
        }
        const pageLink = this.createPageLink(pageLinkName);
        const relFilePath = pageLink.getAttr('fileName');
        const pageFilePath = path.join(this.getDirPath(), relFilePath);
        const content = await readTextFile(pageFilePath);
        const data = JSON.parse(content);
        const page = (await this.createChildModel('pages', data)) as BkPage;
        await page.init(context);
        return page;
    }

    authorizePage(user: any, pageName: string): boolean {
        return true;
    }

    async getPage(context: Context, pageLinkName: string): Promise<BkPage> {
        pConsole.debug('Application.getPage', pageLinkName);
        const user = context.getUser();
        if (user && this.authorizePage(user, pageLinkName) === false) {
            throw new Error('authorization error');
        }
        if (this.pages[pageLinkName]) {
            return this.pages[pageLinkName];
        }
        return (this.pages[pageLinkName] = await this.createPage(context, pageLinkName));
    }

    getStartupPageLinkNames(): string[] {
        return this.getCol('pageLinks')
            .filter((data: PageLinkScheme) => BaseModel.getAttr(data, 'startup') === 'true')
            .map((data: PageLinkScheme) => BaseModel.getName(data));
    }

    getPageLinksToFill(context: Context): string[] {
        const pageLinkName = context.getPage();
        if (pageLinkName) {
            return [pageLinkName];
        }
        return this.getStartupPageLinkNames();
    }

    async fillPages(context: Context): Promise<PageData[]> {
        // debug('Application.fillPages');
        const pages: PageData[] = [];
        const pageLinksNames = this.getPageLinksToFill(context);
        for (const pageLinkName of pageLinksNames) {
            const page = await this.getPage(context, pageLinkName);
            const response = await page.fill(context);
            pages.push(response);
        }
        return pages;
    }

    async authenticate(
        ctx: Context,
        username: string,
        password: string,
    ): Promise<Nullable<ServerUser>> {
        debug('Application.authenticate');
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
        debug('BkApplication.rpc', name, context.getBody());
        // @ts-ignore
        if (this[name]) return await this[name](context);
        throw new HttpError({
            message: `no remote proc ${this.constructor.name}.${name}`,
            data: { method: `${this.constructor.name}.rpc` },
            context,
        });
    }

    /* async request(options) {
        debug(colors.magenta('Application.request'), options);
        return await axios(options);
    } */

    getEnv(): string {
        return this.env;
    }

    getEnvVarValue(name: string) {
        // debug(`Application.getEnvVarValue: ${name}`);
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

    findDatabase(name: string): BkDatabase | undefined {
        return this.databases.find((database) => database.getName() === name);
    }

    getDatabase(name: string): BkDatabase {
        const db = this.findDatabase(name);
        if (!db) throw new Error(`no database with name: ${name}`);
        return db;
    }

    // to init custom context params before each request get/post
    async initContext(context: Context): Promise<void> {}

    static makeAppInfoFromAppFile(appFile: JsonFile /* , distDirPath?: string */): AppInfo {
        // debug('Application.makeAppInfoFromAppFile:', appFile.filePath, appFile.data);
        const { data, filePath } = appFile;
        const dirName = path.basename(path.dirname(filePath));
        const fileName = path.basename(filePath, path.extname(filePath));
        return {
            appFile,
            name: BaseModel.getName(data),
            caption: BaseModel.getAttr(data, 'caption'),
            fullName: join(dirName, fileName),
            envs: BkApplication.getEnvList(data),
            dirName,
            fileName,
            filePath: path.resolve(filePath),
            fileNameExt: path.basename(filePath),
            extName: path.extname(filePath),
            dirPath: path.resolve(path.dirname(filePath)),
            // distDirPath,
        };
    }

    static async loadAppInfo(appFilePath: string /* , distDirPath?: string */): Promise<AppInfo> {
        debug('Application.loadAppInfo', appFilePath /* , distDirPath */);
        const appFile = new JsonFile(appFilePath);
        await appFile.read();
        const appInfo = BkApplication.makeAppInfoFromAppFile(appFile /* , distDirPath */);
        return appInfo;
    }

    static async getAppInfos(appsDirPath: string /* , distDirPath?: string */): Promise<AppInfo[]> {
        // debug('BkApplication.getAppInfos', appsDirPath);
        const appFilesPaths = await _glob(path.join(appsDirPath, '*/*.json'));
        const appInfos: AppInfo[] = [];
        for (let i = 0; i < appFilesPaths.length; i++) {
            const appFilePath = appFilesPaths[i];
            const appInfo = await BkApplication.loadAppInfo(appFilePath /* , distDirPath */);
            if (appInfo) {
                appInfos.push(appInfo);
            }
        }
        return appInfos;
    }

    findDataSource(name: string): BkDataSource | undefined {
        return this.dataSources.find((dataSource) => dataSource.getName() === name);
    }

    getDataSource(name: string): BkDataSource {
        const ds = this.findDataSource(name);
        if (!ds) throw new Error(`${this.getName()}: no data source ${name}`);
        return ds;
    }

    getViewClassName(): string {
        return this.getAttr('viewClass') || 'ApplicationView';
    }

    async connect(context: Context): Promise<void> {
        try {
            for (const db of this.databases) {
                await db.connect(context);
            }
        } catch (err) {
            // if some databases already connected successfully
            for (const db of this.databases) {
                if (db.isConnected(context)) {
                    await db.release(context);
                }
            }
            throw err;
        }
    }

    async release(context: Context): Promise<void> {
        for (const db of this.databases) {
            await db.release(context);
        }
    }

    addClient(webSocket: WebSocket): void {
        // add to clients
        this.clients.push(webSocket);
        // debug('this.clients', this.clients);
    }

    removeClient(webSocket: WebSocket): void {
        const i = this.clients.indexOf(webSocket);
        // @ts-ignore
        if (i === -1) throw new Error(`cannot find socket: ${webSocket.route} ${webSocket.uuid}`);
        // debug('i:', i);
        this.clients.splice(i, 1);
        // debug('this.clients', this.clients);
    }

    broadcastDomesticResultToClients(context: Context, result: Result): void {
        debug('Application.broadcastDomesticResultToClients', context.getReq()!.body.uuid, result);
        if (!context.getReq()!.body.uuid) throw new Error('no uuid');
        if (!result) throw new Error('no result');
        const uuid = context.getReq()!.body.uuid;
        for (const webSocket of this.clients) {
            // @ts-ignore
            if (webSocket.uuid !== uuid) {
                webSocket.send(JSON.stringify({ type: 'result', data: result }));
            }
        }
    }

    broadcastForeignResultToClients(context: Context, result: Result): void {
        debug('Application.broadcastForeignResultToClients', context.getReq()!.body.uuid, result);
        if (!context.getReq()!.body.uuid) throw new Error('no uuid');
        if (!result) throw new Error('no result');
        const fResult = this.composeForeignResult(result);
        if (fResult) {
            const uuid = context.getReq()!.body.uuid;
            for (const webSocket of this.clients) {
                // @ts-ignore
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

    async handleGetFile(context: Context, next: NextFunction) {
        // debug('Application.handleGetFile', context.getUri());
        const filePath = path.join(this.getPublicDirPath(), context.getUri());
        pConsole.debug(`filePath: ${filePath}`);
        if (await exists2(filePath)) {
            // context.setVersionHeaders(pkg.version, this.getVersion());
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
            throw new HttpError({message: 'not authenticated', context});
        }
        */
    }

    renderIndexHtml(
        context: Context,
        applicationController: ApplicationController,
        qformsVersion: string,
        links: string,
        scripts: string,
        data: ApplicationData,
        appViewHtml: string,
    ): string {
        return home(
            this,
            context,
            applicationController,
            qformsVersion,
            links,
            scripts,
            data,
            appViewHtml,
        );
    }

    static getEnvList(data: ApplicationScheme): string[] {
        const list = data.env ? Object.keys(data.env).filter((env) => env !== 'local') : [];
        return ['local', ...list];
    }
}
