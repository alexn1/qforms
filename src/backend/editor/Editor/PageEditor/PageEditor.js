const path = require('path');
const _    = require('underscore');
const qforms = require('../../../qforms');
const Editor = require('../Editor');
const BaseModel = require('../../../BaseModel');

class PageEditor extends Editor {

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

    constructor(appEditor, pageFile) {
        super(pageFile.data, appEditor);
        this.appEditor = appEditor;
        this.pageFile  = pageFile;
    }

    async setAttr(name, value) {
        console.log('PageEditor.setAttr', name, value);
        if (name === 'name') {
            const pageLinkEditor = this.appEditor.createPageLinkEditor(this.getName());
            await pageLinkEditor.setAttr(name, value);
        }
        await super.setAttr(name, value);
    }

    async moveFormUp(params) {
        this.data.forms = qforms.Helper.moveObjProp(this.data.forms, params.form, -1);
        return 'ok';
    }

    async save() {
        await this.pageFile.save();
    }

    async moveFormDown(params) {
        this.data.forms = qforms.Helper.moveObjProp(this.data.forms, params.form, 1);
        return 'ok';
    }

    newFormData(params) {
        const name   = params['name'];
        const _class = params['class'];
        if (this.getColItemData('forms', name)) {
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
                        {form: name},
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
        return formData;
    }

    createFormEditor(name) {
        const data = this.getColItemData('forms', name);
        return eval(`new qforms.${BaseModel.getClassName(data)}Editor(data, this)`);
    }

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
        return path.join(customDirPath, 'pages', this.getName());
    }

    newDataSourceData(params) {
        const name   = params['name'];
        const _class = params['class'];
        if (this.getColItemData('dataSources', name)) {
            throw new Error(`DataSource ${name} already exists`);
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

}

module.exports = PageEditor;
