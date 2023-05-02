"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationEditor = void 0;
const Editor_1 = require("../Editor");
const DatabaseEditor_1 = require("../DatabaseEditor/DatabaseEditor");
const DataSourceEditor_1 = require("../DataSourceEditor/DataSourceEditor");
const PageLinkEditor_1 = require("../PageLinkEditor/PageLinkEditor");
const common_1 = require("../../../common");
const PageEditor_1 = require("../PageEditor/PageEditor");
const ActionEditor_1 = require("../ActionEditor/ActionEditor");
class ApplicationEditor extends Editor_1.Editor {
    constructor(data) {
        super(data);
        this.databases = [];
        this.dataSources = [];
        this.actions = [];
        this.pageLinks = [];
    }
    init() {
        console.log('ApplicationEditor.init', this.data);
        // databases
        for (const data of this.data.databases) {
            this.createDatabase(data);
        }
        // dataSources
        for (const data of this.data.dataSources) {
            this.createDataSource(data);
        }
        // actions
        for (const data of this.data.actions) {
            this.createAction(data);
        }
        // pageLinks
        for (const data of this.data.pageLinks) {
            this.createPageLink(data);
        }
    }
    createAction(data) {
        const action = new ActionEditor_1.ActionEditor(data, this);
        action.init();
        this.actions.push(action);
        return action;
    }
    createDatabase(data) {
        const database = new DatabaseEditor_1.DatabaseEditor(data, this);
        database.init();
        this.databases.push(database);
        return database;
    }
    createPageLink(data) {
        const pageLink = new PageLinkEditor_1.PageLinkEditor(data, this);
        pageLink.init();
        this.pageLinks.push(pageLink);
        return pageLink;
    }
    removeDatabase(database) {
        console.log('ApplicationEditor.removeDatabase', database.getName());
        const i = this.databases.indexOf(database);
        if (i === -1)
            throw new Error('no such database');
        this.databases.splice(i, 1);
    }
    removePageLink(pageLink) {
        console.log('ApplicationEditor.removePageLink', pageLink.getName());
        const i = this.pageLinks.indexOf(pageLink);
        if (i === -1)
            throw new Error('no such pageLink');
        this.pageLinks.splice(i, 1);
    }
    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await common_1.FrontHostApp.doHttpRequest({
            controller: 'Application',
            action: 'save',
            params: {
                attr: name,
                value: value,
            },
        });
        this.setAttr(name, value);
        return data;
    }
    async newPageAndPageLinkData(params) {
        params['menu'] = params['startup'] === 'true' ? 'Pages' : '';
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'Page',
            action: '_new',
            params: params,
        });
    }
    async newPage(params) {
        const { page: pageData, pageLink: pageLinkData } = await this.newPageAndPageLinkData(params);
        const pageLink = this.createPageLink(pageLinkData);
        return new PageEditor_1.PageEditor(pageData, pageLink);
    }
    async newDatabase(params) {
        const data = await common_1.FrontHostApp.doHttpRequest({
            controller: 'Database',
            action: '_new',
            params: params,
        });
        return this.createDatabase(data);
    }
    async getView(view) {
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'Application',
            action: 'getView',
            params: {
                app: this.getName(),
                view: view,
            },
        });
    }
    async saveView(text, view) {
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'Application',
            action: 'saveView',
            params: {
                app: this.getName(),
                view: view,
                text: text,
            },
        });
    }
    async saveController(text) {
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'Application',
            action: 'saveController',
            params: {
                app: this.getName(),
                text: text,
            },
        });
    }
    async createView() {
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'Application',
            action: 'createView',
            params: {
                app: this.getName(),
            },
        });
    }
    async createController() {
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'Application',
            action: 'createController',
            params: {
                app: this.getName(),
            },
        });
    }
    async createModelBackJs() {
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'Application',
            action: 'createModelBackJs',
            params: {
                app: this.getName(),
            },
        });
    }
    async newDataSource(params) {
        const data = await common_1.FrontHostApp.doHttpRequest({
            controller: 'DataSource',
            action: '_new',
            params: params,
        });
        return this.createDataSource(data);
    }
    async newAction(params) {
        // params['pageFileName'] = this.page.pageLink.getFileName();
        // params['form']         = this.getName();
        const data = await common_1.FrontHostApp.doHttpRequest({
            controller: 'Action',
            action: '_new',
            params: params,
        });
        return this.createAction(data);
    }
    createDataSource(data) {
        const dataSource = new DataSourceEditor_1.DataSourceEditor(data, this);
        dataSource.init();
        this.dataSources.push(dataSource);
        return dataSource;
    }
}
exports.ApplicationEditor = ApplicationEditor;
