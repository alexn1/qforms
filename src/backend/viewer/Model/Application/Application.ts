import {AppInfo} from "../../../AppInfo";

const path  = require('path');
const axios = require('axios');
const colors = require('colors/safe');

// import BackHostApp from '../../../BackHostApp';
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

const text = require('../../../text');

class Application extends Model {
    appInfo: AppInfo;
    hostApp: any;
    env: any;
    databases: Database[];
    actions: Action[];
    dataSources: DataSource[];
    pages: any;
    links: any[];
    js: any[];

    /*static async create(appFilePath, hostApp: BackHostApp, env) {
        // console.log('Application.create', appFilePath);
        const appInfo = await Application.getAppInfo(appFilePath, env);
        const Class = await hostApp.getApplicationClass(appInfo);
        const json = await Helper.readTextFile(appInfo.filePath);
        const data = JSON.parse(json);
        return new Class(data, appInfo, hostApp, env);
    }*/

    constructor(data, appInfo: AppInfo, hostApp, env) {
        super(data);
        if (!hostApp) throw new Error('no hostApp');
        if (!env) throw new Error('no env');
        this.appInfo            = appInfo;
        this.hostApp            = hostApp;
        this.env                = env;

        this.databases          = [];
        this.actions            = [];
        this.dataSources        = [];
        this.pages              = {};
        this.links              = [];
        this.js                 = [];
    }

    async init() {
        // await super.init();
        await this.createColItems('databases');
        await this.createColItems('actions');
        await this.createColItems('dataSources');
        this.links = await this.getLinks();
        this.js    = await Helper.getFilePaths(this.getBuildDirPath(), 'js');
    }

