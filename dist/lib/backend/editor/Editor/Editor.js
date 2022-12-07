"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Editor = void 0;
const path = require('path');
const ejs = require('ejs');
const BaseModel_1 = require("../../BaseModel");
const Helper_1 = require("../../Helper");
const backend = __importStar(require("../../../backend"));
class Editor extends BaseModel_1.BaseModel {
    /*async createFileByReplace(newFilePath, templateFilePath, replaceFrom, replaceTo, emptyTemplate) {
        console.log('Editor.createFileByReplace');
        emptyTemplate = emptyTemplate || '';
        const exists = await Helper.exists(newFilePath);
        if (exists) {
            throw new Error(`File ${path.basename(newFilePath)} already exist.`);
        }
        const template = await Helper.readTextFile(templateFilePath);
        let text = template.replace(new RegExp(replaceFrom, 'g'), replaceTo);
        if (text === '') {
            text = emptyTemplate;
        }
        await Helper.writeFile2(newFilePath, text);
        return text;
    }*/
    async createFileByParams(newFilePath, templateFilePath, params) {
        const exists = await Helper_1.Helper.exists(newFilePath);
        if (exists) {
            throw new Error(`File ${path.basename(newFilePath)} already exists.`);
        }
        const template = await Helper_1.Helper.readTextFile(templateFilePath);
        const content = ejs.render(template, params);
        await Helper_1.Helper.writeFile2(newFilePath, content);
        return content;
    }
    /*getViewName() {
        return this.constructor.name.replace('Editor', '') + 'View';
    }*/
    async getFile(filePath) {
        console.log('Editor.getFile', filePath);
        const exists = await Helper_1.Helper.exists(filePath);
        if (exists) {
            return await Helper_1.Helper.readTextFile(filePath);
        }
    }
    async saveFile(filePath, content) {
        const exists = await Helper_1.Helper.exists(filePath);
        if (!exists) {
            throw new Error(`File {path.basename(filePath)} doesn't exist.`);
        }
        await Helper_1.Helper.writeFile2(filePath, content);
    }
    async getCustomFile(ext) {
        console.log('Editor.getCustomFile', ext);
        const customFilePath = await this.getCustomFilePath(ext);
        return this.getFile(customFilePath);
    }
    async saveCustomFile(ext, text) {
        const customFilePath = await this.getCustomFilePath(ext);
        await this.saveFile(customFilePath, text);
    }
    /*moveDataSourceUp(name) {
        this.moveDataColItem('dataSources', name, -1);
    }*/
    /*moveDataSourceDown(name) {
        this.moveDataColItem('dataSources', name, 1);
    }*/
    /*moveActionUp(name) {
        this.moveDataColItem('actions', name, -1);
    }*/
    /*moveActionDown(name) {
        this.moveDataColItem('actions', name, 1);
    }*/
    async getCustomFilePath(ext) {
        const customDirPath = await this.getCustomDirPath();
        if (ext === 'js') {
            return path.join(customDirPath, 'Controller.front.js');
        }
        else if (ext === 'jsx') {
            return path.join(customDirPath, 'View.jsx');
        }
        else if (ext === 'less') {
            return path.join(customDirPath, 'View.less');
        }
        return path.join(customDirPath, this.getName() + '.' + ext);
    }
    /*createDataSourceEditor(name) {
        const data = this.getColItemData('dataSources', name);
        const className = BaseModel.getClassName(data);
        const DataSourceClass = backend[`${className}Editor`];
        return new DataSourceClass(data, this);
    }*/
    moveDataColItem(colName, name, offset) {
        Helper_1.Helper.moveArrItem(this.getCol(colName), this.getColItemData(colName, name), offset);
    }
    /*async newActionData(params) {
        if (!params.name) throw new Error('no name');
        const name = params.name;
        if (this.getColItemData('actions', name)) {
            throw new Error(`action ${name} already exists`);
        }
        const data = backend.ActionEditor.createData(params);
        this.addModelData('actions', data);
        return data;
    }*/
    /*createActionEditor(name) {
        return new backend.ActionEditor(this.getColItemData('actions', name), this);
    }*/
    setData(colName, newData) {
        // console.log('Editor.setData', newData);
        return this.parent.replaceDataColItem(colName, this.data, newData);
    }
    createItemEditor(colName, itemName) {
        const data = this.getColItemData(colName, itemName);
        const className = BaseModel_1.BaseModel.getClassName(data);
        const Class = backend[`${className}Editor`];
        return new Class(data, this);
    }
    async getCustomDirPath() {
        const collectionDirPath = await this.getCollectionDirPath();
        return path.join(collectionDirPath, this.getName());
    }
    async getCollectionDirPath() {
        throw new Error('Editor.getCollectionDirPath not implemented');
    }
    moveItemUp(colName, itemName) {
        this.moveDataColItem(colName, itemName, -1);
    }
    moveItemDown(colName, itemName) {
        this.moveDataColItem(colName, itemName, 1);
    }
    newItemData(className, colName, params) {
        console.log('Editor.newItemData', className, colName, params);
        const { name } = params;
        if (!name)
            throw new Error('no name');
        const editorClassName = `${className}Editor`;
        const Class = backend[editorClassName];
        if (!Class)
            throw new Error(`no class ${editorClassName}`);
        const data = Class.createData(params);
        this.addModelData(colName, data);
        return data;
    }
    getColName() {
        throw new Error(`${this.constructor.name}.getColName not implemented`);
    }
    static createItemData(data) {
        // console.log('Editor.createItemData', data);
        try {
            const params = data['@attributes']
                ? Object.assign(Object.assign({ class: BaseModel_1.BaseModel.getClassName(data) }, BaseModel_1.BaseModel.attributes(data)), data) : data;
            if (!params.class) {
                const name = data['@attributes'] ? BaseModel_1.BaseModel.getName(data) : data.name;
                throw new Error(`${name}: no class in data`);
            }
            return backend[`${params.class}Editor`].createData(params);
        }
        catch (err) {
            const name = data['@attributes'] ? BaseModel_1.BaseModel.getName(data) : data.name;
            err.message = `${name}: ${err.message}`;
            throw err;
        }
    }
}
exports.Editor = Editor;
