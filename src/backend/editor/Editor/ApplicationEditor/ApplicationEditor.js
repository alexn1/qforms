const path = require('path');

const qforms                   = require('../../../qforms');
const Editor                   = require('../Editor');
const DatabaseEditor           = require('../DatabaseEditor/DatabaseEditor');
const MySqlDatabaseEditor      = require('../DatabaseEditor/MySqlDatabaseEditor/MySqlDatabaseEditor');
const PostgreSqlDatabaseEditor = require('../DatabaseEditor/PostgreSqlDatabaseEditor/PostgreSqlDatabaseEditor');

class ApplicationEditor extends Editor {

    constructor(appFile, hostApp, env) {
        if (!hostApp) throw new Error('no hostApp');
        if (!env) throw new Error('ApplicationEditor.constructor: no env');
        super(appFile.data);
        this.appFile  = appFile;
        this.hostApp  = hostApp;
        this.appInfo  = qforms.Helper.getAppInfoFromData(appFile.filePath, appFile.data, env);
        this.name     = this.getAttr('name');
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
            env        : {},
            // databases  : {},
            // dataSources: {},
            // pageLinks  : {},
            databases  : [],
            dataSources: [],
            pageLinks  : [],
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
        // await qforms.Helper.createDirIfNotExists(pagesDirPath);
        // await qforms.Helper.createDirIfNotExists(pageDirPath);
        const pageFile = new qforms.JsonFile(pageFilePath, qforms.PageEditor.createData(params));
        await pageFile.create();
        this.newPageLinkData(params);
        await this.save();
        return new qforms.PageEditor(this, pageFile);
    }

    async save() {
        console.log('ApplicationEditor.save');
        await this.appFile.save();
    }

    createPageLinkEditor(name) {
        return new qforms.PageLinkEditor(this, name, this.getModelData('pageLinks', name));
    }

    async setAttr(name, value) {
        console.log('ApplicationEditor.setAttr');
        await super.setAttr(name, value);
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

    createDataSourceEditor(name) {
        const dataSourceData = this.getModelData('dataSources', name);
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

    newDatabaseData(params) {
        const name = params['name'];
        /*if (!this.data.databases) {
            this.data.databases = {};
        }
        if (!this.data.databases2) {
            this.data.databases2 = [];
        }*/
        if (this.getModelData('databases', name)) {
            throw new Error(`database ${name} already exists`);
        }

        let data;
        if (params._class === 'MySqlDatabase') {
            data = MySqlDatabaseEditor.createData(params);
        } else if (params._class === 'PostgreSqlDatabase') {
            data = PostgreSqlDatabaseEditor.createData(params);
        } else {
            throw new Error(`unknown database class ${params._class}`);
        }
        this.addModelData('databases', data);
        return data;
    }

    createDatabaseEditor(name) {
        return new DatabaseEditor(this.getModelData('databases', name), this);
    }

    newPageLinkData(params) {
        const name = params.name;
        /*if (!this.data.pageLinks) {
            this.data.pageLinks = {};
        }*/
        /*if (!this.data.pageLinks2) {
            this.data.pageLinks2 = [];
        }*/
        if (this.getModelData('pageLinks', name)) {
            throw new Error(`Page Link ${name} already exists.`);
        }
        const data = qforms.PageLinkEditor.createData(params);
        this.addModelData('pageLinks', data);
        return data;
    }

    async deletePage(name) {
        const pageFilePath = path.join(
            this.appInfo.dirPath,
            this.createPageLinkEditor(name).getAttr('fileName')
        );
        await qforms.Helper.fsUnlink(pageFilePath);
        delete this.data.pageLinks[name];
    }

    newDataSourceData(params) {
        const name   = params['name'];
        const _class = params['class'];
        /*if (!this.data.dataSources) {
            this.data.dataSources = {};
        }*/
        /*if (!this.data.dataSources2) {
            this.data.dataSources2 = [];
        }*/
        if (this.getModelData('dataSources', name)) {
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
        this.addModelData('dataSources', data);
        return data;
    }

    deleteDataSource(dataSource) {
        delete this.data.dataSources[dataSource];
    }

}

module.exports = ApplicationEditor;
