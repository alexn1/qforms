const path    = require('path');
const qforms  = require('../../qforms');

const BaseModel = require('../../BaseModel');

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

    getColItemDirPath(colName, itemName) {
        // console.log('Model.getColItemDirPath', colName, itemName, this.getDirPath());
        const dirPath = this.getDirPath();
        if (dirPath) {
            return path.join(this.getDirPath(), colName, itemName);
        }
        return null;
    }

    async createColItem(colName, data) {
        const name = BaseModel.getName(data);
        const className = BaseModel.getClassName(data);
        const colItemDirPath = this.getColItemDirPath(colName, name);
        if (colItemDirPath) {
            console.log('colItemDirPath:', colItemDirPath);
        }
        try {
            const Class = qforms[className];
            const obj = new Class(data, this);
            await obj.init();
            this[colName].push(obj);
        } catch (err) {
            err.message = `${className}[${name}]: ${err.message}`;
            throw err;
        }
    }

    getDirPath() {
        return null;
    }

    getDataSource(name) {
        return this.dataSources.find(dataSource => dataSource.getName() === name);
    }

}

module.exports = Model;
