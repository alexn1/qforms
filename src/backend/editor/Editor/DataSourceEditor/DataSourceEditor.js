'use strict';

const path = require('path');
const qforms = require('../../../qforms');
const Editor = require('../Editor');

class DataSourceEditor extends Editor {

    static createData(params) {
        // throw new Error('DataSourceEditor.createData not implemented');
        return {
            '@class'     : 'DataSource',
            '@attributes': {
                name                : params.name,
                // dumpFirstRowToParams: 'false'
            }
        };
    }

    constructor(parent, name, data) {
        super(data, parent);
        this.name = this.getAttr('name');
        this.colName = 'dataSources';
    }

    newKeyColumn(params) {
        const name = params.name;
        if (!this.data.keyColumns) {
            this.data.keyColumns = {};
        }
        if (this.data.keyColumns[name]) {
            throw new Error('Key Column {name} already exist.'.replace('{name}', name));
        }
        return this.data.keyColumns[name] = {
            '@class'     : 'KeyColumn',
            '@attributes': {
                'name': name
            }
        };
    }

    async getCollectionDirPath() {
        const customDirPath = await this.parent.getCustomDirPath();
        const dirPath = path.join(customDirPath, 'dataSources');
        await qforms.Helper.createDirIfNotExists(dirPath);
        return dirPath;
    }

    async getCustomDirPath() {
        const collectionDirPath = await this.getCollectionDirPath();
        const dirPath = path.join(collectionDirPath, this.name);
        await qforms.Helper.createDirIfNotExists(dirPath);
        return dirPath;
    }

    async getCustomFilePath(ext) {
        const customDirPath = await this.getCustomDirPath();
        return path.join(customDirPath, this.name + '.' + ext);
    }

    async createBackendJs(params) {
        const templateFilePath = path.join(__dirname, 'DataSource.backend.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('backend.js');
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
