const path = require('path');
const qforms = require('../../../qforms');
const Editor = require('../Editor');
const BaseModel = require('../../../BaseModel');

class FormEditor extends Editor {

    /*constructor(data, pageEditor) {
        super(data, pageEditor);
    }*/

    newFieldData(params) {
        const name = params['name'];
        if (this.getColItemData('fields', name)) {
            throw new Error(`field ${name} already exists`);
        }
        const data = eval(`qforms.${params['class']}Editor.createData(params);`);
        this.addModelData('fields', data);
        return data;
    }

    async moveFieldUp(params) {
        this.data.fields = qforms.Helper.moveObjProp(this.data.fields, params.field, -1);
        // await this.parent.save();
        return 'ok';
    }

    async moveFieldDown(params) {
        this.data.fields = qforms.Helper.moveObjProp(this.data.fields, params.field, 1);
        // await this.parent.save();
        return 'ok';
    }

    /*createDataSourceEditor(name) {
        const data = this.getColItemData('dataSources', name);
        return eval(`new qforms.${BaseModel.getClassName(data)}Editor(data, this)`);
    }*/

    createFieldEditor(name) {
        const data = this.getColItemData('fields', name);
        return eval(`new qforms.${BaseModel.getClassName(data)}Editor(data, this)`);
    }

    createActionEditor(name) {
        return new qforms.ActionEditor(this.getColItemData('actions', name), this);
    }

    async newActionData(params) {
        if (!params.name) throw new Error('no name');
        const name = params.name;
        if (this.getColItemData('actions', name)) {
            throw new Error(`action ${name} already exists`);
        }
        const data = qforms.ActionEditor.createData(params);
        this.addModelData('actions', data);
        return data;
    }

    async createJs(params) {
        const templateFilePath = path.join(__dirname, 'Form.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('js');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page  : this.parent.getName(),
            form  : this.getName(),
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
        return path.join(collectionDirPath, this.getName());
    }

    newDataSourceData(params) {
        const name   = params['name'];
        const _class = params['class'];
        if (this.getColItemData('dataSources', name)) {
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

    /*getAppEditor() {
        return this.parent.getAppEditor();
    }*/

}

module.exports = FormEditor;
