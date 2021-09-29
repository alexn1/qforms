import {AppInfo} from "../../../AppInfo";
import { v4 as uuidv4 } from 'uuid';

const path  = require('path');
const axios = require('axios');
const colors = require('colors/safe');

import BackHostApp from '../../../BackHostApp';
import BaseModel from '../../../BaseModel';
import Model from '../Model';
import Action from '../Action/Action';
import Database from '../Database/Database';
import DataSource from '../DataSource/DataSource';
import Helper from '../../../Helper';
import Page from '../Page/Page';
import PageLink from '../PageLink/PageLink';
import Context   from '../../../Context';
import JsonFile from '../../../JsonFile';
import MyError from '../../../MyError';

const text = require('../../text');
const pkg  = require('../../../../../package.json');

class Application extends Model {
    appInfo: AppInfo;
    hostApp: any;
    env: string;
    databases: Database[];
    actions: Action[];
    dataSources: DataSource[];
    pages: any;
    links: any[];
    scripts: any[];
    domain: string;
    menu: any;
    nav: any;
    clients: any[];

    constructor(
        data: any,
        appInfo: AppInfo,
        hostApp: BackHostApp,
        context: Context
    ) {
        super(data);
        if (!hostApp) throw new Error('no hostApp');
        if (!context.getEnv()) throw new Error('no env');
        this.appInfo     = appInfo;
        this.hostApp     = hostApp;
        this.env         = context.getEnv();

        this.databases   = [];
        this.actions     = [];
        this.dataSources = [];
        this.pages       = {};
        this.clients     = [];
        this.domain      = hostApp.getDomain(context.req);
    }

    async init(context: Context) {
        await super.init(context);
        await this.createColItems('databases', context);
        await this.createColItems('actions', context);
        await this.createColItems('dataSources', context);
        this.links   = await this.getLinks(context);
        this.scripts = await this.getScripts(context);
        await this.createMenu(context);
    }

    async getLinks(context: Context): Promise<string[]> {
        return (await Helper.getFilePaths(this.getFrontendDirPath(), 'css'))
            .map(src => `${context.getVirtualPath()}/${src}`);
    }

    async getScripts(context: Context): Promise<string[]> {
        return (await Helper.getFilePaths(this.getFrontendDirPath(), 'js'))
            .map(src => `${context.getVirtualPath()}/${src}`);
    }

    async deinit() {
        console.log('Application.deinit: ' + this.getName());

        // databases
        for (const database of this.databases) {
            await database.deinit();
        }
    }

    getDirPath(): string {
        return this.appInfo.dirPath;
    }

    getFrontendDirPath() {
        return path.join(this.getDirPath(), 'frontend');
    }

    getText(): any {
        return text[this.getAttr('lang') || 'en'];
    }

    getVersion() {
        return null;
    }

    fillAttributes(response: any): void {
        response.class = this.getClassName();
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
        response.lang = this.getAttr('lang');
        response.theme = this.getAttr('theme');
    }

    async fill(context: Context) {
        // console.log('Application.fill');

        const start = Date.now();
        const response = await super.fill(context);

        response.domain          = this.domain;
        response.logErrorUrl     = this.hostApp.logErrorUrl;
        response.platformVersion = pkg.version;
        response.appVersion      = this.getVersion();
        response.virtualPath     = context.getVirtualPath();

        await this.fillCollection(response, 'databases'  , context);
        await this.fillCollection(response, 'actions'    , context);
        await this.fillCollection(response, 'dataSources', context);

        // nodeEnv
        response.nodeEnv = this.hostApp.getNodeEnv();

        // text
        response.text = this.getText();

        // menu
        response.menu = this.menu;

        // nav
        response.nav = this.nav;

        // route
        response.route = context.getRoute();

        // uuid
        response.uuid = uuidv4();

        // actions
        response.actions = this.getCol('actions').map(data => ({
            name : BaseModel.getName(data),
            caption: BaseModel.getAttr(data, 'caption')
        }));

        // pages
        response.pages = await this.fillPages(context);

        // user
        response.user = this.isAuthentication() ? await this.getClientUserFromServerUser(context) : null;

        // time
        response.time = Date.now() - start;

        return response;
    }

