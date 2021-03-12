const path = require('path');
const qforms = require('../../../qforms');
const Editor = require('../Editor');
const BaseModel = require('../../../BaseModel');

class FormEditor extends Editor {

    constructor(pageEditor, name, data) {
        super(data, pageEditor);
        this.name    = name;
    }

    newFieldData(params) {
        const name = params['name'];
        if (this.getModelData('fields', name)) {
            throw new Error(`field ${name} already exist`);
        }
        const data = eval(`qforms.${params['class']}Editor.createData(params);`);
        this.addModelData('fields', data);
        return data;
    }

    async moveFieldUp(params) {
        this.data.fields = qforms.Helper.moveObjProp(this.data.fields, params.field, -1);
        await this.parent.save();
        return 'ok';
    }

    async moveFieldDown(params) {
        this.data.fields = qforms.Helper.moveObjProp(this.data.fields, params.field, 1);
        await this.parent.save();
        return 'ok';
    }

    createDataSourceEditor(name) {
        const data = this.getModelData('dataSources', name);
        return eval(`new qforms.${BaseModel.getClassName(data)}Editor(this, name, data)`);
    }

    createFieldEditor(name) {
        const data = this.getModelData('fields', name);
        return eval(`new qforms.${BaseModel.getClassName(data)}Editor(this, name, data)`);
    }

    createActionEditor(name) {
        return new qforms.ActionEditor(this.getModelData('actions', name), this);
    }

    async newActionData(params) {
        if (!params.name) throw new Error('no name');
        const name = params.name;
        if (this.getModelData('actions', name)) {
            throw new Error(`action ${name} already exist`);
        }
        const data = qforms.ActionEditor.createData(params);
        this.addModelData('actions', data);
        return data;
    }

    async createJs(params) {
        const templateFilePath = path.join(__dirname, 'Form.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('js');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page  : this.parent.getAttr('name'),
            form  : this.name,
            _class: this.constructor.name.replace('Editor', '')
        });
        return js;
    }

    async getCollectionDirPath() {
        const customDirPath = await this.parent.getCustomDirPath();
        return path.join(customDirPath, 'forms');
    }

    async getCustomDirPath() {
        const collectionDirPath = await this.getCollectionDirPath();
        return path.join(collectionDirPath, this.name);
    }

    newDataSourceData(params) {
        const name   = params['name'];
        const _class = params['class'];
        if (this.getModelData('dataSources', name)) {
            throw new Error(`data source ${name} already exist.`);
        }
        let data;
        switch (_class) {
            case 'DataSource':
                data = qforms.DataSourceEditor.createData(params);
                break;
            case 'SqlDataSource':
                data = qforms.SqlDataSourceEditor.createData(params);
                break;
            default:
                throw new Error(`unknown data source class: ${_class}`);
        }
        this.addModelData('dataSources', data);
        return data;
    }

    getAppEditor() {
        return this.parent.getAppEditor();
    }

}

module.exports = FormEditor;
