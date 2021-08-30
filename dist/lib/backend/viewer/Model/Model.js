"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BaseModel_1 = __importDefault(require("../../BaseModel"));
const backend = require('../../../backend');
class Model extends BaseModel_1.default {
    constructor(data, parent) {
        super(data, parent);
        this.fillCollections = [];
    }
    async init(context) {
    }
    async fill(context) {
        // console.log('Model.fill', this.constructor.name, this.getName());
        const response = {};
        this.fillAttributes(response);
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
        for (const data of this.getDataCol(colName)) {
            await this.createColItem(colName, data, context);
        }
    }
    async createColItem(colName, data, context) {
        try {
            const model = await this.createChildModel(colName, data);
            await model.init(context);
            this[colName].push(model);
        }
        catch (err) {
            const name = BaseModel_1.default.getName(data);
            const className = BaseModel_1.default.getClassName(data);
            err.message = `${className}[${name}]: ${err.message}`;
            throw err;
        }
    }
    async getChildModelCustomClass(model, colName, data) {
        /*let CustomClass = null;
        const dirPath = this.getDirPath();
        if (dirPath) {
            const modelName = BaseModel.getName(data);
            const customClassFilePath = path.join(dirPath, colName, modelName, 'Model.back.js');
            const exists = await Helper.exists(customClassFilePath);
            if (exists) {
                CustomClass = require(customClassFilePath);
            }
        }
        return CustomClass;*/
        return this.getParent() ? this.getParent().getChildModelCustomClass(model, colName, data) : null;
    }
    async createChildModel(colName, data) {
        const CustomClass = await this.getChildModelCustomClass(this, colName, data);
        const className = BaseModel_1.default.getClassName(data);
        const Class = CustomClass ? CustomClass : backend[className];
        return new Class(data, this);
    }
    getDirPath() {
        return null;
    }
    async rpc(name, context) {
        throw new Error(`${this.constructor.name}.rpc not implemented`);
    }
}
module.exports = Model;
