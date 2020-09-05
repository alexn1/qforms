'use strict';

const path    = require('path');
const qforms  = require('../../qforms');

const BaseModel = require('../../common/BaseModel');

class Model extends BaseModel {

    constructor(data, parent) {
        super(data, parent);
        this.name               = this.getAttr('name');
        this.createCollections  = [];
        this.fillCollections    = [];
        this.viewFilePath       = null;
        this.customViewFilePath = null;
        this.view               = null;
        this.js                 = null;
    }

    async init() {
        for (let i = 0; i < this.createCollections.length; i++) {
            const colName = this.createCollections[i];
            await this.createCollection(colName);
        }
        this.view = await this.getView();
        this.js   = await this.getJs();
    }

    async fill(context) {
        // console.log('Model.fill', this.constructor.name, this.name);
        const data = {
            class: this.getClassName(),
            view : this.view,
            js   : this.js
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
        // console.log(`Model.createCollection ${this.name}.${colName}`);
        if (!this.data[colName]) return;
        const items = Object.keys(this.data[colName]);
        for (let i = 0; i < items.length; i++) {
            const itemName = items[i];
            const itemData = this.getData(colName, itemName);
            const className1 = `${itemData['@class']}Controller`;
            const className2 = itemData['@class'];
            const className = qforms[className1] ? className1 : className2;
            try {
                const obj = await qforms[className].create(itemData, this);
                this[colName][itemName] = obj;
                await obj.init();
            } catch (err) {
                err.message = `${className}[${itemName}]: ${err.message}`;
                throw err;
            }
        }
    }

    async fillCollection(data, colName, context) {
        if (!this[colName]) return;
        data[colName] = {};
        const items = Object.keys(this[colName]);
        for (let i = 0; i < items.length; i++) {
            const itemName = items[i];
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

    async getView() {
        if (!this.viewFilePath) return null;
        if (this.customViewFilePath) {
            const exists = await qforms.Helper.exists(this.customViewFilePath);
            if (exists) {
                return qforms.Helper.readFile(this.customViewFilePath);
            }
            return qforms.Helper.readFile(this.viewFilePath);
        }
        return await qforms.Helper.readFile(this.viewFilePath);
    }

    async getJs() {
        if (!this.dirPath) return null;
        const jsFilePath = path.join(this.dirPath, this.name + '.js');
        const exists = await qforms.Helper.exists(jsFilePath);
        if (exists) return qforms.Helper.readFile(jsFilePath);
        return null;
    }

}

module.exports = Model;
