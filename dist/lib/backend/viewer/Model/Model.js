"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const BaseModel_1 = require("../../BaseModel");
class Model extends BaseModel_1.BaseModel {
    constructor(data, parent) {
        super(data, parent);
        this.fillCollections = [];
    }
    async init(context) { }
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
        return this.getParent()
            ? this.getParent().getChildModelCustomClass(model, colName, data)
            : null;
    }
    async createChildModel(colName, itemData) {
        const modelClass = BaseModel_1.BaseModel.getAttr(itemData, 'modelClass');
        if (modelClass) {
            const CustomClass = global[modelClass];
            if (!CustomClass)
                throw new Error(`no class ${modelClass}`);
            return new CustomClass(itemData, this);
        }
        const CustomClass = await this.getChildModelCustomClass(this, colName, itemData);
        const className = BaseModel_1.BaseModel.getClassName(itemData);
        const backend = require('../../../backend');
        const Class = CustomClass ? CustomClass : backend[className];
        if (!Class)
            throw new Error(`no class ${className}`);
        return new Class(itemData, this);
    }
    getDirPath() {
        return null;
    }
    async rpc(name, context) {
        throw new Error(`${this.constructor.name}.rpc not implemented`);
    }
}
exports.Model = Model;
