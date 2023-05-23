"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkModel = void 0;
const BaseModel_1 = require("../../BaseModel");
class BkModel extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        this.deinited = false;
        this.fillCollections = [];
    }
    /* constructor(data: any, parent?: any) {
        super(data, parent);
    } */
    async init(context) { }
    async deinit() {
        this.deinited = true;
    }
    checkDeinited() {
        if (this.deinited) {
            throw new Error(`${this.getName()} is already deinited and cannot be used`);
        }
    }
    async fill(context) {
        // console.log('Model.fill', this.constructor.name, this.getName());
        const response = {};
        // attributes
        this.fillAttributes(response);
        // collections
        for (const colName of this.fillCollections) {
            await this.fillCollection(response, colName, context);
        }
        return response;
    }
    fillAttributes(response) {
        throw new Error(`${this.constructor.name}.fillAttributes not implemented`);
        /*response.class = this.getClassName();
        for (const name in this.attributes()) {
            response[name] = this.getAttr(name);
        }*/
    }
    isBackOnly() {
        return this.isAttr('backOnly') && this.getAttr('backOnly') === 'true';
    }
    async fillCollection(response, colName, context) {
        if (!this[colName])
            return;
        response[colName] = [];
        for (const model of this[colName]) {
            if (model.isBackOnly()) {
                continue;
            }
            const itemResponse = await model.fill(context);
            response[colName].push(itemResponse);
        }
    }
    async createColItems(colName, context) {
        // console.log(`Model.createColItems ${this.getName()}.${colName}`);
        for (const itemData of this.getCol(colName)) {
            await this.createColItem(colName, itemData, context);
        }
    }
    async createColItem(colName, itemData, context) {
        try {
            const model = await this.createChildModel(colName, itemData);
            await model.init(context);
            this[colName].push(model);
        }
        catch (err) {
            const name = BaseModel_1.BaseModel.getName(itemData);
            const className = BaseModel_1.BaseModel.getClassName(itemData);
            err.message = `${className}[${name}]: ${err.message}`;
            throw err;
        }
    }
    async createChildModel(colName, itemData) {
        // app custom class
        const modelClass = BaseModel_1.BaseModel.getAttr(itemData, 'modelClass');
        if (modelClass) {
            const CustomClass = global[modelClass];
            if (!CustomClass)
                throw new Error(`no class global.${modelClass}`);
            return new CustomClass(itemData, this);
        }
        // lib class
        const className = BaseModel_1.BaseModel.getClassName(itemData);
        const backend = require('../../../backend');
        const Class = backend[`Bk${className}`];
        if (!Class)
            throw new Error(`no class backend.${className}`);
        return new Class(itemData, this);
    }
    getDirPath() {
        return null;
    }
    async rpc(name, context) {
        throw new Error(`${this.constructor.name}.rpc not implemented`);
    }
}
exports.BkModel = BkModel;
