"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path = require('path');
const Model_1 = __importDefault(require("../Model"));
const MyError_1 = __importDefault(require("../../../MyError"));
class Form extends Model_1.default {
    constructor(data, parent) {
        super(data, parent);
        this.fillCollections = ['dataSources', 'actions', 'fields'];
        this.dataSources = [];
        this.actions = [];
        this.fields = [];
    }
    static async create(data, parent) {
        throw new Error('Form is abstract');
    }
    async init(context) {
        await this.createColItems('dataSources', context);
        await this.createColItems('actions', context);
        await this.createColItems('fields', context);
    }
    getDirPath() {
        return path.join(this.parent.getDirPath(), 'forms', this.getName());
    }
    fillAttributes(response) {
        response.class = this.getClassName();
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
        response.visible = this.getAttr('visible');
        response.cssBlock = this.getAttr('cssBlock');
        response.viewClass = this.getAttr('viewClass');
    }
    async fill(context) {
        // console.log('Form.fill', this.constructor.name, this.getFullName());
        if (this.getDataSource('default')) {
            return super.fill(context);
        }
        // surrogate data source response
        const dataSourceResponse = this._getSurrogateDataSourceResponse(context);
        this.dumpRowToParams(dataSourceResponse.rows[0], context.querytime.params);
        const response = await super.fill(context);
        response.dataSources.push(dataSourceResponse);
        return response;
    }
    /*getDefaultDataSource() {
        return this.getDataSource('default');
    }*/
    _getSurrogateDataSourceResponse(context) {
        const row = {
            id: 1
        };
        for (const field of this.fields) {
            field.fillDefaultValue(context, row);
        }
        return {
            class: 'DataSource',
            name: 'default',
            keyColumns: ['id'],
            rows: [row],
        };
    }
    dumpRowToParams(row, params) {
        for (const field of this.fields) {
            if (field.isParam()) {
                field.dumpRowValueToParams(row, params);
            }
        }
        //console.log(params);
    }
    replaceThis(context, query) {
        return query.replace(/\{([@\w\.]+)\}/g, (text, name) => {
            if (name.indexOf('.') !== -1) {
                const arr = name.split('.');
                if (arr[0] === 'this') {
                    arr[0] = this.getPage().getName();
                }
                return '{' + arr.join('.') + '}';
            }
            return text;
        });
    }
    async rpc(name, context) {
        console.log('Form.rpc', name, context.getBody());
        if (this[name])
            return await this[name](context);
        throw new MyError_1.default({
            message: `no rpc ${this.constructor.name}.${name}`,
            data: { method: `${this.constructor.name}.rpc` },
            context,
        });
    }
    getApp() {
        return this.parent.parent;
    }
    getPage() {
        return this.parent;
    }
    getFullName() {
        return `${this.getPage().getName()}.${this.getName()}`;
    }
    isNewMode(context) {
        return !!context.getBody().newMode;
    }
    getField(name) {
        return this.fields.find(field => field.getName() === name);
    }
    getDataSource(name) {
        return this.dataSources.find(dataSource => dataSource.getName() === name);
    }
}
module.exports = Form;
