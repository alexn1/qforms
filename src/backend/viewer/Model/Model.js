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
        const response = {
            class: this.getClassName(),
        };
        for (const name in this.attributes()) {
            response[name] = this.getAttr(name);
        }
        await this._fillCollections(response, context);
        return response;
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

    async fillCollection(response, colName, context) {
        if (!this[colName]) return;
        response[colName] = {};
        const items = Object.keys(this[colName]);
        for (let i = 0; i < items.length; i++) {
            const itemName = items[i];
            if (this[colName][itemName].attributes()['backOnly'] === 'true') continue;
            response[colName][itemName] = await this[colName][itemName].fill(context);
        }
    }

    async fillCollectionDefaultFirst(response, colName, context) {
        //console.log('Model.fillCollectionDefaultFirst', colName);
        response[colName] = {};
        const defaultArr = Object.keys(this[colName]).filter(itemName => {return itemName === 'default';});
        for (let i = 0; i < defaultArr.length; i++) {
            const itemName = defaultArr[i];
            response[colName][itemName] = await this[colName][itemName].fill(context);
        }
        const noDefaultArr = Object.keys(this[colName]).filter(itemName => {return itemName !== 'default';});
        for (let i = 0; i < noDefaultArr.length; i++) {
            const itemName = noDefaultArr[i];
            response[colName][itemName] = await this[colName][itemName].fill(context);
        }
    }

    getItemNames(colName) {
        return [
            ...Object.keys(this.getCol(colName)),
            ...(this.data[`${colName}2`] ? this.data[`${colName}2`].map(data => BaseModel.getName(data)) : [])
        ];
    }

    async createCollectionItems(colName) {
        // console.log(`Model.createCollectionItems ${this.getName()}.${colName}`);
        const names = this.getItemNames(colName);
        for (let i = 0; i < names.length; i++) {
            const data = this.getModelData(colName, names[i]);
            await this.createCollectionItem(colName, data);
        }
    }

    async createCollectionItem(colName, data) {
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

    getDirPath() {
        return null;
    }

}

module.exports = Model;
