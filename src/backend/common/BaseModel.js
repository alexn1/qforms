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

    isData(colName, name) {
        if (colName && name && this.data[colName] && this.data[colName][name]) {
            return true;
        }
        return false;
    }

    getData(colName, name) {
        if (!this.data) throw new Error('no data');
        if (colName && name) {
            if (!this.data[colName][name]) throw new Error(`no ${colName}: ${name}`);
            return this.data[colName][name];
        }
        if (colName) {
            return this.data[colName];
        }
        return this.data;
    }

    getApp() {
        throw new Error('getApp: not implemented');
    }
}
module.exports = BaseModel;
