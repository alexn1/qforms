'use strict';

const path          = require('path');
const _             = require('underscore');
const child_process = require('child_process');
const axios         = require('axios');

const qforms  = require('../../../qforms');
const server  = require('../../../server');
const Model   = require('../Model');
const PageLink = require('../PageLink/PageLink');
const Database = require('../Database/Database');

class Application extends Model {

    static async create(appFilePath, hostApp, env) {
        // console.log('Application.create', appFilePath);
        const appInfo = await qforms.Helper.getAppInfo(appFilePath, env);
        const json = await qforms.Helper.readFile(appInfo.filePath);
        const data = JSON.parse(json);
        const customClassFilePath = path.join(appInfo.dirPath, `${appInfo.name}.backend.js`);
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
        this.createCollections  = ['databases', 'dataSources'];
        this.fillCollections    = ['databases', 'dataSources'];
        this.pages              = {};
        this.css                = [];
        this.js                 = [];
        this.text               = qforms.text[this.getAttr('lang') || 'en'];
        this.databases          = {};
        this.dataSources        = {};
    }

    getCustomViewFilePath() {
        return path.join(this.getDirPath(), `${this.getName()}.ejs`);
    }

    getViewFilePath() {
        return path.join(
            this.hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/ApplicationController/view',
            'ApplicationView.ejs'
        );
    }

    getDirPath() {
        return this.appInfo.dirPath;
    }

    async init() {
        await super.init();
        await this.createStartupPages();
        this.css = await qforms.Helper.getFilePaths(this.getDirPath(), 'build', 'css');
        this.js  = await qforms.Helper.getFilePaths(this.getDirPath(), 'build', 'js');
    }

    async fill(context) {
        // console.log('Application.fill');
        const data = await super.fill(context);
        delete data.user;
        delete data.password;
        delete data.authentication;

        // env
        data.env = this.hostApp.nodeEnv;

        // text
        data.text   = this.text;

        // params
        data.params = this.getParams(context);

        // menu
        data.menu = await this._buildMenu(context);

        // pages
        data.pages = {};
        const startupPageNames = Object.keys(this.getData('pageLinks')).filter(pageName => {
            return this.createPageLink(pageName).getAttr('startup') === 'true';
        });
        for (let i = 0; i < startupPageNames.length; i++) {
            const pageName = startupPageNames[i];
            const page = await this.getPage(context, pageName);
            data.pages[pageName] = await page.fill(context);
        }

        return data;
    }

    async _buildMenu(context) {
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

    async deinit() {
        console.log('Application.deinit: ' + this.getName());
        const names = Object.keys(this.databases);
        for (let i = 0; i < names.length; i++) {
            await this.databases[names[i]].deinit();
        }
    }

    createPageLink(name) {
        const pageLinkData = this.getData('pageLinks', name);
        return new PageLink(pageLinkData, this);
    }

    createDatabase(name) {
        const databaseData = this.getData('databases', name);
        return Database.create(databaseData, this);
    }

    async _createPage(pageName) {
        // console.log('Application._createPage', pageName);
        const relFilePath  = this.createPageLink(pageName).getAttr('fileName');
        const pageFilePath = path.join(this.getDirPath(), relFilePath);
        const content = await qforms.Helper.readFile(pageFilePath);
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
        return this.pages[name] = await this._createPage(name);
    }

    getPageLinkNameList() {
        return Object.keys(this.data.pageLinks);
    }

    async createStartupPages() {
        if (!this.data.pageLinks) return;
        const pageLinkNames = this.getPageLinkNameList().filter(pageName => this.createPageLink(pageName).getAttr('startup') === 'true');
        for (let i = 0; i < pageLinkNames.length; i++) {
            const pageLinkName = pageLinkNames[i];
            const pageLink = this.createPageLink(pageLinkName);
            const pageLinkName2 = pageLink.getAttr('name');
            const page = await this._createPage(pageLinkName2);
            this.pages[pageLinkName2] = page;
        }
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

    getParams(context) {
        const params = {
            ...context.params
        };
        // _.extend(params, context.params);
        if (context.querytime) {
            _.extend(params, context.querytime.params);
        }
        if (context.user) {
            params.username = context.user.name;
        }
        return params;
    }

    async rpc(context) {
        console.log('Application.rpc');
        return {
            result: 'Application.rpc'
        };
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

    async createLog(context, values) {
        // console.log('Application.createLog', values);
        if (values.stack === undefined) values.stack = null;
        if (values.created === undefined) values.created = new Date();
        if (values.message && values.message.length > 255) {
            // throw new Error(`message to long: ${values.message.length}`);
            values.message = values.message.substr(0, 255);
        }
        await this.getDatabase('default').queryResult(
            context,
            'insert into log(created, type, source, ip, message, stack, data) values ({created}, {type}, {source}, {ip}, {message}, {stack}, {data})',
            values
        );
    }

}

module.exports = Application;
