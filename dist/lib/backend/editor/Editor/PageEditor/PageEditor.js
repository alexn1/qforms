"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const FormEditor_1 = __importDefault(require("../FormEditor/FormEditor"));
const path = require('path');
const Editor = require('../Editor');
const backend = require('../../../../backend');
const BaseModel = require('../../../BaseModel');
const TableFormEditor = require('../FormEditor/TableFormEditor/TableFormEditor');
const RowFormEditor = require('../FormEditor/RowFormEditor/RowFormEditor');
const DataSourceEditor = require('../DataSourceEditor/DataSourceEditor');
const SqlDataSourceEditor = require('../DataSourceEditor/SqlDataSourceEditor/SqlDataSourceEditor');
class PageEditor extends Editor {
    constructor(appEditor, pageFile) {
        super(pageFile.data, appEditor);
        this.appEditor = appEditor;
        this.pageFile = pageFile;
    }
    static createData(params) {
        return {
            '@class': 'Page',
            '@attributes': {
                formatVersion: '0.1',
                name: params['name'],
                caption: params['caption'] ? params['caption'] : params['name']
            },
            dataSources: [],
            actions: [],
            forms: [],
        };
    }
    setAttr(name, value) {
        console.log('PageEditor.setAttr', name, value);
        if (name === 'name') {
            // const pageLinkEditor = this.appEditor.createPageLinkEditor(this.getName());
            const pageLinkEditor = this.appEditor.createItemEditor('pageLinks', this.getName());
            pageLinkEditor.setAttr(name, value);
        }
        super.setAttr(name, value);
    }
    async moveFormUp(params) {
        this.moveDataColItem('forms', params.form, -1);
        return 'ok';
    }
    async save() {
        await this.pageFile.save();
    }
    async moveFormDown(params) {
        this.moveDataColItem('forms', params.form, 1);
        return 'ok';
    }
    newFormData(params) {
        const name = params['name'];
        const _class = params['class'];
        if (this.getColItemData('forms', name))
            throw new Error(`Form ${name} already exists.`);
        let data;
        switch (_class) {
            case 'TableForm':
                data = TableFormEditor.createData(params);
                break;
            case 'RowForm':
                data = RowFormEditor.createData(params);
                break;
            case 'Form':
                data = FormEditor_1.default.createData(params);
                break;
            default: throw new Error(`unknown form class: ${_class}`);
        }
        this.addModelData('forms', data);
        const formEditor = this.createFormEditor(name);
        // dataSources
        if (params.dataSources) {
            for (const dataSourceName in params.dataSources) {
                const dataSource = params.dataSources[dataSourceName];
                formEditor.newDataSourceData(dataSource);
                // const dataSourceEditor = formEditor.createDataSourceEditor(dataSourceName);
                const dataSourceEditor = formEditor.createItemEditor('dataSources', dataSourceName);
                // keyColumns
                if (dataSource.keyColumns) {
                    for (const keyColumnName in dataSource.keyColumns) {
                        dataSourceEditor.newKeyColumnData(dataSource.keyColumns[keyColumnName]);
                    }
                }
            }
        }
        // fields
        if (params.fields) {
            for (const fieldName in params.fields) {
                formEditor.newFieldData(params.fields[fieldName]);
            }
        }
        return data;
    }
    createFormEditor(name) {
        const data = this.getColItemData('forms', name);
        const className = BaseModel.getClassName(data);
        const Class = backend[`${className}Editor`];
        return new Class(data, this);
    }
    async createJs(params) {
        const templateFilePath = path.join(__dirname, 'Page.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('js');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page: this.getName(),
            _class: this.constructor.name.replace('Editor', '')
        });
        return js;
    }
    async createModelBackJs(params) {
        const filePath = path.join(await this.getCustomDirPath(), 'Model.back.js');
        const templateFilePath = path.join(__dirname, 'Model.back.js.ejs');
        const js = await this.createFileByParams(filePath, templateFilePath, {
            name: this.getName(),
        });
        return js;
    }
    async getCustomDirPath() {
        console.log('PageEditor.getCustomDirPath');
        const customDirPath = await this.parent.getCustomDirPath();
        return path.join(customDirPath, 'pages', this.getName());
    }
    newDataSourceData(params) {
        const name = params['name'];
        const _class = params['class'];
        if (this.getColItemData('dataSources', name)) {
            throw new Error(`DataSource ${name} already exists`);
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
module.exports = PageEditor;
