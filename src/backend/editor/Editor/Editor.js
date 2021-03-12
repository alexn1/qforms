const path    = require('path');
const ejs     = require('ejs');
const qforms = require('../../qforms');
const BaseModel = require('../../BaseModel');

class Editor extends BaseModel {
    /*constructor(data, parent) {
        super(data, parent);
    }*/

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
        await qforms.Helper.writeFile2(newFilePath, text);
        return text;
    }

    async createFileByParams(newFilePath, templateFilePath, params) {
        const exists = await qforms.Helper.exists(newFilePath);
        if (exists) {
            throw new Error('File {fileName} already exist.'.replace('{fileName}', path.basename(newFilePath)));
        }
        const template = await qforms.Helper.readTextFile(templateFilePath);
        const content = ejs.render(template, params);
        await qforms.Helper.writeFile2(newFilePath, content);
        return content;
    }

    /*getViewName() {
        return this.constructor.name.replace('Editor', '') + 'View';
    }*/

    async getFile(filePath) {
        console.log('Editor.getFile', filePath);
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
        return await qforms.Helper.writeFile2(filePath, content);
    }

    async getCustomFile(ext) {
        console.log('Editor.getCustomFile', ext);
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

    async setAttr(name, value) {
        console.log(`Editor(${this.constructor.name}).setAttr`, name, value);
        // const oldValue = this.getAttr(name);
        BaseModel.setAttr(this.data, name, value);
        /*if (name === 'name' && this.colName) {
            if (!this.parent) throw new Error('no parent editor');
            this.parent.renameObjField(this.colName, oldValue, value);
        }*/
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
    createDataSourceEditor(name) {
        const data = this.getModelData('dataSources', name);
        const className = BaseModel.getClassName(data);
        const DataSourceClass = qforms[`${className}Editor`];
        return new DataSourceClass(data, this);
    }
}

module.exports = Editor;
