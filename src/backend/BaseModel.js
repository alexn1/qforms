class BaseModel {

    static getClassName(data) {
        return data['@class'];
    }

    static getAttr(data, name) {
        return data['@attributes'][name];
    }

    /*static setAttr(data, name, value) {
        data['@attributes'][name] = value;
    }*/

    static getName(data) {
        return BaseModel.getAttr(data, 'name');
    }

    static getEnvList(data) {
        const list = data.env ? Object.keys(data.env).filter(env => env !== 'local') : [];
        return ['local', ...list];
    }

    constructor(data, parent) {
        this.data = data;
        this.parent = parent;
    }

    getClassName() {
        return this.data['@class'];
    }

    getName() {
        return BaseModel.getName(this.data);
    }

    attributes() {
        return this.data['@attributes'];
    }

    getAttr(name) {
        if (!this.isAttr(name)) throw new Error(`no attribute '${name}'`);
        return this.data['@attributes'][name];
    }

    async setAttr(name, value) {
        this.data['@attributes'][name] = value;
    }

    isAttr(name) {
        return this.data['@attributes'][name] !== undefined;
    }

    isData(colName, name) {
        if (!colName) throw new Error('isData: no colName');
        if (!name) throw new Error('isData: no name');
        return !!this.getColItemData(colName, name);
    }

    getData() {
        return this.data;
    }

    getDataCol(name) {
        if (!name) throw new Error('getCol: no name');
        const arr = this.data[name];
        if (!arr) throw new Error(`getCol: no col: ${name}`);
        return arr;
    }

    getItemNames(colName) {
        return this.getDataCol(colName).map(data => BaseModel.getName(data));
    }

    getColItemData(colName, name) {
        const data = BaseModel.findColDataByName(this.getDataCol(colName), name);
        if (data) return data;
        return null;
    }

    removeColData(colName, name) {
        const col = this.getDataCol(colName);
        const data = BaseModel.findColDataByName(col, name);
        if (!data) throw new Error(`removeColData: no ${name} in ${colName}`);
        col.splice(col.indexOf(data), 1);
        return data;
    }

    static findColDataByName(col, name) {
        return col.find(data => BaseModel.getName(data) === name);
    }

    addModelData(colName, data) {
        this.getDataCol(colName).push(data);
    }

    getApp() {
        throw new Error('getApp: not implemented');
    }

}
module.exports = BaseModel;
