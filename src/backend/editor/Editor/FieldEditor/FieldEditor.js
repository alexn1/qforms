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

    async createEjs(params) {
        const formData = this.parent.getData();
        const defaultEjsFilePath = path.join(this.defaultViewDirPath, formData['@class'] + this.getViewName() + '.ejs');
        const customEjsFilePath = await this.getCustomFilePath('ejs');
        const replaceFrom = formData['@class'] + this.getViewName();
        const replaceTo = params.page + '-' + params.form + '-' + params.field;
        const ejs = await this.createFileByReplace(customEjsFilePath, defaultEjsFilePath, replaceFrom, replaceTo, null);
        return ejs;
    }

    async createCss(params) {
        const formData = this.parent.getData();
        const defaultCssFilePath = path.join(this.defaultViewDirPath, formData['@class'] + this.getViewName() + '.css');
        const customCssFilePath = await this.getCustomFilePath('css');
        const replaceFrom = formData['@class'] + this.getViewName();
        const replaceTo   = params.page + '-' + params.form + '-' + params.field;
        const ejs = await this.createFileByReplace(customCssFilePath, defaultCssFilePath, replaceFrom, replaceTo, null);
        return ejs;
    }

    async createJs(params) {
        const templateFilePath = path.join(__dirname, 'Field.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('js');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page  : this.parent.parent.getAttr('name'),
            form  : this.parent.name,
            field : this.name,
            _class: this.constructor.name.replace('Editor', '')
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

    /*async getCustomFilePath(ext) {
        const customDirPath = await this.getCustomDirPath();
        if (ext === 'js') {
            return path.join(customDirPath, 'Controller.js');
        }
        return path.join(customDirPath, this.name + '.' + ext);
    }*/

    getAppEditor() {
        return this.parent.getAppEditor();
    }

}

module.exports = FieldEditor;
