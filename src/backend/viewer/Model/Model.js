const path    = require('path');
const qforms  = require('../../qforms');
const BaseModel = require('../../BaseModel');
const Helper = require('../../Helper');

class Model extends BaseModel {

    constructor(data, parent) {
        super(data, parent);
        this.fillCollections = [];
    }

    async init() {

    }

    async fill(context) {
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
        // response[colName] = {};
        response[colName] = [];
        for (const model of this[colName]) {
            const itemName = model.getName();
            if (model.attributes()['backOnly'] === 'true') continue;
            // response[colName][itemName] = await model.fill(context);
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
        let js;
        const dirPath = this.getDirPath();
        if (dirPath) {
            const customClassFilePath = path.join(dirPath, colName, modelName, 'Model.back.js');
            js = await Helper.getFileContent(customClassFilePath);
            // if (js) console.log('customClassFilePath:', customClassFilePath, js);
        }
        const Class = js ? eval(js) : qforms[className];
        const model = new Class(data, this);
        await model.init();
        return model;
    }

    getDirPath() {
        return null;
    }

    /*getColItemDirPath(colName, itemName) {
        // console.log('Model.getColItemDirPath', colName, itemName, this.getDirPath());
        const dirPath = this.getDirPath();
        if (dirPath) {
            return path.join(dirPath, colName, itemName);
        }
        return null;
    }*/

    getDataSource(name) {
        return this.dataSources.find(dataSource => dataSource.getName() === name);
    }

}

module.exports = Model;