    async getClientUserFromServerUser(context: Context): Promise<any> {
        const user = context.getUser();
        return {
            id   : user.id,
            login: user.name
        };
    }

    async createMenu(context: Context): Promise<void> {
        console.log('Application.createMenu');
        const menu = {};
        const nav = {};

        // pages
        const user = context.getUser();
        const pageLinkNames = this.getItemNames('pageLinks').filter(pageLinkName => {
            return user ? this.authorizePage(user, pageLinkName) : true;
        });
        for (const pageLinkName of pageLinkNames) {
            const pageLink = this.createPageLink(pageLinkName);
            const pageLinkMenu = pageLink.getAttr('menu');
            if (pageLinkMenu) {
                // const pageFilePath = path.join(this.getDirPath(), pageLink.getAttr('fileName'));
                const pageFilePath = pageLink.getPageFilePath();
                const pageFile = new JsonFile(pageFilePath);
                await pageFile.read();

                // menu
                if (!menu[pageLinkMenu]) {
                    menu[pageLinkMenu] = [];
                }
                menu[pageLinkMenu].push({
                    type   :'page',
                    page   : pageLink.getAttr('name'),
                    caption: pageFile.getAttr('caption')
                });

                // nav
                if (!nav[pageLinkMenu]) {
                    nav[pageLinkMenu] = [];
                }
                nav[pageLinkMenu].push({
                    page   : pageLink.getAttr('name'),
                    caption: pageFile.getAttr('caption')
                });
            }
        }

        // actions
        const actions = this.getCol('actions');
        if (actions.length) {
            menu['Actions'] = actions.map(actionData => ({
                type   : 'action',
                action : BaseModel.getName(actionData),
                caption: BaseModel.getAttr(actionData, 'caption')
            }));
        }

        this.menu = menu;
        this.nav  = nav;
    }

    createPageLink(name: string): PageLink {
        const data = this.getColItemData('pageLinks', name);
        return new PageLink(data, this);
    }

    async createPage(pageLinkName: string): Promise<Page> {
        // console.log('Application.createPage', pageLinkName);
        if (!this.isData('pageLinks', pageLinkName)) {
            throw new Error(`no page with name: ${pageLinkName}`);
        }
        const pageLink = this.createPageLink(pageLinkName);
        const relFilePath  = pageLink.getAttr('fileName');
        const pageFilePath = path.join(this.getDirPath(), relFilePath);
        const content = await Helper.readTextFile(pageFilePath);
        const data = JSON.parse(content);
        const page = await this.createChildModel('pages', data);
        await page.init();
        return page;
    }

    authorizePage(user, pageName: string) {
        return true;
    }

    async getPage(context: Context, pageLinkName: string): Promise<Page> {
        // console.log('Application.getPage', pageLinkName);
        const user = context.getUser();
        if (user && this.authorizePage(user, pageLinkName) === false) {
            throw new Error('authorization error');
        }
        if (this.pages[pageLinkName]) {
            return this.pages[pageLinkName];
        }
        return this.pages[pageLinkName] = await this.createPage(pageLinkName);
    }

    getStartupPageLinkNames(): string[] {
        return this.getCol('pageLinks')
            .filter(data => BaseModel.getAttr(data, 'startup') === 'true')
            .map(data => BaseModel.getName(data));
    }

