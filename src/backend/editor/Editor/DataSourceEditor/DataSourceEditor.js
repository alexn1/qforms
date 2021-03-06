const path = require('path');
const qforms = require('../../../qforms');
const Editor = require('../Editor');

class DataSourceEditor extends Editor {

    static createData(params) {
        // throw new Error('DataSourceEditor.createData not implemented');
        return {
            '@class'     : 'DataSource',
            '@attributes': {
                name: params.name,
            },
            keyColumns: {},
            keyColumns2: [],
        };
    }

    constructor(parent, name, data) {
        super(data, parent);
        this.name = this.getAttr('name');
        // this.colName = 'dataSources';
    }

    newKeyColumnData(params) {
        const name = params.name;
        if (!this.data.keyColumns) {
            this.data.keyColumns = {};
        }
        if (!this.data.keyColumns2) {
            this.data.keyColumns2 = [];
        }
        if (this.getModelData('keyColumns', name)) {
            throw new Error(`Key Column ${name} already exist.`);
        }
        const data = {
            '@class'     : 'KeyColumn',
            '@attributes': {
                'name': name
            }
        };
        // this.data.keyColumns[name] = data;
        this.addModelData('keyColumns2', data);
        return data;
    }

    async getCollectionDirPath() {
        const customDirPath = await this.parent.getCustomDirPath();
        return path.join(customDirPath, 'dataSources');
    }

    async getCustomDirPath() {
        const collectionDirPath = await this.getCollectionDirPath();
        return path.join(collectionDirPath, this.name);
    }

    async createBackendJs(params) {
        const templateFilePath = path.join(__dirname, 'DataSource.back.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('back.js');
        const backendJs = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page      : params.page ? params.page : '',
            form      : params.form ? params.form : '',
            dataSource: this.name,
            _class    : this.constructor.name.replace('Editor', '')
        });
        return backendJs;
    }



}

module.exports = DataSourceEditor;
