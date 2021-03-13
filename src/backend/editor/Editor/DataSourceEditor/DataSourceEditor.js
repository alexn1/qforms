const path = require('path');
const qforms = require('../../../qforms');
const Editor = require('../Editor');

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

    /*constructor(data, parent) {
        super(data, parent);
        // this.name = this.getName();
    }*/

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
        console.log(`Editor(${this.constructor.name}).save`);
        if (this.parent) {
            await this.parent.save();
        } else {
            console.error(`Editor(${this.constructor.name}).save: no parent`);
        }
    }

}

module.exports = DataSourceEditor;
