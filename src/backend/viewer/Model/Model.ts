const path = require('path');

import BaseModel from '../../BaseModel';
const Helper = require('../../Helper');
const backend  = require('../../../backend');

class Model extends BaseModel {
    fillCollections: any[];
    constructor(data, parent?) {
        super(data, parent);
        this.fillCollections = [];
    }

    async init() {

    }

    async fill(context): Promise<any> {
        // console.log('Model.fill', this.constructor.name, this.getName());
        const response = {
            class: this.getClassName(),
        };
        for (const name in this.attributes()) {
            response[name] = this.getAttr(name);
        }
        for (const colName of this.fillCollections) {
            await this.fillCollection(response, colName, context);
        }
        return response;
    }

    async fillCollection(response, colName, context) {
        if (!this[colName]) return;
        response[colName] = [];
        for (const model of this[colName]) {
            if (model.isAttr('backOnly') && model.getAttr('backOnly') === 'true') continue;
            response[colName].push(await model.fill(context));
        }
    }

    async createColItems(colName) {
        // console.log(`Model.createColItems ${this.getName()}.${colName}`);
        for (const data of this.getDataCol(colName)) {
            await this.createColItem(colName, data);
        }
    }

    async createColItem(colName, data) {
        try {
            const model = await this.createChildModel(colName, data);
            await model.init();
            this[colName].push(model);
        } catch (err) {
            const name = BaseModel.getName(data);
            const className = BaseModel.getClassName(data);
            err.message = `${className}[${name}]: ${err.message}`;
            throw err;
        }
    }

    async createChildModel(colName, data) {
        const modelName = BaseModel.getName(data);
        const className = BaseModel.getClassName(data);
        const dirPath = this.getDirPath();
        let CustomClass = null;
        if (dirPath) {
            const customClassFilePath = path.join(dirPath, colName, modelName, 'Model.back.js');
            const exists = await Helper.exists(customClassFilePath);
            if (exists) {
                CustomClass = require(customClassFilePath);
            }
        }
        const Class = CustomClass ? CustomClass : backend[className];
        return new Class(data, this);
    }

    getDirPath(): string {
        return null;
    }

}

export = Model;
