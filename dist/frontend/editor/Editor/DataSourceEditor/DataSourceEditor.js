"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourceEditor = void 0;
const Editor_1 = require("../Editor");
const KeyColumnEditor_1 = require("../KeyColumnEditor/KeyColumnEditor");
const FormEditor_1 = require("../FormEditor/FormEditor");
const PageEditor_1 = require("../PageEditor/PageEditor");
const common_1 = require("../../../common");
const ApplicationEditor_1 = require("../ApplicationEditor/ApplicationEditor");
class DataSourceEditor extends Editor_1.Editor {
    constructor(data, parent) {
        super(data, parent);
        this.keyColumns = [];
    }
    init() {
        for (const data of this.data.keyColumns) {
            this.createKeyColumn(data);
        }
    }
    createKeyColumn(data) {
        const keyColumn = new KeyColumnEditor_1.KeyColumnEditor(data, this);
        keyColumn.init();
        this.keyColumns.push(keyColumn);
        return keyColumn;
    }
    removeKeyColumn(keyColumn) {
        console.log('DatabaseEditor.removeParam', keyColumn.getName());
        const i = this.keyColumns.indexOf(keyColumn);
        if (i === -1)
            throw new Error('no such keyColumn');
        this.keyColumns.splice(i, 1);
    }
    static async create(parent, params) {
        if (parent instanceof FormEditor_1.FormEditor) {
            const form = parent;
            params['page'] = form.page.pageLink.getFileName();
            params['form'] = form.getName();
        }
        if (parent instanceof PageEditor_1.PageEditor) {
            const page = parent;
            params['page'] = page.pageLink.getFileName();
        }
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'DataSource',
            action: '_new',
            params: params,
        });
    }
    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const args = {
            controller: 'DataSource',
            action: 'save',
            params: {
                dataSource: this.getName(),
                attr: name,
                value: value,
            },
        };
        if (this.parent instanceof PageEditor_1.PageEditor) {
            // @ts-ignore
            args.params.pageFileName = this.parent.pageLink.getFileName();
        }
        if (this.parent instanceof FormEditor_1.FormEditor) {
            // @ts-ignore
            args.params.form = this.parent.getName();
            // @ts-ignore
            args.params.pageFileName = this.parent.page.pageLink.getFileName();
        }
        const data = await common_1.FrontHostApp.doHttpRequest(args);
        this.setAttr(name, value);
        return data;
    }
    async deleteData() {
        const args = {
            controller: 'DataSource',
            action: 'delete',
            params: {
                dataSource: this.getName(),
            },
        };
        if (this.parent instanceof PageEditor_1.PageEditor) {
            // @ts-ignore
            args.params.page = this.parent.pageLink.getFileName();
        }
        if (this.parent instanceof FormEditor_1.FormEditor) {
            // @ts-ignore
            args.params.form = this.parent.getName();
            // @ts-ignore
            args.params.page = this.parent.page.pageLink.getFileName();
        }
        await common_1.FrontHostApp.doHttpRequest(args);
    }
    async createModelBackJs() {
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'DataSource',
            action: 'createModelBackJs',
            params: Object.assign(Object.assign(Object.assign({}, (this.parent instanceof PageEditor_1.PageEditor
                ? {
                    page: this.parent.getName(),
                    pageFileName: this.parent.pageLink.getFileName(),
                }
                : {})), (this.parent instanceof FormEditor_1.FormEditor
                ? {
                    form: this.parent.getName(),
                    page: this.parent.page.getName(),
                    pageFileName: this.parent.page.pageLink.getFileName(),
                }
                : {})), { dataSource: this.getName() }),
        });
    }
    async delete() {
        await this.deleteData();
        this.parent.removeDataSource(this);
    }
    async moveUp() {
        const args = {
            controller: 'DataSource',
            action: 'moveUp',
            params: {
                dataSource: this.getName(),
            },
        };
        if (this.parent instanceof PageEditor_1.PageEditor) {
            // @ts-ignore
            args.params.page = this.parent.pageLink.getFileName();
        }
        if (this.parent instanceof FormEditor_1.FormEditor) {
            // @ts-ignore
            args.params.form = this.parent.getName();
            // @ts-ignore
            args.params.page = this.parent.page.pageLink.getFileName();
        }
        return await common_1.FrontHostApp.doHttpRequest(args);
    }
    async moveDown() {
        const args = {
            controller: 'DataSource',
            action: 'moveDown',
            params: {
                dataSource: this.getName(),
            },
        };
        if (this.parent instanceof PageEditor_1.PageEditor) {
            // @ts-ignore
            args.params.page = this.parent.pageLink.getFileName();
        }
        if (this.parent instanceof FormEditor_1.FormEditor) {
            // @ts-ignore
            args.params.form = this.parent.getName();
            // @ts-ignore
            args.params.page = this.parent.page.pageLink.getFileName();
        }
        return await common_1.FrontHostApp.doHttpRequest(args);
    }
    async newKeyColumnData(name) {
        const args = {
            controller: 'KeyColumn',
            action: '_new',
            params: {
                dataSource: this.getName(),
                class: 'KeyColumn',
                name: name,
            },
        };
        if (this.parent instanceof FormEditor_1.FormEditor) {
            // @ts-ignore
            args.params.page = this.parent.page.pageLink.getFileName();
            // @ts-ignore
            args.params.form = this.parent.getName();
        }
        if (this.parent instanceof PageEditor_1.PageEditor) {
            // @ts-ignore
            args.params.page = this.parent.pageLink.getFileName();
        }
        return await common_1.FrontHostApp.doHttpRequest(args);
    }
    async newKeyColumn(name) {
        const data = await this.newKeyColumnData(name);
        return this.createKeyColumn(data);
    }
    async getView(view) {
        const args = {
            controller: 'DataSource',
            action: 'getView',
            params: {
                dataSource: this instanceof DataSourceEditor ? this.getName() : undefined,
                view: view,
            },
        };
        if (this.parent instanceof PageEditor_1.PageEditor) {
            // @ts-ignore
            args.params.pageFileName =
                this instanceof DataSourceEditor ? this.parent.pageLink.getFileName() : undefined;
        }
        if (this.parent instanceof FormEditor_1.FormEditor) {
            // @ts-ignore
            args.params.pageFileName =
                this instanceof DataSourceEditor
                    ? this.parent.page.pageLink.getFileName()
                    : undefined;
            // @ts-ignore
            args.params.form = this instanceof DataSourceEditor ? this.parent.getName() : undefined;
        }
        return await common_1.FrontHostApp.doHttpRequest(args);
    }
    async saveController(text) {
        const args = {
            controller: 'DataSource',
            action: 'saveController',
            params: {
                dataSource: this.getName(),
                text: text,
            },
        };
        if (this.parent instanceof PageEditor_1.PageEditor) {
            args.params.pageFileName = this.parent.pageLink.getFileName();
        }
        if (this.parent instanceof FormEditor_1.FormEditor) {
            args.params.pageFileName = this.parent.page.pageLink.getFileName();
            args.params.form = this.parent.getName();
        }
        return await common_1.FrontHostApp.doHttpRequest(args);
    }
    async createController() {
        const args = {
            controller: 'DataSource',
            action: 'createController',
            params: {
                page: this.parent.page.getName(),
                pageFileName: this.parent.page.pageLink.getFileName(),
                form: this.parent.getName(),
                dataSource: this.getName(),
            },
        };
        return await common_1.FrontHostApp.doHttpRequest(args);
    }
    getFullName() {
        if (this.parent instanceof FormEditor_1.FormEditor) {
            return [this.parent.parent.getName(), this.parent.getName(), this.getName()].join('.');
        }
        else if (this.parent instanceof PageEditor_1.PageEditor) {
            return [this.parent.getName(), this.getName()].join('.');
        }
        else if (this.parent instanceof ApplicationEditor_1.ApplicationEditor) {
            return this.getName();
        }
    }
}
exports.DataSourceEditor = DataSourceEditor;
