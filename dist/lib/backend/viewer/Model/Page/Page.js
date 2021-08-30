"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path = require('path');
const Model_1 = __importDefault(require("../Model"));
const MyError_1 = __importDefault(require("../../../MyError"));
class Page extends Model_1.default {
    constructor(data, parent) {
        super(data, parent);
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
        return path.join(this.parent.getDirPath(), 'pages', this.getName());
    }
    fillAttributes(response) {
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
    }
    async fill(context) {
        // console.log('Page.fill', this.constructor.name, this.getFullName());
        const response = await super.fill(context);
        await this.fillCollection(response, 'dataSources', context);
        await this.fillCollection(response, 'actions', context);
        await this.fillCollection(response, 'forms', context);
        response.newMode = !!context.newMode;
        return response;
    }
    async rpc(name, context) {
        console.log('Page.rpc', name, context.req.body);
        if (this[name])
            return await this[name](context);
        throw new MyError_1.default({
            message: `no rpc ${this.constructor.name}.${name}`,
            data: { method: `${this.constructor.name}.rpc` },
            context,
        });
    }
    getApp() {
        return this.parent;
    }
    getTitle(context, response) {
        return this.getAttr('caption');
    }
    getForm(name) {
        return this.forms.find(form => form.getName() === name);
    }
    getDataSource(name) {
        return this.dataSources.find(dataSource => dataSource.getName() === name);
    }
}
module.exports = Page;
