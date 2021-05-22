const util = require('util');
const path = require('path');
const fs   = require('fs');

const Editor = require('../Editor');
const qforms = require('../../../../backend');


class FieldEditor extends Editor {

    async setData(newData) {
        // console.log('FieldEditor.setData', newData);
        return this.parent.replaceDataColItem('fields', this.data, newData);
    }

    async changeClass(newClassName) {
        const newData = qforms[`${newClassName}Editor`].createData(this.attributes());
        await this.setData(newData);
        return newData;
    }

    async createJs(params) {
        const templateFilePath = path.join(__dirname, 'Field.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('js');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page     : this.parent.parent.getName(),
            form     : this.parent.getName(),
            field    : this.getName(),
            formClass: this.parent.constructor.name.replace('Editor', ''),
            _class   : this.constructor.name.replace('Editor', '')
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
        return {
            name        : params.name,
            caption     : params.caption      !== undefined ? params.caption      :    params.name,
            column      : params.column       !== undefined ? params.column       :    params.name,
            defaultValue: params.defaultValue !== undefined ? params.defaultValue :             '',
            value       : params.value        !== undefined ? params.value        :             '',
            param       : params.param        !== undefined ? params.param        :        'false',
            isVisible   : params.isVisible    !== undefined ? params.isVisible    :         'true',
            type        : params.type         !== undefined ? params.type         :             '',
            width       : params.width        !== undefined ? params.width        :            '0',
        }
    }

}

module.exports = FieldEditor;
