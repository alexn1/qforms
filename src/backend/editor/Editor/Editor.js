const path    = require('path');
const ejs     = require('ejs');
const qforms = require('../../qforms');
const BaseModel = require('../../BaseModel');
const Helper = require('../../Helper');

class Editor extends BaseModel {

    /*async createFileByReplace(newFilePath, templateFilePath, replaceFrom, replaceTo, emptyTemplate) {
        console.log('Editor.createFileByReplace');
        emptyTemplate = emptyTemplate || '';
        const exists = await qforms.Helper.exists(newFilePath);
        if (exists) {
            throw new Error(`File ${path.basename(newFilePath)} already exist.`);
        }
        const template = await qforms.Helper.readTextFile(templateFilePath);
        let text = template.replace(new RegExp(replaceFrom, 'g'), replaceTo);
        if (text === '') {
            text = emptyTemplate;
        }
        await qforms.Helper.writeFile2(newFilePath, text);
        return text;
    }*/

    async createFileByParams(newFilePath, templateFilePath, params) {
        const exists = await qforms.Helper.exists(newFilePath);
        if (exists) {
            throw new Error(`File ${path.basename(newFilePath)} already exists.`);
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
            throw new Error(`File {path.basename(filePath)} doesn't exist.`);
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
        this.moveDataColItem('dataSources', name, -1);
    }

    moveDataSourceDown(name) {
        this.moveDataColItem('dataSources', name, 1);
    }

    moveActionUp(name) {
        this.moveDataColItem('actions', name, -1);
    }

    moveActionDown(name) {
        this.moveDataColItem('actions', name, 1);
    }

    async getCustomFilePath(ext) {
        const customDirPath = await this.getCustomDirPath();
        if (ext === 'js') {
            return path.join(customDirPath, 'Controller.js');
        }
        return path.join(customDirPath, this.getName() + '.' + ext);
    }
    createDataSourceEditor(name) {
        const data = this.getColItemData('dataSources', name);
        const className = BaseModel.getClassName(data);
        const DataSourceClass = qforms[`${className}Editor`];
        return new DataSourceClass(data, this);
    }
    moveDataColItem(colName, name, offset) {
        Helper.moveArrItem(
            this.getDataCol(colName),
            this.getColItemData(colName, name),
            offset
        );
    }
    async newActionData(params) {
        if (!params.name) throw new Error('no name');
        const name = params.name;
        if (this.getColItemData('actions', name)) {
            throw new Error(`action ${name} already exists`);
        }
        const data = qforms.ActionEditor.createData(params);
        this.addModelData('actions', data);
        return data;
    }
    createActionEditor(name) {
        return new qforms.ActionEditor(this.getColItemData('actions', name), this);
    }
}

module.exports = Editor;
