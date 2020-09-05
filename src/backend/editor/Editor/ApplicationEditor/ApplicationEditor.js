'use strict';

const path    = require('path');
const qforms = require('../../../qforms');
const Editor = require('../Editor');
const DatabaseEditor = require('../DatabaseEditor/DatabaseEditor');

const MySqlDatabaseEditor = require('../DatabaseEditor/MySqlDatabaseEditor/MySqlDatabaseEditor');
const PostgreSqlDatabaseEditor = require('../DatabaseEditor/PostgreSqlDatabaseEditor/PostgreSqlDatabaseEditor');

class ApplicationEditor extends Editor {

    constructor(appFile, hostApp, env) {
        if (!hostApp) throw new Error('no hostApp');
        if (!env) throw new Error('ApplicationEditor.constructor: no env');
        super(appFile.data);
        this.appFile            = appFile;
        this.hostApp            = hostApp;
        this.appInfo            = qforms.Helper.getAppInfoFromData(appFile.filePath, appFile.data, env);
        this.name               = this.getAttr('name');
        this.defaultEjsFilePath = path.join(
            this.hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/ApplicationController/view/ApplicationView.ejs'
        );
        this.defaultCssFilePath = path.join(
            this.hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/ApplicationController/view/ApplicationView.css'
        );
    }

    static createData(params) {
        return {
            '@class'     : 'Application',
            '@attributes': {
                formatVersion : '0.1',
                name          : params.name,
                caption       : params.name,
                authentication: 'false',
                user          : 'admin',
                password      : 'admin',
                lang          : 'en',
                theme         : 'standard'
            },
            env      : {},
            databases: {},
            pageLinks: {}
        };
    }

    static async createAppFile(appFilePath, params) {
        const data = ApplicationEditor.createData(params);
        const appFile = new qforms.JsonFile(appFilePath, data);
        await appFile.create();
        return appFile;
    }

    async createPage(params) {
        const pagesDirPath   = path.join(this.appInfo.dirPath, 'pages');
        const pageDirPath    = path.join(pagesDirPath, params.name);
        const pageFilePath   = path.join(pageDirPath , params.name + '.json');
        await qforms.Helper.createDirIfNotExists(pagesDirPath);
        await qforms.Helper.createDirIfNotExists(pageDirPath);
        const pageFile = new qforms.JsonFile(pageFilePath, qforms.PageEditor.createData(params));
        await pageFile.create();
        this.newPageLink(params);
        await this.save();
        return new qforms.PageEditor(this, pageFile);
    }

    async save() {
        console.log('ApplicationEditor.save');
        await this.appFile.save();
    }

    createPageLinkEditor(name) {
        return new qforms.PageLinkEditor(this, name, this.getData('pageLinks', name));
    }

    async setAttr(name, value) {
        console.log('ApplicationEditor.setAttr');
        super.setAttr(name, value);
        await this.appFile.save();
    }

    async removePage(name) {
        await this.deletePage(name);
        await this.save();
    }

    async getPageByFileName(relFilePath) {
        const pageFilePath = path.join(this.appInfo.dirPath, relFilePath);
        const pageFile = new qforms.JsonFile(pageFilePath);
        await pageFile.read();
        return new qforms.PageEditor(this, pageFile);
    }

    async getPage(name) {
        const pageLinkEditor = this.createPageLinkEditor(name);
        const relFilePath = pageLinkEditor.getAttr('fileName');
        return await this.getPageByFileName(relFilePath);
    }

    async createEjs(params) {
        console.log('ApplicationEditor.createEjs');
        const customEjsFilePath = await this.getCustomFilePath('ejs');
        return this.createFileByReplace(customEjsFilePath, this.defaultEjsFilePath, this.getViewName(), this.name, null);
    }

    async createCss(params) {
        console.log('ApplicationEditor.createCss');
        const customCssFilePath = await this.getCustomFilePath('css');
        const emptyTemplate = '.' + this.name + ' {\n}';
        return this.createFileByReplace(customCssFilePath, this.defaultCssFilePath, this.getViewName(), this.name, emptyTemplate);
    }

    async createJs(params) {
        const customJsFilePath = await this.getCustomFilePath('js');
        const templateFilePath = path.join(__dirname, 'Application.js.ejs');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            application: this.getAttr('name'),
            _class     : this.constructor.name.replace('Editor', '')
        });
        return js;
    }

    async getCustomDirPath() {
        return this.appInfo.dirPath;
    }

    async getCustomFilePath(ext) {
        console.log('ApplicationEditor.getCustomFilePath');
        return path.join(this.appInfo.dirPath, this.name + '.' + ext);
    }

    createDataSourceEditor(name) {
        const dataSourceData = this.getData('dataSources', 'name');
        const className = dataSourceData['@class'];
        const DataSourceClass = qforms[`${className}Editor`];
        return new DataSourceClass(this, name, dataSourceData);
    }

    movePageLinkUp(name) {
        this.data.pageLinks = qforms.Helper.moveObjProp(this.data.pageLinks, name, -1);
    }

    movePageLinkDown(name) {
        this.data.pageLinks = qforms.Helper.moveObjProp(this.data.pageLinks, name, 1);
    }

    newDatabase(params) {
        const name = params['name'];
        if (!this.data.databases) {
            this.data.databases = {};
        }
        if (this.data.databases[name]) {
            throw new Error(`database ${name} already exists`);
        }
        if (params._class === 'MySqlDatabase') {
            return this.data.databases[name] = MySqlDatabaseEditor.createData(params);
        } else if (params._class === 'PostgreSqlDatabase') {
            return this.data.databases[name] = PostgreSqlDatabaseEditor.createData(params);
        } else {
            throw new Error(`unknown database class ${params._class}`);
        }
    }

    getDatabaseData(name) {
        if (!this.data.databases[name]) throw new Error(`no database: ${name}`);
        return this.data.databases[name];
    }

    createDatabaseEditor(name) {
        return new DatabaseEditor(this.getDatabaseData(name), this);
    }

    newPageLink(params) {
        const name = params.name;
        if (!this.data.pageLinks) {
            this.data.pageLinks = {};
        }
        if (this.data.pageLinks[name]) {
            throw new Error('Page Link {name} already exists.'.replace('{name}', name));
        }
        return this.data.pageLinks[params.name] = qforms.PageLinkEditor.createData(params);
    }

    deleteDatabase(name) {
        if (!name) throw new Error('no name');
        delete this.data.databases[name];
    }

    async deletePage(name) {
        const pageFilePath = path.join(
            this.appInfo.dirPath,
            this.createPageLinkEditor(name).getAttr('fileName')
        );
        await qforms.Helper.fsUnlink(pageFilePath);
        delete this.data.pageLinks[name];
    }

    newDataSource(params) {
        const name   = params['name'];
        const _class = params['class'];
        if (!this.data.dataSources) {
            this.data.dataSources = {};
        }
        if (this.data.dataSources[name]) {
            throw new Error('Data Source {name} already exist.'.replace('{name}', name));
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
        return this.data.dataSources[name] = data;
    }

    deleteDataSource(dataSource) {
        delete this.data.dataSources[dataSource];
    }

}

module.exports = ApplicationEditor;
