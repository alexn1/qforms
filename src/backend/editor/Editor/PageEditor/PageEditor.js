'use strict';

const path = require('path');
const _    = require('underscore');
const qforms = require('../../../qforms');
const Editor = require('../Editor');

class PageEditor extends Editor {

    constructor(appEditor, pageFile) {
        super(pageFile.data, appEditor);
        this.appEditor          = appEditor;
        this.pageFile           = pageFile;
        this.name               = this.getAttr('name');
        this.defaultEjsFilePath = path.join(
            this.getAppEditor().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/PageController/view/PageView.ejs'
        );
        this.defaultCssFilePath = path.join(
            this.getAppEditor().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/PageController/view/PageView.css'
        );
    }

    static createData(params) {
        return {
            '@class'     :'Page',
            '@attributes': {
                formatVersion: '0.1',
                name     : params['name'],
                caption  : params['caption'] ? params['caption'] : params['name'],
                width    : params['width']   ? params['width']   : '640',
                height   : params['height']  ? params['height']  : '480'
            },
            dataSources: {},
            forms      : {}
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

    newForm(params) {
        const name   = params['name'];
        const _class = params['class'];
        if (!this.data.forms) {
            this.data.forms = {};
        }
        if (this.data.forms[name]) {
            throw new Error('Form {name} already exists.'.replace('{name}', name));
        }
        let data;
        switch (_class) {
            case 'TableForm':
                data = qforms.TableFormEditor.createData(params);
                break;
            case 'RowForm':
                data = qforms.RowFormEditor.createData(params);
                break;
            case 'TreeForm':
                data = qforms.TreeFormEditor.createData(params);
                break;
            default:
                throw new Error('unknown form class');
        }
        this.data.forms[name] = data;
        return this.getForm(name);
    }

    async createForm(params) {
        const name = params.name;
        const formEditor = this.newForm(params);
        // fields
        if (params.fields) {
            for (const fieldName in params.fields) {
                formEditor.newField(_.extend(
                    {form: name},
                    params.fields[fieldName]
                ));
            }
        }
        // dataSources
        if (params.dataSources) {
            for (const dataSourceName in params.dataSources) {
                const dataSource = params.dataSources[dataSourceName];
                formEditor.newDataSource(
                    _.extend(
                        {form:name},
                        dataSource
                    )
                );
                // keyColumns
                if (dataSource.keyColumns) {
                    for (const keyColumnName in dataSource.keyColumns) {
                        const keyColumn = dataSource.keyColumns[keyColumnName];
                        formEditor.newDataSourceKeyColumn(
                            _.extend(
                                {'form':name, 'dataSource':dataSourceName},
                                keyColumn
                            )
                        );
                    }
                }
            }
        }
        await this.save();
        const formEditor2 = this.getForm(name);
        return formEditor2;
    }

    getForm(name) {
        const formData = this.data.forms[name];
        return eval('new qforms.{class}Editor(this, name, formData)'.replace('{class}', formData['@class']));
    }

    createDataSourceEditor(name) {
        const dataSourceData = this.data.dataSources[name];
        return eval('new qforms.{class}Editor(this, name, dataSourceData)'.replace('{class}', dataSourceData['@class']));
    }

    removeForm(name) {
        this.deleteForm(name);
        return this.save();
    }

    async createEjs(params) {
        const customEjsFilePath = await this.getCustomFilePath('ejs');
        const ejs = await this.createFileByReplace(customEjsFilePath, this.defaultEjsFilePath, this.getViewName(), params.page, null);
        return ejs;
    }

    async createCss(params) {
        const customCssFilePath = await this.getCustomFilePath('css');
        const emptyTemplate = '.' + params.page + ' \n';
        const css = await this.createFileByReplace(customCssFilePath, this.defaultCssFilePath, this.getViewName(), params.page, emptyTemplate);
        return css;
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
        const dirPath = path.join(customDirPath, 'pages', this.name);
        await qforms.Helper.createDirIfNotExists(dirPath);
        return dirPath;
    }

    async getCustomFilePath(ext) {
        const customDirPath = await this.getCustomDirPath();
        return path.join(customDirPath, this.name + '.' + ext);
    }

    newDataSource(params) {
        const name   = params['name'];
        const _class = params['class'];
        if (!this.data.dataSources) {
            this.data.dataSources = {};
        }
        if (this.data.dataSources[name]) {
            throw new Error(`DataSource ${name} already exist`);
        }
        let data;
        switch (_class) {
            case 'DataSource':
                data = qforms.DataSourceEditor.create(params);
                break;
            case 'SqlDataSource':
                data = qforms.SqlDataSourceEditor.create(params);
                break;
            default:
                throw new Error(`Unknown data source class: ${_class}`);
        }
        return this.data.dataSources[name] = data;
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
