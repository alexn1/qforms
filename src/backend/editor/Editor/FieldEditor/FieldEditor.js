const util = require('util');
const path = require('path');
const fs   = require('fs');
const qforms = require('../../../qforms');
const Editor = require('../Editor');

class FieldEditor extends Editor {

    constructor(formEditor, name, data) {
        super(data, formEditor);
        this.formEditor = formEditor;
        this.name       = name;
        this.colName = 'fields';
    }

    async setData(data) {
        this.parent.data.fields[this.name] = data;
        return await this.parent.parent.save();
    }

    async changeClass(newClassName) {
        const newData = eval(`qforms.${newClassName}Editor.createData(this.attributes())`);
        await this.setData(newData);
        return newData;
    }

    async createJs(params) {
        const templateFilePath = path.join(__dirname, 'Field.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('js');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page     : this.parent.parent.getAttr('name'),
            form     : this.parent.name,
            field    : this.name,
            formClass: this.parent.constructor.name.replace('Editor', ''),
            _class   : this.constructor.name.replace('Editor', '')
        });
        return js;
    }

    async getCollectionDirPath() {
        const customDirPath = await this.parent.getCustomDirPath();
        const dirPath = path.join(customDirPath, 'fields');
        // await qforms.Helper.createDirIfNotExists(dirPath);
        return dirPath;
    }

    async getCustomDirPath() {
        const collectionDirPath = await this.getCollectionDirPath();
        const dirPath = path.join(collectionDirPath, this.name);
        // await qforms.Helper.createDirIfNotExists(dirPath);
        return dirPath;
    }

    getAppEditor() {
        return this.parent.getAppEditor();
    }

}

module.exports = FieldEditor;
