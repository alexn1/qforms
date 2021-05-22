const path = require('path');
const Editor = require('../Editor');
const FormEditor = require('../FormEditor/FormEditor');

class DataSourceEditor extends Editor {

    static createData(params) {
        return {
            '@class'     : 'DataSource',
            '@attributes': {
                name: params.name,
            },
            keyColumns: [],
        };
    }

    newKeyColumnData(params) {
        const name = params.name;
        if (this.getColItemData('keyColumns', name)) {
            throw new Error(`Key Column ${name} already exist.`);
        }
        const data = {
            '@class'     : 'KeyColumn',
            '@attributes': {
                'name': name
            }
        };
        this.addModelData('keyColumns', data);
        return data;
    }

    async getCollectionDirPath() {
        const customDirPath = await this.parent.getCustomDirPath();
        return path.join(customDirPath, 'dataSources');
    }

    async getCustomDirPath() {
        const collectionDirPath = await this.getCollectionDirPath();
        return path.join(collectionDirPath, this.getName());
    }

    async createBackendJs(params) {
        const templateFilePath = path.join(__dirname, 'DataSource.back.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('back.js');
        const backendJs = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page      : params.page ? params.page : '',
            form      : params.form ? params.form : '',
            dataSource: this.getName(),
            _class    : this.constructor.name.replace('Editor', '')
        });
        return backendJs;
    }

    async save() {
        // console.log(`DataSourceEditor.save`);
        if (!this.parent) {
            throw new Error('DataSourceEditor.save: no parent');
        }
        if (this.parent instanceof FormEditor) {
            await this.parent.parent.save();
        } else {
            await this.parent.save();
        }
    }

}

module.exports = DataSourceEditor;
