const path = require('path');
const _    = require('underscore');
const qforms = require('../../../qforms');
const Editor = require('../Editor');
const BaseModel = require('../../../BaseModel');

class PageEditor extends Editor {

    constructor(appEditor, pageFile) {
        super(pageFile.data, appEditor);
        this.appEditor = appEditor;
        this.pageFile  = pageFile;
        this.name      = this.getName();
    }

    static createData(params) {
        return {
            '@class'     :'Page',
            '@attributes': {
                formatVersion: '0.1',
                name     : params['name'],
                caption  : params['caption'] ? params['caption'] : params['name']
            },
            dataSources: [],
            forms      : [],
        };
    }

    async setAttr(name, value) {
        console.log('PageEditor.setAttr', name, value);
        if (name === 'name') {
            const pageLinkEditor = this.appEditor.createPageLinkEditor(this.name);
            await pageLinkEditor.setAttr(name, value);
        }
        await super.setAttr(name, value);
    }

    async moveFormUp(params) {
        this.data.forms = qforms.Helper.moveObjProp(this.data.forms, params.form, -1);
        await this.save();
        return 'ok';
    }

    async save() {
        return await this.pageFile.save();
    }

    async moveFormDown(params) {
        this.data.forms = qforms.Helper.moveObjProp(this.data.forms, params.form, 1);
        await this.save();
        return 'ok';
    }

    newFormData(params) {
        const name   = params['name'];
        const _class = params['class'];
        if (this.getModelData('forms', name)) {
            throw new Error(`Form ${name} already exists.`);
        }
        let data;
        switch (_class) {
            case 'TableForm':
                data = qforms.TableFormEditor.createData(params);
                break;
            case 'RowForm':
                data = qforms.RowFormEditor.createData(params);
                break;
            default:
                throw new Error(`unknown form class: ${_class}`);
        }
        this.addModelData('forms', data);
        return data;
    }

    async createForm(params) {
        const name = params.name;
        const formData = this.newFormData(params);
        const formEditor = this.createFormEditor(name);

        // fields
        if (params.fields) {
            for (const fieldName in params.fields) {
                formEditor.newFieldData(_.extend(
                    {form: name},
                    params.fields[fieldName]
                ));
            }
        }

        // dataSources
        if (params.dataSources) {
            for (const dataSourceName in params.dataSources) {
                const dataSource = params.dataSources[dataSourceName];
                formEditor.newDataSourceData(
                    _.extend(
                        {form:name},
                        dataSource
                    )
                );
                const dataSourceEditor = formEditor.createDataSourceEditor(dataSourceName);
                // keyColumns
                if (dataSource.keyColumns) {
                    for (const keyColumnName in dataSource.keyColumns) {
                        const keyColumn = dataSource.keyColumns[keyColumnName];
                        dataSourceEditor.newKeyColumnData(_.extend(
                            {
                                form      : name,
                                dataSource: dataSourceName
                            },
                            keyColumn
                        ));
                    }
                }
            }
        }
        await this.save();
        return formEditor;
    }

    createFormEditor(name) {
        const data = this.getModelData('forms', name);
        return eval(`new qforms.${BaseModel.getClassName(data)}Editor(data, this)`);
    }

    /*createDataSourceEditor(name) {
        const data = this.getModelData('dataSources', name);
        return eval(`new qforms.${BaseModel.getClassName(data)}Editor(data, this)`);
    }*/

    async createJs(params) {
        const templateFilePath = path.join(__dirname, 'Page.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('js');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page  : this.getName(),
            _class: this.constructor.name.replace('Editor', '')
        });
        return js;
    }

    async getCustomDirPath() {
        console.log('PageEditor.getCustomDirPath');
        const customDirPath = await this.parent.getCustomDirPath();
        return path.join(customDirPath, 'pages', this.name);
    }

    newDataSourceData(params) {
        const name   = params['name'];
        const _class = params['class'];
        if (this.getModelData('dataSources', name)) {
            throw new Error(`DataSource ${name} already exist`);
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
        return this.appEditor;
    }

}

module.exports = PageEditor;
