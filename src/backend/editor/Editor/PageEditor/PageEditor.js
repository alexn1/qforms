const path = require('path');
const _    = require('underscore');
const qforms = require('../../../qforms');
const Editor = require('../Editor');

class PageEditor extends Editor {

    constructor(appEditor, pageFile) {
        super(pageFile.data, appEditor);
        this.appEditor = appEditor;
        this.pageFile  = pageFile;
        this.name      = this.getAttr('name');
    }

    static createData(params) {
        return {
            '@class'     :'Page',
            '@attributes': {
                formatVersion: '0.1',
                name     : params['name'],
                caption  : params['caption'] ? params['caption'] : params['name']
            },
            dataSources: {},
            forms      : {},

            dataSources2: [],
            forms2      : [],
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
        if (!this.data.forms) {
            this.data.forms = {};
        }
        if (!this.data.forms2) {
            this.data.forms2 = [];
        }
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
        // this.data.forms[name] = data;
        this.addModelData('forms2', data);
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
        const formData = this.getModelData('forms', name);
        return eval(`new qforms.${formData['@class']}Editor(this, name, formData)`);
    }

    createDataSourceEditor(name) {
        const dataSourceData = this.getModelData('dataSources', name);
        return eval(`new qforms.${dataSourceData['@class']}Editor(this, name, dataSourceData)`);
    }

    removeForm(name) {
        this.deleteForm(name);
        return this.save();
    }

    async createJs(params) {
        const templateFilePath = path.join(__dirname, 'Page.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('js');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page  : this.getAttr('name'),
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
        if (!this.data.dataSources) {
            this.data.dataSources = {};
        }
        if (!this.data.dataSources2) {
            this.data.dataSources2 = [];
        }
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
        // this.data.dataSources[name] = data;
        this.addModelData('dataSources2', data);
        return data;
    }

    deleteForm(name) {
        delete this.data.forms[name];
    }

    deleteDataSource(dataSource) {
        delete this.data.dataSources[dataSource];
    }

    getAppEditor() {
        return this.appEditor;
    }

}

module.exports = PageEditor;
