// const path    = require('path');
const qforms  = require('../../qforms');

const BaseModel = require('../../BaseModel');

class Model extends BaseModel {

    constructor(data, parent) {
        super(data, parent);
        this.fillCollections    = [];
    }

    async init() {

    }

    async fill(context) {
        // console.log('Model.fill', this.constructor.name, this.getName());
        const data = {
            class: this.getClassName(),
            // view : await this.getView(),
            // js   : await this.getControllerJs()
        };
        for (const name in this.attributes()) {
            data[name] = this.getAttr(name);
        }
        await this._fillCollections(data, context);
        return data;
    }

    async _fillCollections(data, context) {
        for (let i = 0; i < this.fillCollections.length; i++) {
            const colName = this.fillCollections[i];
            if (colName === 'dataSources') {
                await this.fillCollectionDefaultFirst(data, colName, context);
            } else {
                await this.fillCollection(data, colName, context);
            }
        }
    }

    async createCollection(colName) {
        // console.log(`Model.createCollection ${this.getName()}.${colName}`);
        const names = Object.keys(this.getCol(colName));
        for (let i = 0; i < names.length; i++) {
            const data = this.getModelData(colName, names[i]);
            await this.addColItemToObj(colName, data);
        }
    }

    async createCollection2(colName) {
        const arr = this.getCol(colName + '2');
        for (let i = 0; i < arr.length; i++) {
            const data = arr[i];
            await this.addColItemToObj(colName, data);
        }
    }

    async addColItemToObj(colName, data) {
        const name = BaseModel.getName(data);
        const className = BaseModel.getClassName(data);
        try {
            const Class = qforms[className];
            const obj = new Class(data, this);
            this[colName][name] = obj;
            await obj.init();
        } catch (err) {
            err.message = `${className}[${name}]: ${err.message}`;
            throw err;
        }
    }

    async fillCollection(data, colName, context) {
        if (!this[colName]) return;
        data[colName] = {};
        const items = Object.keys(this[colName]);
        for (let i = 0; i < items.length; i++) {
            const itemName = items[i];
            if (this[colName][itemName].attributes()['backOnly'] === 'true') continue;
            data[colName][itemName] = await this[colName][itemName].fill(context);
        }
    }

    async fillCollectionDefaultFirst(data, colName, context) {
        //console.log('Model.fillCollectionDefaultFirst', colName);
        data[colName] = {};
        const defaultArr = Object.keys(this[colName]).filter(itemName => {return itemName === 'default';});
        for (let i = 0; i < defaultArr.length; i++) {
            const itemName = defaultArr[i];
            data[colName][itemName] = await this[colName][itemName].fill(context);
        }
        const noDefaultArr = Object.keys(this[colName]).filter(itemName => {return itemName !== 'default';});
        for (let i = 0; i < noDefaultArr.length; i++) {
            const itemName = noDefaultArr[i];
            data[colName][itemName] = await this[colName][itemName].fill(context);
        }
    }

    /*async getView() {
        const viewFilePath = this.getViewFilePath();
        if (!viewFilePath) return null;
        const customViewFilePath = this.getCustomViewFilePath();
        if (customViewFilePath) {
            const exists = await qforms.Helper.exists(customViewFilePath);
            if (exists) {
                return qforms.Helper.readTextFile(customViewFilePath);
            }
            return qforms.Helper.readTextFile(viewFilePath);
        }
        return await qforms.Helper.readTextFile(viewFilePath);
    }*/

    /*async getControllerJs() {
        if (!this.getDirPath()) return null;
        const jsFilePath = path.join(this.getDirPath(), 'Controller.js');
        const exists = await qforms.Helper.exists(jsFilePath);
        if (exists) return qforms.Helper.readTextFile(jsFilePath);
        return null;
    }*/

    getDirPath() {
        return null;
    }

    /*getViewFilePath() {
        return null;
    }*/

    /*getCustomViewFilePath() {
        return null;
    }*/

}

module.exports = Model;
