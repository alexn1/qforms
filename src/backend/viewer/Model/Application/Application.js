const path  = require('path');
const axios = require('axios');

const Model     = require('../Model');
const PageLink  = require('../PageLink/PageLink');
const BaseModel = require('../../../BaseModel');
const Helper    = require('../../../Helper');
const Context   = require('../../../Context');
const JsonFile  = require('../../../JsonFile');
const text = require('../../../text');

class Application extends Model {

    static async create(appFilePath, hostApp, env) {
        // console.log('Application.create', appFilePath);
        const appInfo = await Application.getAppInfo(appFilePath, env);
        const json = await Helper.readTextFile(appInfo.filePath);
        const data = JSON.parse(json);
        const customClassFilePath = path.join(appInfo.dirPath, 'Model.back.js');
        const exists = await Helper.exists(customClassFilePath);
        const Class = exists ? require(customClassFilePath) : Application;
        return new Class(data, appInfo, hostApp, env);
    }

    constructor(data, appInfo, hostApp, env) {
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
        this.js    = await Helper.getFilePaths(this.getDirPath(), 'build', 'js');
    }

    async getLinks() {
        return await Helper.getFilePaths(this.getDirPath(), 'build', 'css');
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

    getText() {
        return text[this.getAttr('lang') || 'en'];
    }

    async fill(context) {
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

    async createMenu(context) {
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

    createPageLink(name) {
        const data = this.getColItemData('pageLinks', name);
        return new PageLink(data, this);
    }

    async createPage(pageLinkName) {
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

    async getPage(context, pageLinkName) {
        // console.log('Application.getPage', pageLinkName);
        if (context.user && this.authorizePage(context.user, pageLinkName) === false) {
            throw new Error('authorization error');
        }
        if (this.pages[pageLinkName]) {
            return this.pages[pageLinkName];
        }
        return this.pages[pageLinkName] = await this.createPage(pageLinkName);
    }

    getStartupPageLinkNames() {
        return this.getDataCol('pageLinks')
            .filter(data => BaseModel.getAttr(data, 'startup') === 'true')
            .map(data => BaseModel.getName(data));
    }

    async fillPages(context) {
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

    async authenticate(context, username, password) {
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

    async getUsers(context) {
        return null;
    }

    static getParams(context) {
        // console.log('Application.getParams:', context.query);
        return {
            ...context.query,
            ...context.params,
            ...(context.querytime ? context.querytime.params : {}),
            ...(context.user ? {username: context.user.name} : {})
        };
    }

    async rpc(name, context) {
        console.log('Application.rpc', name, context.params);
        if (this[name]) return await this[name](context);
        return {errorMessage: `no rpc ${name}`};
    }

    async request(options) {
        console.warn('Application.request', options);
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

    getApp() {
        return this;
    }

    getDatabase(name) {
        if (!name) throw new Error('getDatabase: no name');
        const database = this.databases.find(database => database.getName() === name);
        if (!database) throw new Error(`no database with name: ${name}`);
        return database;
    }

    getTitle(context, data) {
        if (context.query.page) {
            const page = this.pages[context.query.page];
            if (!page) throw new Error(`no page: ${context.query.page}`);
            return page.getTitle();
        }
        return `${context.appDirName}/${context.appFileName}[${this.getEnv()}]`;
    }
    // to init custom context params before each request get/post
    async initContext(context) {

    }

    static getAppInfoFromData(appFilePath, data, env) {
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

    getDataSource(name) {
        return this.dataSources.find(dataSource => dataSource.getName() === name);
    }

}

module.exports = Application;
