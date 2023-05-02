"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const EventEmitter_1 = require("../EventEmitter");
const Helper_1 = require("../../common/Helper");
class Model extends EventEmitter_1.EventEmitter {
    constructor(data, parent = null) {
        if (!data.name)
            throw new Error(`${data.class} no name`);
        super();
        this.data = data;
        this.parent = parent;
        this.deinited = false;
    }
    init() { }
    deinit() {
        if (this.deinited)
            throw new Error(`${this.getFullName()}: model already deinited`);
        this.deinited = true;
    }
    static getAttr(data, name) {
        return data[name];
    }
    static getCol(data, name) {
        return data[name];
    }
    static getName(data) {
        return Model.getAttr(data, 'name');
    }
    static getClassName(data) {
        return Model.getAttr(data, 'class');
    }
    isAttr(name) {
        // return this.data[name] !== undefined;
        return this.data.hasOwnProperty(name);
    }
    getAttr(name) {
        return this.data[name];
    }
    getCol(name) {
        return this.data[name];
    }
    getClassName() {
        return this.getAttr('class');
    }
    getName() {
        return this.getAttr('name');
    }
    getFullName() {
        if (this.parent) {
            return `${this.parent.getFullName()}.${this.getName()}`;
        }
        return this.getName();
    }
    getCaption() {
        return this.getAttr('caption');
    }
    getDataSource(name) {
        return this.dataSources.find((dataSource) => dataSource.getName() === name);
    }
    createDataSources() {
        for (const data of this.data.dataSources) {
            try {
                const Class = Helper_1.Helper.getGlobalClass(data.class);
                if (!Class)
                    throw new Error(`no ${data.class} class`);
                const dataSource = new Class(data, this);
                dataSource.init();
                this.dataSources.push(dataSource);
            }
            catch (err) {
                err.message = `${this.getFullName()}.${data.name}: ${err.message}`;
                throw err;
            }
        }
    }
    deinitDataSources() {
        for (const dataSource of this.dataSources) {
            dataSource.deinit();
        }
    }
    hasActions() {
        return this.data.actions.length > 0;
    }
    getParent() {
        return this.parent;
    }
    getData() {
        return this.data;
    }
}
exports.Model = Model;
