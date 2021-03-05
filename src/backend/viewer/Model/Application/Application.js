const path          = require('path');
const _             = require('underscore');
const child_process = require('child_process');
const axios         = require('axios');

const BaseModel = require('../../../BaseModel');
const qforms  = require('../../../qforms');
const Model   = require('../Model');
const PageLink = require('../PageLink/PageLink');
const Database = require('../Database/Database');

class Application extends Model {

    static async create(appFilePath, hostApp, env) {
        // console.log('Application.create', appFilePath);
        const appInfo = await qforms.Helper.getAppInfo(appFilePath, env);
        const json = await qforms.Helper.readTextFile(appInfo.filePath);
        const data = JSON.parse(json);
        const customClassFilePath = path.join(appInfo.dirPath, 'Model.back.js');
        //console.log('customClassFilePath:', customClassFilePath);
        const js = await qforms.Helper.getFileContent(customClassFilePath);
        if (js) {
            const customClass = eval(js);
            return new customClass(data, appInfo, hostApp, env);
        } else {
            return new Application(data, appInfo, hostApp, env);
        }
    }

    constructor(data, appInfo, hostApp, env) {
        super(data);
        if (!hostApp) throw new Error('no hostApp');
        if (!env) throw new Error('no env');
        this.appInfo            = appInfo;
        this.hostApp            = hostApp;
        this.env                = env;
        this.fillCollections    = ['databases', 'dataSources'];

        this.databases          = {};
        this.dataSources        = {};
        this.pages              = {};
        this.css                = [];
        this.js                 = [];
    }

    async init() {
        // await super.init();
        await this.createCollection('databases');
        await this.createCollection('dataSources');
        this.css = await qforms.Helper.getFilePaths(this.getDirPath(), 'build', 'css');
        this.js  = await qforms.Helper.getFilePaths(this.getDirPath(), 'build', 'js');
    }

    async deinit() {
        console.log('Application.deinit: ' + this.getName());
        const names = Object.keys(this.databases);
        for (let i = 0; i < names.length; i++) {
            await this.databases[names[i]].deinit();
        }
    }

    getDirPath() {
        return this.appInfo.dirPath;
    }

    getText() {
        return qforms.text[this.getAttr('lang') || 'en'];
    }

    async fill(context) {
        // console.log('Application.fill');
        const data = await super.fill(context);
        delete data.user;
        delete data.password;
        delete data.authentication;
        delete data.formatVersion;

        // env
        data.env = this.hostApp.nodeEnv;

        // text
        data.text = this.getText();

        // params
        // data.params = Application.getParams(context);

        // menu
        data.menu = await this.createMenu(context);

        // pages
        data.pages = await this.fillStartupPages(context);

        return data;
    }

    async createMenu(context) {
        const menu = {};
        const pageNames = this.getPageLinkNameList().filter(pageName => {
            return context.user ? this.authorizePage(context.user, pageName) : true;
        });
        for (let i = 0; i < pageNames.length; i++) {
            const pageName = pageNames[i];
            const pageLink = this.createPageLink(pageName);
            const pageLinkMenu = pageLink.getAttr('menu');
            if (pageLinkMenu) {
                const pageFilePath = path.join(this.getDirPath(), pageLink.getAttr('fileName'));
                const pageFile = new qforms.JsonFile(pageFilePath);
                await pageFile.read();
                if (!menu[pageLinkMenu]) {
                    menu[pageLinkMenu] = [];
                }
                menu[pageLinkMenu].push({
                    page   : pageLink.getAttr('name'),
                    caption: pageFile.getAttr('caption')
                });
            }
        }
        return menu;
    }

    createPageLink(name) {
        return new PageLink(this.getModelData('pageLinks', name), this);
    }

    createDatabase(name) {
        const databaseData = this.getModelData('databases', name);
        return Database.create(databaseData, this);
    }

    async createPage(pageLinkName) {
        // console.log('Application.createPage', pageLinkName);
        const relFilePath  = this.createPageLink(pageLinkName).getAttr('fileName');
        const pageFilePath = path.join(this.getDirPath(), relFilePath);
        const content = await qforms.Helper.readTextFile(pageFilePath);
        const data = JSON.parse(content);
        const page = await qforms.Page.create(data, this);
        await page.init();
        return page;
    }

    authorizePage(user, pageName) {
        return true;
    }

    async getPage(context, name) {
        // console.log('Application.getPage', name);
        if (context.user && this.authorizePage(context.user, name) === false) {
            throw new Error('authorization error');
        }
        if (this.pages[name]) {
            return this.pages[name];
        }
        return this.pages[name] = await this.createPage(name);
    }

    getPageLinkNameList() {
        return [
            ...Object.keys(this.getCol('pageLinks')),
            ...(this.data.pageLinks2 ? this.data.pageLinks2.map(data => BaseModel.getName(data)) : [])
        ];
    }

    getStartupPageNames() {
        return this.getPageLinkNameList().filter(pageLinkName => this.createPageLink(pageLinkName).getAttr('startup') === 'true');
    }

    async fillStartupPages(context) {
        console.log('Application.fillStartupPages', context.query.page);
        const pages = [];
        if (context.query.page) {
            const page = await this.getPage(context, context.query.page);
            const pageData = await page.fill(context);
            pages.push(pageData);
        } else {
            const startupPageNames = this.getStartupPageNames();
            for (let i = 0; i < startupPageNames.length; i++) {
                const pageLinkName = startupPageNames[i];
                const page = await this.getPage(context, pageLinkName);
                const pageData = await page.fill(context);
                pages.push(pageData);
            }
        }
        return pages;
    }

    async authenticate(context, username, password) {
        return username === this.getAttr('user') && password === this.getAttr('password');
    }

    authentication() {
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
        console.log('Application.rpc', name);
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
        if (!this.databases[name]) throw new Error(`no database with name: ${name}`);
        return this.databases[name];
    }

    getTitle(context, data) {
        if (context.query.page) {
            const page = this.pages[context.query.page];
            return page.getTitle(context, data.pages[0]);
        }
        return `${context.appDirName}/${context.appFileName}[${this.getEnv()}]`;
    }
}

module.exports = Application;