    async getLinks(): Promise<string[]> {
        return await Helper.getFilePaths(this.getBuildDirPath(), 'css');
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

    getBuildDirPath() {
        return path.join(this.getDirPath(), 'build');
    }

    getText() {
        return text[this.getAttr('lang') || 'en'];
    }

    async fill(context: Context) {
        // console.log('Application.fill');
        const response = await super.fill(context);

        await this.fillCollection(response, 'databases'  , context);
        await this.fillCollection(response, 'actions'    , context);
        await this.fillCollection(response, 'dataSources', context);

        delete response.formatVersion;
        delete response.authentication;
        delete response.user;
        delete response.password;

        // env
        response.env = this.hostApp.nodeEnv;

        // text
        response.text = this.getText();

        // menu
        response.menu = await this.createMenu(context);

        // pages
        response.pages = await this.fillPages(context);

        // user
        if (this.isAuthentication()) {
            const user = Context.getUser(context);
            response.user = {
                id  : user.id,
                name: user.name
            };
        } else {
            response.user = null;
        }


        return response;
    }

    async createMenu(context: Context) {
        const menu = {};

        // pages
        const pageLinkNames = this.getItemNames('pageLinks').filter(pageLinkName => {
            return context.user ? this.authorizePage(context.user, pageLinkName) : true;
        });
        for (let i = 0; i < pageLinkNames.length; i++) {
            const pageLinkName = pageLinkNames[i];
            const pageLink = this.createPageLink(pageLinkName);
            const pageLinkMenu = pageLink.getAttr('menu');
            if (pageLinkMenu) {
                const pageFilePath = path.join(this.getDirPath(), pageLink.getAttr('fileName'));
                const pageFile = new JsonFile(pageFilePath);
                await pageFile.read();
                if (!menu[pageLinkMenu]) {
                    menu[pageLinkMenu] = [];
                }
                menu[pageLinkMenu].push({
                    type   :'page',
                    page   : pageLink.getAttr('name'),
                    caption: pageFile.getAttr('caption')
                });
            }
        }

        // actions
        menu['Actions'] = [];
        menu['Actions'].push({
            type   : 'action',
            action : 'action1',
            caption: 'Action 1'
        });

        return menu;
    }

    createPageLink(name): PageLink {
        const data = this.getColItemData('pageLinks', name);
        return new PageLink(data, this);
    }

    async createPage(pageLinkName): Promise<Page> {
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

    authorizePage(user, pageName) {
        return true;
    }

    async getPage(context: Context, pageLinkName): Promise<Page> {
        // console.log('Application.getPage', pageLinkName);
        if (context.user && this.authorizePage(context.user, pageLinkName) === false) {
            throw new Error('authorization error');
        }
        if (this.pages[pageLinkName]) {
            return this.pages[pageLinkName];
        }
        return this.pages[pageLinkName] = await this.createPage(pageLinkName);
    }

    getStartupPageLinkNames(): string[] {
        return this.getDataCol('pageLinks')
            .filter(data => BaseModel.getAttr(data, 'startup') === 'true')
            .map(data => BaseModel.getName(data));
    }

    async fillPages(context: Context) {
        console.log('Application.fillPages', context.query.page);
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

    async authenticate(context: Context, username, password) {
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

    static getParams(context: Context) {
        // console.log('Application.getParams:', context.query);
        return {
            ...context.query,
            ...context.params,
            ...(context.querytime ? context.querytime.params : {}),
            ...(context.user ? {username: context.user.name} : {})
        };
    }

    async rpc(name, context: Context) {
        console.log('Application.rpc', name, context.params);
        if (this[name]) return await this[name](context);
        throw new Error(`no rpc ${name}`);
    }

    async request(options) {
        console.warn(colors.magenta('Application.request'), options);
        return await axios(options);
    }

    getEnv() {
        return this.env;
    }

    getEnvVarValue(name) {
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

    getDatabase(name): Database {
        if (!name) throw new Error('getDatabase: no name');
        const database = this.databases.find(database => database.getName() === name);
        if (!database) throw new Error(`no database with name: ${name}`);
        return database;
    }

    getTitle(context: Context, response): string {
        console.log('Application.getTitle', context.query.page);
        if (context.query.page) {
            const page = this.pages[context.query.page];
            if (!page) throw new Error(`no page: ${context.query.page}`);
            const pageResponse = response.pages.length === 1 ? response.pages[0] : null;
            return page.getTitle(context, pageResponse);
        }
        return `${context.appDirName}/${context.appFileName}[${this.getEnv()}]`;
    }
    // to init custom context params before each request get/post
    async initContext(context: Context) {

    }

    static getAppInfoFromData(appFilePath, data, env): AppInfo {
        // console.log('Application.getAppInfoFromData:', appFilePath, data);
        if (!env) throw new Error('no env');
        const fileName = path.basename(appFilePath, path.extname(appFilePath));
        const dirName  = path.basename(path.dirname(appFilePath));
        return {
            name        : BaseModel.getName(data),
            caption     : BaseModel.getAttr(data, 'caption'),
            fullName    : [dirName, fileName].join('/'),
            envs        : BaseModel.getEnvList(data),
            route       : [dirName, fileName, env].join('/'),
            fileName    : fileName,
            dirName     : dirName,
            filePath    : path.resolve(appFilePath),
            fileNameExt : path.basename(appFilePath),
            extName     : path.extname(appFilePath),
            dirPath     : path.resolve(path.dirname(appFilePath))
        };
    }

    static async getAppInfo(appFilePath, env) {
        // console.log('Application.getAppInfo', appFilePath);
        const content = await Helper.readTextFile(appFilePath);
        const data = JSON.parse(content);
        if (data['@class'] && data['@class'] === 'Application') {
            const appInfo = Application.getAppInfoFromData(appFilePath, data, env);
            return appInfo;
        }
        return null;
    }

    static async getAppInfos(appsDirPath) {
        console.log('Application.getAppInfos', appsDirPath);
        const appFilesPaths = await Helper._glob(path.join(appsDirPath, '*/*.json'));
        const appInfos = [];
        for (let i = 0; i < appFilesPaths.length; i++) {
            const appFilePath = appFilesPaths[i];
            const appInfo = await Application.getAppInfo(appFilePath, 'local');
            if (appInfo) {
                appInfos.push(appInfo);
            }
        }
        return appInfos;
    }

    getDataSource(name): DataSource {
        return this.dataSources.find(dataSource => dataSource.getName() === name);
    }

}

export = Application;
