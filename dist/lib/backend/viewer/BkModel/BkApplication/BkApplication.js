"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkApplication = void 0;
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const BaseModel_1 = require("../../../BaseModel");
const BkModel_1 = require("../BkModel");
const Helper_1 = require("../../../Helper");
const BkPageLink_1 = require("../BkPageLink/BkPageLink");
const JsonFile_1 = require("../../../JsonFile");
const MyError_1 = require("../../../MyError");
const Result_1 = require("../../../../Result");
const text = __importStar(require("../../text"));
const pkg = require('../../../../../package.json');
class BkApplication extends BkModel_1.BkModel {
    constructor(data, appInfo, hostApp, context) {
        super(data);
        this.appInfo = appInfo;
        this.hostApp = hostApp;
        this.databases = [];
        this.actions = [];
        this.dataSources = [];
        this.pages = {};
        this.clients = [];
        if (!hostApp)
            throw new Error('no hostApp');
        if (!context)
            throw new Error('no route');
        this.env = context.getEnv();
    }
    async init(context) {
        await super.init(context);
        await this.createColItems('databases', context);
        await this.createColItems('actions', context);
        await this.createColItems('dataSources', context);
        this.links = await this.getLinks(context);
        this.scripts = await this.getScripts(context);
        await this.createMenu(context);
    }
    getHostApp() {
        return this.hostApp;
    }
    async getLinks(context) {
        const virtualPath = context.getVirtualPath();
        return (await Helper_1.Helper.getFilePaths(this.getPublicDirPath(), 'css')).map((src) => `${virtualPath}/${src}`);
    }
    async getScripts(context) {
        const virtualPath = context.getVirtualPath();
        const publicDirPath = this.getPublicDirPath();
        // console.log('publicDirPath:', publicDirPath);
        return (await Helper_1.Helper.getFilePaths(publicDirPath, 'js')).map((src) => `${virtualPath}/${src}`);
    }
    async deinit() {
        console.log('Application.deinit: ' + this.getName());
        // databases
        for (const database of this.databases) {
            await database.deinit();
        }
    }
    getDirPath() {
        return this.appInfo.dirPath;
    }
    getDistDirPath() {
        return this.appInfo.distDirPath;
    }
    getPublicDirPath() {
        const distDirPath = this.getDistDirPath();
        if (!distDirPath)
            throw new Error('no distDirPath');
        return path_1.default.join(distDirPath, 'public');
    }
    getText() {
        const lang = this.getAttr('lang') || 'en';
        return text[lang];
    }
    getVersion() {
        return null;
    }
    fillAttributes(response) {
        response.class = this.getClassName();
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
        response.lang = this.getAttr('lang');
        response.theme = this.getAttr('theme');
        response.cssBlock = this.getAttr('cssBlock');
        response.viewClass = this.getAttr('viewClass');
        response.ctrlClass = this.getAttr('ctrlClass');
    }
    async fill(context) {
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
        response.uuid = (0, uuid_1.v4)();
        // actions
        response.actions = this.getCol('actions').map((data) => ({
            name: BaseModel_1.BaseModel.getName(data),
            caption: BaseModel_1.BaseModel.getAttr(data, 'caption'),
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
    async getClientUserFromServerUser(context) {
        const user = context.getUser();
        return {
            id: user.id,
            login: user.name,
        };
    }
    async createMenu(context) {
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
                const pageFile = new JsonFile_1.JsonFile(pageFilePath);
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
                action: BaseModel_1.BaseModel.getName(actionData),
                caption: BaseModel_1.BaseModel.getAttr(actionData, 'caption'),
            }));
        }
        this.menu = menu;
        this.nav = nav;
    }
    createPageLink(name) {
        const data = this.getColItemData('pageLinks', name);
        return new BkPageLink_1.BkPageLink(data, this);
    }
    async createPage(pageLinkName) {
        // console.log('Application.createPage', pageLinkName);
        if (!this.isData('pageLinks', pageLinkName)) {
            throw new Error(`no page with name: ${pageLinkName}`);
        }
        const pageLink = this.createPageLink(pageLinkName);
        const relFilePath = pageLink.getAttr('fileName');
        const pageFilePath = path_1.default.join(this.getDirPath(), relFilePath);
        const content = await Helper_1.Helper.readTextFile(pageFilePath);
        const data = JSON.parse(content);
        const page = await this.createChildModel('pages', data);
        await page.init();
        return page;
    }
    authorizePage(user, pageName) {
        return true;
    }
    async getPage(context, pageLinkName) {
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
    getStartupPageLinkNames() {
        return this.getCol('pageLinks')
            .filter((data) => BaseModel_1.BaseModel.getAttr(data, 'startup') === 'true')
            .map((data) => BaseModel_1.BaseModel.getName(data));
    }
    async fillPages(context) {
        // console.log('Application.fillPages', context.query.page);
        const pages = [];
        if (context.query.page) {
            const page = await this.getPage(context, context.query.page);
            const response = await page.fill(context);
            pages.push(response);
        }
        else {
            for (const pageLinkName of this.getStartupPageLinkNames()) {
                const page = await this.getPage(context, pageLinkName);
                const response = await page.fill(context);
                pages.push(response);
            }
        }
        return pages;
    }
    async authenticate(context, username, password) {
        console.log('Application.authenticate');
        if (username === this.getAttr('user') && password === this.getAttr('password')) {
            return {
                id: 1,
                name: username,
            };
        }
        return null;
    }
    isAuthentication() {
        return this.getAttr('authentication') === 'true';
    }
    async getUsers(context) {
        return null;
    }
    async rpc(name, context) {
        console.log('Application.rpc', name, context.getReq().body);
        if (this[name])
            return await this[name](context);
        throw new MyError_1.MyError({
            message: `no rpc ${this.constructor.name}.${name}`,
            data: { method: `${this.constructor.name}.rpc` },
            context,
        });
    }
    /*async request(options) {
        console.log(colors.magenta('Application.request'), options);
        return await axios(options);
    }*/
    getEnv() {
        return this.env;
    }
    getEnvVarValue(name) {
        // console.log(`Application.getEnvVarValue: ${name}`);
        if (!name)
            throw new Error('no name');
        const env = this.getEnv();
        const obj = this.data.env[env];
        if (!obj)
            throw new Error(`no env ${env}`);
        if (obj[name])
            return obj[name];
        throw new Error(`no env ${name} in ${env}`);
    }
    getApp() {
        return this;
    }
    findDatabase(name) {
        const db = this.databases.find((database) => database.getName() === name);
        if (!db)
            throw new Error(`no database with name: ${name}`);
        return db;
    }
    getDatabase(name) {
        if (!name)
            throw new Error('getDatabase: no name');
        return this.findDatabase(name);
    }
    // to init custom context params before each request get/post
    async initContext(context) { }
    static makeDistDirPath(appFilePath, hostApp) {
        const dirName = path_1.default.basename(path_1.default.dirname(appFilePath));
        const distDirPath = path_1.default.join(hostApp.getDistDirPath(), dirName);
        return distDirPath;
    }
    static makeAppInfoFromAppFile(appFile, distDirPath) {
        // console.log('Application.makeAppInfoFromAppFile:', appFile.filePath, appFile.data);
        const appFilePath = appFile.filePath;
        const data = appFile.data;
        const fileName = path_1.default.basename(appFilePath, path_1.default.extname(appFilePath));
        const dirName = path_1.default.basename(path_1.default.dirname(appFilePath));
        return {
            appFile: appFile,
            name: BaseModel_1.BaseModel.getName(data),
            caption: BaseModel_1.BaseModel.getAttr(data, 'caption'),
            fullName: [dirName, fileName].join('/'),
            envs: BaseModel_1.BaseModel.getEnvList(data),
            fileName: fileName,
            dirName: dirName,
            filePath: path_1.default.resolve(appFilePath),
            fileNameExt: path_1.default.basename(appFilePath),
            extName: path_1.default.extname(appFilePath),
            dirPath: path_1.default.resolve(path_1.default.dirname(appFilePath)),
            distDirPath: distDirPath,
        };
    }
    static async loadAppInfo(appFilePath, distDirPath) {
        // console.log('Application.loadAppInfo', appFilePath);
        const appFile = new JsonFile_1.JsonFile(appFilePath);
        await appFile.read();
        const appInfo = BkApplication.makeAppInfoFromAppFile(appFile, distDirPath);
        return appInfo;
    }
    static async getAppInfos(appsDirPath, distDirPath) {
        // console.log('BkApplication.getAppInfos', appsDirPath);
        const appFilesPaths = await Helper_1.Helper._glob(path_1.default.join(appsDirPath, '*/*.json'));
        const appInfos = [];
        for (let i = 0; i < appFilesPaths.length; i++) {
            const appFilePath = appFilesPaths[i];
            const appInfo = await BkApplication.loadAppInfo(appFilePath, distDirPath);
            if (appInfo) {
                appInfos.push(appInfo);
            }
        }
        return appInfos;
    }
    getDataSource(name) {
        return this.dataSources.find((dataSource) => dataSource.getName() === name);
    }
    getViewClassName() {
        return this.getAttr('viewClass') || 'ApplicationView';
    }
    async connect(context) {
        for (const db of this.databases) {
            await db.connect(context);
        }
    }
    async release(context) {
        for (const db of this.databases) {
            await db.release(context);
        }
    }
    addClient(webSocket) {
        // add to clients
        this.clients.push(webSocket);
        // console.log('this.clients', this.clients);
    }
    removeClient(webSocket) {
        const i = this.clients.indexOf(webSocket);
        if (i === -1)
            throw new Error(`cannot find socket: ${webSocket.route} ${webSocket.uuid}`);
        // console.log('i:', i);
        this.clients.splice(i, 1);
        // console.log('this.clients', this.clients);
    }
    broadcastDomesticResultToClients(context, result) {
        console.log('Application.broadcastDomesticResultToClients', context.getReq().body.uuid, result);
        if (!context.getReq().body.uuid)
            throw new Error('no uuid');
        if (!result)
            throw new Error('no result');
        const uuid = context.getReq().body.uuid;
        for (const webSocket of this.clients) {
            if (webSocket.uuid !== uuid) {
                webSocket.send(JSON.stringify({ type: 'result', data: result }));
            }
        }
    }
    broadcastForeignResultToClients(context, result) {
        console.log('Application.broadcastForeignResultToClients', context.getReq().body.uuid, result);
        if (!context.getReq().body.uuid)
            throw new Error('no uuid');
        if (!result)
            throw new Error('no result');
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
    composeForeignResult(result) {
        let fResult = null;
        for (const databaseName in result) {
            const database = this.findDatabase(databaseName);
            if (database) {
                for (const tableName in result[databaseName]) {
                    const table = database.findTable(tableName);
                    if (table) {
                        if (!fResult)
                            fResult = new Result_1.Result();
                        if (!fResult[databaseName])
                            fResult[databaseName] = {};
                        fResult[databaseName][tableName] = { refresh: true };
                    }
                }
            }
        }
        return fResult;
    }
    getTitle(context) {
        return this.getAttr('caption');
    }
    getLoginViewClassName() {
        return 'LoginView';
    }
    isAvailable() {
        return true;
    }
    async handleGetFile(context, next) {
        // console.log('Application.handleGetFile', context.getUri());
        const filePath = path_1.default.join(this.getPublicDirPath(), context.getUri());
        if (await Helper_1.Helper.exists(filePath)) {
            context.getRes().sendFile(filePath);
        }
        else {
            // next();
            context.getRes().status(404).end('Not Found');
            await this.getHostApp().logError(new Error(`not found ${context.getUri()}`), context.getReq());
        }
        /*
        if (this.isAuthentication() && !(context.getReq().session.user && context.getReq().session.user[context.getRoute()])) {
            throw new MyError({message: 'not authenticated', context});
        }
        */
    }
}
exports.BkApplication = BkApplication;
