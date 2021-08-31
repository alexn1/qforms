const path = require('path');
const Editor = require('../Editor');
const backend = require('../../../index');

class DataSourceEditor extends Editor {

    static createData(params): any {
        return {
            '@class'     : 'DataSource',
            '@attributes': {
                name    : params.name,
                database: params.database ? params.database : 'default',
                table   : params.table    ? params.table    :        '',
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

    /*async createBackendJs(params) {
        const templateFilePath = path.join(__dirname, 'DataSource.back.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('back.js');
        const backendJs = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page      : params.page ? params.page : '',
            form      : params.form ? params.form : '',
            dataSource: this.getName(),
            _class    : this.constructor.name.replace('Editor', '')
        });
        return backendJs;
    }*/

    async createModelBackJs(params) {
        const filePath = path.join(await this.getCustomDirPath(), 'Model.back.js');
        const templateFilePath = path.join(__dirname, 'Model.back.js.ejs');
        const js = await this.createFileByParams(filePath, templateFilePath, {
            _class: this.getClassName(),
            page      : params.page ? params.page : '',
            form      : params.form ? params.form : '',
            dataSource: this.getName(),
        });
        return js;
    }

    async save() {
        // console.log(`DataSourceEditor.save`);
        if (!this.parent) {
            throw new Error('DataSourceEditor.save: no parent');
        }
        if (this.parent instanceof backend.FormEditor) {
            await this.parent.parent.save();    // on form
        } else {
            await this.parent.save();           // on page
        }
    }



}

export = DataSourceEditor;
