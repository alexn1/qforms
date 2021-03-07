// const path    = require('path');
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
        // await this._fillCollections(response, context);
        for (const colName of this.fillCollections) {
            await this.fillCollection(response, colName, context);
        }
        return response;
    }

    /*async _fillCollections(response, context) {
        for (const colName of this.fillCollections) {
            await this.fillCollection(response, colName, context);
        }
    }*/

    async fillCollection(response, colName, context) {
        if (!this[colName]) return;
        response[colName] = {};
        /*for (const itemName of Object.keys(this[colName])) {
            if (this[colName][itemName].attributes()['backOnly'] === 'true') continue;
            response[colName][itemName] = await this[colName][itemName].fill(context);
        }*/
        for (const model of this[colName]) {
            const itemName = model.getName();
            if (model.attributes()['backOnly'] === 'true') continue;
            response[colName][itemName] = await model.fill(context);
        }
    }

    /*async fillCollection2(response, colName, context) {
        if (!this[colName]) return;
        response[colName] = {};

        for (const model of this[`${colName}2`]) {
            const itemName = model.getName();
            if (model.attributes()['backOnly'] === 'true') continue;
            response[colName][itemName] = await model.fill(context);
        }
    }*/

    /*async fillCollectionDefaultFirst(response, colName, context) {
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
    }*/

    async createCollectionItems(colName) {
        // console.log(`Model.createCollectionItems ${this.getName()}.${colName}`);
        for (const data of this.getCol(colName)) {
            await this.createCollectionItem(colName, data);
        }
    }

    /*async createCollectionItems2(colName) {
        // console.log(`Model.createCollectionItems ${this.getName()}.${colName}`);
        for (const data of this.getCol(colName)) {
            await this.createCollectionItem2(colName, data);
        }
    }*/

    async createCollectionItem(colName, data) {
        const name = BaseModel.getName(data);
        const className = BaseModel.getClassName(data);
        try {
            const Class = qforms[className];
            const obj = new Class(data, this);
            // this[colName][name] = obj;
            this[colName].push(obj);
            await obj.init();
        } catch (err) {
            err.message = `${className}[${name}]: ${err.message}`;
            throw err;
        }
    }

    /*async createCollectionItem2(colName, data) {
        const name = BaseModel.getName(data);
        const className = BaseModel.getClassName(data);
        try {
            const Class = qforms[className];
            const obj = new Class(data, this);
            this[`${colName}2`].push(obj);
            await obj.init();
        } catch (err) {
            err.message = `${className}[${name}]: ${err.message}`;
            throw err;
        }
    }*/

    getDirPath() {
        return null;
    }

}

module.exports = Model;
