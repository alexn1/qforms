const util = require('util');
const path = require('path');
const fs   = require('fs');
const qforms = require('../../../qforms');
const Editor = require('../Editor');

class FieldEditor extends Editor {

    async setData(newData) {
        return this.parent.replaceDataColItem('fields', this.data, newData);
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

}

module.exports = FieldEditor;
