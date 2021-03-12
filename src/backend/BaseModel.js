class BaseModel {

    static getClassName(data) {
        return data['@class'];
    }

    static getAttr(data, name) {
        return data['@attributes'][name];
    }

    static setAttr(data, name, value) {
        data['@attributes'][name] = value;
    }

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

    isAttr(name) {
        return this.data['@attributes'][name] !== undefined;
    }

    isData(colName, name) {
        if (!colName) throw new Error('isData: no colName');
        if (!name) throw new Error('isData: no name');
        return !!this.getModelData(colName, name);
        // return !!this.getCol(colName)[name];
    }

    getData() {
        return this.data;
    }

    getCol(name) {
        if (!name) throw new Error('getCol: no name');
        const arr = this.data[name];
        if (!arr) throw new Error(`getCol: no col: ${name}`);
        return arr;
    }

    getItemNames(colName) {
        return this.getCol(colName).map(data => BaseModel.getName(data));
    }

    getModelData(colName, name) {
        let data;
        data = BaseModel.findColDataByName(this.getCol(colName), name);
        if (data) return data;
        return null;
    }

    removeColData(colName, name) {
        const col = this.getCol(colName);
        const data = BaseModel.findColDataByName(col, name);
        if (!data) throw new Error(`removeColData: no ${name} in ${colName}`);
        col.splice(col.indexOf(data), 1);
    }

    static findColDataByName(col, name) {
        return col.find(data => BaseModel.getName(data) === name);
    }

    addModelData(colName, data) {
        this.getCol(colName).push(data);
    }

    getApp() {
        throw new Error('getApp: not implemented');
    }

    /*renameObjField(objName, oldName, newName) {
        console.log(`Editor(${this.constructor.name}).renameObjField`, objName, oldName, newName);
        this.data[objName] = qforms.Helper.replaceKey(this.data[objName], oldName, newName);
    }*/

}
module.exports = BaseModel;
