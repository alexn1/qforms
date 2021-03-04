const path = require('path');
const qforms = require('../../../qforms');
const Editor = require('../Editor');

class FormEditor extends Editor {

    constructor(pageEditor, name, data) {
        super(data, pageEditor);
        this.name    = name;
        this.colName = 'forms';
    }

    newField(params) {
        const name = params['name'];
        if (!this.data.fields) {
            this.data.fields = {};
        }
        if (this.data.fields[name]) {
            throw new Error('Field {name} already exist.'.replace('{name}', name));
        }
        return this.data.fields[name] = eval('qforms.{class}Editor.createData(params);'.replace('{class}', params['class']));
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
        const dataSourceData  = this.data.dataSources[name];
        return eval('new qforms.{class}Editor(this, name, dataSourceData)'.replace('{class}', dataSourceData['@class']));
    }

    getFieldData(name) {
        if (!this.data.fields[name]) throw new Error(`no field: ${name}`);
        return this.data.fields[name];
    }

    getControlData(name) {
        if (!this.data.controls[name]) throw new Error(`no control: ${name}`);
        return this.data.controls[name];
    }

    getActionData(name) {
        if (!this.data.actions[name]) throw new Error(`no action: ${name}`);
        return this.data.actions[name];
    }

    getField(name) {
        const fieldData = this.getFieldData(name);
        return eval(`new qforms.${fieldData['@class']}Editor(this, name, fieldData)`);
    }

    createControlEditor(name) {
        const controlData = this.getControlData(name);
        return eval(`new qforms.${controlData['@class']}Editor(this, name, controlData)`);
    }

    createActionEditor(name) {
        return new qforms.ActionEditor(this.getActionData(name), this);
    }

    async removeField(name) {
        delete this.data.fields[name];
        return this.parent.save();
    }

    async removeAction(name) {
        delete this.data.actions[name];
        return this.parent.save();
    }

    async createControl(params) {
        const name = params.name;
        if (!this.data.controls) {
            this.data.controls = {};
        }
        if (this.data.controls[name]) {
            throw new Error('Control {name} already exist.'.repalce('{name}', name));
        }
        const controlData = this.data.controls[name] = eval('qforms.{class}Editor.createData(params);'.replace('{class}', params['class']));
        await this.parent.save();
        return controlData;
    }

    async createAction(params) {
        if (!params.name) throw new Error('no name');
        const name = params.name;
        if (!this.data.actions) {
            this.data.actions = {};
        }
        if (this.data.actions[name]) {
            throw new Error(`action ${name} already exist`);
        }
        const data = this.data.actions[name] = qforms.ActionEditor.createData(params);
        await this.parent.save();
        return data;
    }

    // newControl(params) {
    //     const name = params.name;
    //     if (!this.data.controls) {
    //         this.data.controls = {};
    //     }
    //     if (this.data.controls[name]) {
    //         throw new Error('Control {name} already exist.'.repalce('{name}', name));
    //     }
    //     return this.data.controls[name] = eval('qforms.{class}Editor.createData(params);'.replace('{class}', params['class']));
    // }

    /*async removeControl(name) {
        delete this.data.controls[name];
        return await this.parent.save();
    }*/

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
        const dirPath = path.join(customDirPath, 'forms');
        // await qforms.Helper.createDirIfNotExists(dirPath);
        return dirPath;
    }

    async getCustomDirPath() {
        const collectionDirPath = await this.getCollectionDirPath();
        const dirPath = path.join(collectionDirPath, this.name);
        // await qforms.Helper.createDirIfNotExists(dirPath);
        return dirPath;
    }

    newDataSourceData(params) {
        const name   = params['name'];
        const _class = params['class'];
        if (!this.data.dataSources) {
            this.data.dataSources = {};
        }
        if (this.data.dataSources[name]) {
            throw new Error(`Data Source ${name} already exist.`);
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
        this.data.dataSources[name] = data;
        return this.createDataSourceEditor(name);
    }

    /*newDataSourceKeyColumn(params) {
        const dataSource = params['dataSource'];
        const name       = params['name'];
        if (!this.data.dataSources[dataSource].keyColumns) {
            this.data.dataSources[dataSource].keyColumns = {};
        }
        if (this.data.dataSources[dataSource].keyColumns[name]) {
            throw new Error(`Key Column ${name} already exist.`);
        }
        return this.data.dataSources[dataSource].keyColumns[name] = {
            '@class'     : 'KeyColumn',
            '@attributes': {
                'name': name
            }
        };
    }*/

    deleteFormDataSource(dataSource) {
        delete this.data.dataSources[dataSource];
    }

    deleteFormDataSourceKeyColumn(dataSource, keyColumn) {
        delete this.data.dataSources[dataSource].keyColumns[keyColumn];
    }

    deleteFormDataSourceParentKeyColumn(dataSource, parentKeyColumn) {
        delete this.data.dataSources[dataSource].parentKeyColumns[parentKeyColumn];
    }

    getAppEditor() {
        return this.parent.getAppEditor();
    }

}

module.exports = FormEditor;
