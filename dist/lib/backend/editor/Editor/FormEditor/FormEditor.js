"use strict";
const path = require('path');
const Editor = require('../Editor');
const backend = require('../../../../backend');
// const BaseModel = require('../../../BaseModel');
const DataSourceEditor = require('../DataSourceEditor/DataSourceEditor');
const SqlDataSourceEditor = require('../DataSourceEditor/SqlDataSourceEditor/SqlDataSourceEditor');
// import FieldEditor from '../FieldEditor/FieldEditor';
class FormEditor extends Editor {
    static createData(params) {
        return {
            '@class': 'Form',
            '@attributes': {
                name: params.name,
                caption: params.caption ? params.caption : params.name,
                visible: params.visible ? params.visible : 'true',
            },
            dataSources: [],
            actions: [],
            fields: [],
        };
    }
    newFieldData(params) {
        const name = params['name'];
        if (this.getColItemData('fields', name)) {
            throw new Error(`field ${name} already exists`);
        }
        const data = backend[`${params['class']}Editor`].createData(params);
        this.addModelData('fields', data);
        return data;
    }
    /*async moveFieldUp(params) {
        this.moveDataColItem('fields', params.field, -1);
        return 'ok';
    }*/
    /*async moveFieldDown(params) {
        this.moveDataColItem('fields', params.field, 1);
        return 'ok';
    }*/
    /*createFieldEditor(name): FieldEditor {
        const data = this.getColItemData('fields', name);
        const className = BaseModel.getClassName(data);
        const Class = backend[`${className}Editor`];
        return new Class(data, this);
    }*/
    async createJs(params) {
        const templateFilePath = path.join(__dirname, 'Form.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('js');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page: this.parent.getName(),
            form: this.getName(),
            _class: this.constructor.name.replace('Editor', '')
        });
        return js;
    }
    async createModelBackJs(params) {
        const filePath = path.join(await this.getCustomDirPath(), 'Model.back.js');
        const templateFilePath = path.join(__dirname, 'Model.back.js.ejs');
        const js = await this.createFileByParams(filePath, templateFilePath, {
            page: this.parent.getName(),
            form: this.getName(),
            _class: this.getClassName()
        });
        return js;
    }
    async getCollectionDirPath() {
        const customDirPath = await this.parent.getCustomDirPath();
        return path.join(customDirPath, 'forms');
    }
    /*async getCustomDirPath() {
        const collectionDirPath = await this.getCollectionDirPath();
        return path.join(collectionDirPath, this.getName());
    }*/
    newDataSourceData(params) {
        const name = params['name'];
        const _class = params['class'];
        if (this.getColItemData('dataSources', name)) {
            throw new Error(`data source ${name} already exist.`);
        }
        let data;
        switch (_class) {
            case 'DataSource':
                data = DataSourceEditor.createData(params);
                break;
            case 'SqlDataSource':
                data = SqlDataSourceEditor.createData(params);
                break;
            default:
                throw new Error(`unknown data source class: ${_class}`);
        }
        this.addModelData('dataSources', data);
        return data;
    }
}
module.exports = FormEditor;
