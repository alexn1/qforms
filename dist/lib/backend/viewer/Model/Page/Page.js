"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkPage = void 0;
const path_1 = __importDefault(require("path"));
const Model_1 = require("../Model");
const MyError_1 = require("../../../MyError");
class BkPage extends Model_1.BkModel {
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
        return path_1.default.join(this.parent.getDirPath(), 'pages', this.getName());
    }
    fillAttributes(response) {
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
        response.cssBlock = this.getAttr('cssBlock');
        response.viewClass = this.getAttr('viewClass');
        response.ctrlClass = this.getAttr('ctrlClass');
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
            message: `no rpc ${this.constructor.name}.${name}`,
            data: { method: `${this.constructor.name}.rpc` },
            context,
        });
    }
    getApp() {
        return this.parent;
    }
    getForm(name) {
        return this.forms.find((form) => form.getName() === name);
    }
    getDataSource(name) {
        return this.dataSources.find((dataSource) => dataSource.getName() === name);
    }
}
exports.BkPage = BkPage;
