const path    = require('path');
const ejs     = require('ejs');
const qforms = require('../../qforms');
const BaseModel = require('../../BaseModel');

class Editor extends BaseModel {
    constructor(data, parent) {
        super(data, parent);
        this.colName = null;
    }

    async createFileByReplace(newFilePath, templateFilePath, replaceFrom, replaceTo, emptyTemplate) {
        console.log('Editor.createFileByReplace');
        emptyTemplate = emptyTemplate || '';
        const exists = await qforms.Helper.exists(newFilePath);
        if (exists) {
            throw new Error('File {fileName} already exist.'.replace('{fileName}', path.basename(newFilePath)));
        }
        const template = await qforms.Helper.readTextFile(templateFilePath);
        let text = template.replace(new RegExp(replaceFrom, 'g'), replaceTo);
        if (text === '') {
            text = emptyTemplate;
        }
        await qforms.Helper.writeFile(newFilePath, text);
        return text;
    }

    async createFileByParams(newFilePath, templateFilePath, params) {
        const exists = await qforms.Helper.exists(newFilePath);
        if (exists) {
            throw new Error('File {fileName} already exist.'.replace('{fileName}', path.basename(newFilePath)));
        }
        const template = await qforms.Helper.readTextFile(templateFilePath);
        const content = ejs.render(template, params);
        await qforms.Helper.writeFile(newFilePath, content);
        return content;
    }

    getViewName() {
        return this.constructor.name.replace('Editor', '') + 'View';
    }

    async getFile(filePath) {
        console.log('Editor.getFile');
        const exists = await qforms.Helper.exists(filePath);
        if (exists) {
            return await qforms.Helper.readTextFile(filePath);
        }
    }

    async saveFile(filePath, content) {
        const exists = await qforms.Helper.exists(filePath);
        if (!exists) {
            throw new Error("File {fileName} doesn't exist.".replace('{fileName}', path.basename(filePath)));
        }
        return await qforms.Helper.writeFile(filePath, content);
    }

    async getCustomFile(ext) {
        console.log('Editor.getCustomFile');
        const customFilePath = await this.getCustomFilePath(ext);
        return this.getFile(customFilePath);
    }

    async saveCustomFile(ext, text) {
        const customFilePath = await this.getCustomFilePath(ext);
        return await this.saveFile(customFilePath, text);
    }

    moveDataSourceUp(name) {
        this.data.dataSources = qforms.Helper.moveObjProp(this.data.dataSources, name, -1);
    }

    moveDataSourceDown(name) {
        this.data.dataSources = qforms.Helper.moveObjProp(this.data.dataSources, name, 1);
    }

    renameObjField(objName, oldName, newName) {
        console.log(`Editor(${this.constructor.name}).renameObjField`, objName, oldName, newName);
        this.data[objName] = qforms.Helper.replaceKey(this.data[objName], oldName, newName);
    }

    async setAttr(name, value) {
        console.log(`Editor(${this.constructor.name}).setAttr`, name, value);
        const oldValue = this.getAttr(name);
        this.data['@attributes'][name] = value;
        if (name === 'name' && this.colName) {
            if (!this.parent) throw new Error('no parent editor');
            this.parent.renameObjField(this.colName, oldValue, value);
        }
        return await this.save();
    }

    async save() {
        console.log(`Editor(${this.constructor.name}).save`);
        if (this.parent) {
            return await this.parent.save();
        } else {
            console.error(`Editor(${this.constructor.name}).save: no parent`);
        }
    }

    getAppEditor() {
        return null;
    }
    async getCustomFilePath(ext) {
        const customDirPath = await this.getCustomDirPath();
        if (ext === 'js') {
            return path.join(customDirPath, 'Controller.js');
        }
        return path.join(customDirPath, this.name + '.' + ext);
    }
}

module.exports = Editor;
