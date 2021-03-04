class BaseModel {

    static getClassName(data) {
        return data['@class'];
    }

    static getName(data) {
        return BaseModel.getAttr(data, 'name');
    }

    static getAttr(data, name) {
        return data['@attributes'][name];
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

    isAttr(name) {
        return this.data['@attributes'][name] !== undefined;
    }

    isData(col, name) {
        if (!col) throw new Error('isData: no col');
        if (!name) throw new Error('isData: no name');
        return !!this.data[col][name];
    }

    getData() {
        return this.data;
    }

    getCol(name) {
        if (!name) throw new Error('getCol: no name');
        return this.data[name];
    }

    getModelData(col, name) {
        let data = this.data[col][name];
        if (data) return data;
        data = this.findModelData(`${col}2`, name);
        if (data) return data;
        throw new Error(`no ${col}: ${name}`);
    }

    findModelData(col, name) {
        return this.data[col].find(data => BaseModel.getName(data) === name);
    }

    addModelData(col, data) {
        this.data[col].push(data);
    }

    getApp() {
        throw new Error('getApp: not implemented');
    }

}
module.exports = BaseModel;
