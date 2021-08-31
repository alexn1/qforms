"use strict";
const path = require('path');
const Editor = require('../Editor');
const backend = require('../../../../backend');
class FieldEditor extends Editor {
    async changeClass(newClassName) {
        const newData = backend[`${newClassName}Editor`].createData(this.attributes());
        this.setData('fields', newData);
        return newData;
    }
    async reformat() {
        const newData = backend[`${this.getClassName()}Editor`].createData(this.attributes());
        this.setData('fields', newData);
        return newData;
    }
    async createJs(params) {
        const templateFilePath = path.join(__dirname, 'Field.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('js');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page: this.parent.parent.getName(),
            form: this.parent.getName(),
            field: this.getName(),
            formClass: this.parent.constructor.name.replace('Editor', ''),
            _class: this.constructor.name.replace('Editor', '')
        });
        return js;
    }
    async getCollectionDirPath() {
        const customDirPath = await this.parent.getCustomDirPath();
        const dirPath = path.join(customDirPath, 'fields');
        return dirPath;
    }
    async getCustomDirPath() {
        const collectionDirPath = await this.getCollectionDirPath();
        const dirPath = path.join(collectionDirPath, this.getName());
        return dirPath;
    }
    static createAttributes(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            name: params.name,
            caption: params.caption !== undefined ? params.caption : params.name,
            column: params.column !== undefined ? params.column : params.name,
            defaultValue: params.defaultValue !== undefined ? params.defaultValue : '',
            value: params.value !== undefined ? params.value : '',
            param: params.param !== undefined ? params.param : 'false',
            isVisible: params.isVisible !== undefined ? params.isVisible : 'true',
            type: params.type !== undefined ? params.type : '',
            width: params.width !== undefined ? params.width : '0',
        };
    }
}
module.exports = FieldEditor;
