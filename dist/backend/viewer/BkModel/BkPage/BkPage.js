"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkPage = void 0;
const path_1 = __importDefault(require("path"));
const BkModel_1 = require("../BkModel");
const MyError_1 = require("../../../MyError");
class BkPage extends BkModel_1.BkModel {
    constructor() {
        super(...arguments);
        this.dataSources = [];
        this.actions = [];
        this.forms = [];
    }
    async init(context) {
        await this.createColItems('dataSources', context);
        await this.createColItems('actions', context);
        await this.createColItems('forms', context);
    }
    getDirPath() {
        return path_1.default.join(this.getParent().getDirPath(), 'pages', this.getName());
    }
    fillAttributes(response) {
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
        response.cssBlock = this.getAttr('cssBlock');
        response.viewClass = this.getAttr('viewClass');
        response.ctrlClass = this.getAttr('ctrlClass');
        if (this.isAttr('formInTab')) {
            response.formInTab = this.getAttr('formInTab');
        }
    }
    async fill(context) {
        // console.log('Page.fill', this.constructor.name, this.getFullName());
        const response = await super.fill(context);
        await this.fillCollection(response, 'dataSources', context);
        await this.fillCollection(response, 'actions', context);
        await this.fillCollection(response, 'forms', context);
        response.newMode = !!context.getBody().newMode;
        return response;
    }
    async rpc(name, context) {
        console.log('Page.rpc', name, context.getBody());
        if (this[name])
            return await this[name](context);
        throw new MyError_1.MyError({
            message: `no remote proc ${this.constructor.name}.${name}`,
            data: { method: `${this.constructor.name}.rpc` },
            context,
        });
    }
    getApp() {
        return this.getParent();
    }
    findForm(name) {
        return this.forms.find((form) => form.getName() === name);
    }
    getForm(name) {
        const form = this.findForm(name);
        if (!form)
            throw new Error(`${this.getName()}: no form ${name}`);
        return form;
    }
    findDataSource(name) {
        return this.dataSources.find((dataSource) => dataSource.getName() === name);
    }
    getDataSource(name) {
        const ds = this.findDataSource(name);
        if (!ds)
            throw new Error(`${this.getName()}: no form ${name}`);
        return ds;
    }
}
exports.BkPage = BkPage;
