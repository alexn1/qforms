"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormEditor = void 0;
const Editor_1 = require("../Editor");
const DataSourceEditor_1 = require("../DataSourceEditor/DataSourceEditor");
const ActionEditor_1 = require("../ActionEditor/ActionEditor");
const FieldEditor_1 = require("../FieldEditor/FieldEditor");
const common_1 = require("../../../common");
class FormEditor extends Editor_1.Editor {
    constructor(data, page) {
        super(data, page);
        this.page = page;
        this.dataSources = [];
        this.fields = [];
        this.actions = [];
    }
    init() {
        // dataSources
        for (const data of this.data.dataSources) {
            this.createDataSource(data);
        }
        // actions
        for (const data of this.data.actions) {
            this.createAction(data);
        }
        // fields
        for (const data of this.data.fields) {
            this.createField(data);
        }
    }
    createDataSource(data) {
        const dataSource = new DataSourceEditor_1.DataSourceEditor(data, this);
        dataSource.init();
        this.dataSources.push(dataSource);
        return dataSource;
    }
    createAction(data) {
        const action = new ActionEditor_1.ActionEditor(data, this);
        action.init();
        this.actions.push(action);
        return action;
    }
    createField(data) {
        const field = new FieldEditor_1.FieldEditor(data, this);
        field.init();
        this.fields.push(field);
        return field;
    }
    removeField(field) {
        console.debug('FormEditor.removeField', field.getName());
        const i = this.fields.indexOf(field);
        if (i === -1)
            throw new Error('no such field');
        this.fields.splice(i, 1);
    }
    async setValue(name, value) {
        //console.debug(name + ' = ' + value);
        const data = await common_1.FrontHostApp.doHttpRequest({
            controller: 'Form',
            action: 'save',
            params: {
                pageFileName: this.page.pageLink.getFileName(),
                form: this.getName(),
                attr: name,
                value: value,
            },
        });
        this.setAttr(name, value);
        return data;
    }
    async deleteData() {
        await common_1.FrontHostApp.doHttpRequest({
            controller: 'Form',
            action: 'delete',
            params: {
                pageFileName: this.page.pageLink.getFileName(),
                form: this.getName(),
            },
        });
    }
    async delete() {
        await this.deleteData();
        this.parent.removeForm(this);
    }
    moveUp() {
        const args = {
            controller: 'Form',
            action: 'moveUp',
            params: {
                pageFileName: this.page.pageLink.getFileName(),
                form: this.getName(),
            },
        };
        return common_1.FrontHostApp.doHttpRequest(args);
    }
    moveDown() {
        const args = {
            controller: 'Form',
            action: 'moveDown',
            params: {
                pageFileName: this.page.pageLink.getFileName(),
                form: this.getName(),
            },
        };
        return common_1.FrontHostApp.doHttpRequest(args);
    }
    async newField(params) {
        params['pageFileName'] = this.page.pageLink.getFileName();
        params['form'] = this.getName();
        const data = await common_1.FrontHostApp.doHttpRequest({
            controller: 'Field',
            action: '_new',
            params: params,
        });
        return this.createField(data);
    }
    async newAction(params) {
        params['pageFileName'] = this.page.pageLink.getFileName();
        params['form'] = this.getName();
        const data = await common_1.FrontHostApp.doHttpRequest({
            controller: 'Action',
            action: '_new',
            params: params,
        });
        return this.createAction(data);
    }
    async newDataSource(params) {
        params['page'] = this.page.pageLink.getFileName();
        params['form'] = this.getName();
        const data = await common_1.FrontHostApp.doHttpRequest({
            controller: 'DataSource',
            action: '_new',
            params: params,
        });
        return this.createDataSource(data);
    }
    async getView(view) {
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'Form',
            action: 'getView',
            params: {
                view: view,
                page: this.data !== undefined ? this.page.getName() : null,
                form: this.data !== undefined ? this.getName() : null,
            },
        });
    }
    async saveView(text, view) {
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'Form',
            action: 'saveView',
            params: {
                page: this.page.getName(),
                form: this.getName(),
                view: view,
                text: text,
            },
        });
    }
    async saveController(text) {
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'Form',
            action: 'saveController',
            params: {
                page: this.page.getName(),
                form: this.getName(),
                text: text,
            },
        });
    }
    async createModelBackJs() {
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'Form',
            action: 'createModelBackJs',
            params: {
                page: this.page.getName(),
                form: this.getName(),
            },
        });
    }
    async createView() {
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'Form',
            action: 'createView',
            params: {
                page: this.page.getName(),
                form: this.getName(),
                class: this.getClassName(),
            },
        });
    }
    async createController() {
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'Form',
            action: 'createController',
            params: {
                page: this.page.getName(),
                form: this.getName(),
                class: this.getClassName(),
            },
        });
    }
    async createStyle() {
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'Form',
            action: 'createStyle',
            params: {
                page: this.page.getName(),
                form: this.getName(),
                class: this.getClassName(),
            },
        });
    }
}
exports.FormEditor = FormEditor;