    async fillPages(context: Context) {
        // console.log('Application.fillPages', context.query.page);
        const pages = [];
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

    async authenticate(context: Context, username: string, password: string) {
        console.log('Application.authenticate');
        if (username === this.getAttr('user') && password === this.getAttr('password')) {
            return {
                id  : 1,
                name: username
            };
        }
        return null;
    }

    isAuthentication() {
        return this.getAttr('authentication') === 'true';
    }

    async getUsers(context: Context) {
        return null;
    }

    async rpc(name: string, context: Context) {
        console.log('Application.rpc', name, context.req.body);
        if (this[name]) return await this[name](context);
        throw new MyError({
            message: `no rpc ${this.constructor.name}.${name}`,
            data   : {method: `${this.constructor.name}.rpc`},
            context,
        });
    }

    async request(options) {
        console.log(colors.magenta('Application.request'), options);
        return await axios(options);
    }

    getEnv() {
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

    getApp(): Application {
        return this;
    }

    getDatabase(name: string): Database {
        if (!name) throw new Error('getDatabase: no name');
        const database = this.databases.find(database => database.getName() === name);
        if (!database) throw new Error(`no database with name: ${name}`);
        return database;
    }

    /*getTitle(context: Context, response): string {
        // console.log('Application.getTitle', context.query.page);
        // if (context.query.page) {
        //     const page = this.pages[context.query.page];
        //     if (!page) throw new Error(`no page: ${context.query.page}`);
        //     const pageResponse = response.pages.length === 1 ? response.pages[0] : null;
        //     return page.getTitle(context, pageResponse);
        // }
        const pageResponse = response.pages[0];
        if (pageResponse) {
            // const pageName = pageResponse.name;
            // const page = this.pages[pageName];
            // return page.getTitle(context, pageResponse);
            return pageResponse.title;
        }
        return `${context.getAppDirName()}/${context.getAppFileName()}[${this.getEnv()}]`;
    }*/
    // to init custom context params before each request get/post
    async initContext(context: Context) {

    }

    static makeAppInfoFromAppFile(appFile: JsonFile): AppInfo {
        // console.log('Application.makeAppInfoFromAppFile:', appFile.filePath, appFile.data);
        const appFilePath = appFile.filePath;
        const data = appFile.data;
        const fileName = path.basename(appFilePath, path.extname(appFilePath));
        const dirName  = path.basename(path.dirname(appFilePath));
        return {
            appFile     : appFile,
            name        : BaseModel.getName(data),
            caption     : BaseModel.getAttr(data, 'caption'),
            fullName    : [dirName, fileName].join('/'),
            envs        : BaseModel.getEnvList(data),
            fileName    : fileName,
            dirName     : dirName,
            filePath    : path.resolve(appFilePath),
            fileNameExt : path.basename(appFilePath),
            extName     : path.extname(appFilePath),
            dirPath     : path.resolve(path.dirname(appFilePath))
        };
    }

    static async loadAppInfo(appFilePath) {
        // console.log('Application.loadAppInfo', appFilePath);
        const appFile = new JsonFile(appFilePath);
        await appFile.read();
        const appInfo = Application.makeAppInfoFromAppFile(appFile);
        return appInfo;
    }

    static async getAppInfos(appsDirPath) {
        // console.log('Application.getAppInfos', appsDirPath);
        const appFilesPaths = await Helper._glob(path.join(appsDirPath, '*/*.json'));
        const appInfos = [];
        for (let i = 0; i < appFilesPaths.length; i++) {
            const appFilePath = appFilesPaths[i];
            const appInfo = await Application.loadAppInfo(appFilePath);
            if (appInfo) {
                appInfos.push(appInfo);
            }
        }
        return appInfos;
    }

    getDataSource(name): DataSource {
        return this.dataSources.find(dataSource => dataSource.getName() === name);
    }

    getViewClassName() {
        return 'ApplicationView';
    }

    async connect(context: Context): Promise<void> {
        for (const db of this.databases) {
            await db.connect(context);
        }
    }
    release(context): void {
        for (const db of this.databases) {
            db.release(context);
        }
    }
    addClient(webSocket) {
        // add to clients
        this.clients.push(webSocket);
        // console.log('this.clients', this.clients);
    }
    removeClient(webSocket) {
        const i = this.clients.indexOf(webSocket);
        if (i === -1) throw new Error(`cannot find socket: ${webSocket.route} ${webSocket.uuid}`);
        console.log('i:', i);
        this.clients.splice(i, 1);
        // console.log('this.clients', this.clients);
    }
    broadcastResultToClients(from: string, result: any) {
        console.log('Application.broadcastResultToClients', from, result);
        if (!from) throw new Error('no from');
        if (!result) throw new Error('no result');
        for (const webSocket of this.clients) {
            if (webSocket.uuid !== from) {
                webSocket.send(JSON.stringify({type: 'result', data: result}));
            }
        }
    }
}

export = Application;
