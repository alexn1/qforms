const path = require('path');

const Editor                   = require('../Editor');
const DatabaseEditor           = require('../DatabaseEditor/DatabaseEditor');
const MySqlDatabaseEditor      = require('../DatabaseEditor/MySqlDatabaseEditor/MySqlDatabaseEditor');
const PostgreSqlDatabaseEditor = require('../DatabaseEditor/PostgreSqlDatabaseEditor/PostgreSqlDatabaseEditor');
const Helper = require('../../../Helper');
const JsonFile = require('../../../JsonFile');
const PageEditor = require('../PageEditor/PageEditor');
const PageLinkEditor = require('../PageLinkEditor/PageLinkEditor');
const DataSourceEditor = require('../DataSourceEditor/DataSourceEditor');
const SqlDataSourceEditor = require('../DataSourceEditor/SqlDataSourceEditor/SqlDataSourceEditor');
const Application = require('../../../viewer/Model/Application/Application');

class ApplicationEditor extends Editor {

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
            databases  : [],
            dataSources: [],
            actions    : [],
            pageLinks  : [],
        };
    }

    constructor(appFile, hostApp, env) {
        if (!hostApp) throw new Error('no hostApp');
        if (!env) throw new Error('ApplicationEditor.constructor: no env');
        super(appFile.data);
        this.appFile  = appFile;
        this.hostApp  = hostApp;
        this.appInfo  = Application.getAppInfoFromData(appFile.filePath, appFile.data, env);
    }

    static async createAppFile(appFilePath, params) {
        const data = ApplicationEditor.createData(params);
        const appFile = new JsonFile(appFilePath, data);
        await appFile.create();
        return appFile;
    }

    async newPageAndPageLinkData(params) {
        const pagesDirPath   = path.join(this.appInfo.dirPath, 'pages');
        const pageDirPath    = path.join(pagesDirPath, params.name);
        const pageFilePath   = path.join(pageDirPath , params.name + '.json');
        const pageData = PageEditor.createData(params);
        const pageFile = new JsonFile(pageFilePath, pageData);
        await pageFile.create();
        const pageLinkData = this.newPageLinkData(params);
        return {
            page    : pageData,
            pageLink: pageLinkData
        };
    }

    async save() {
        console.log('ApplicationEditor.save');
        await this.appFile.save();
    }

    createPageLinkEditor(name) {
        return new PageLinkEditor(this.getColItemData('pageLinks', name), this);
    }

    async removePageFile(name) {
        const pageFilePath = path.join(this.appInfo.dirPath, this.createPageLinkEditor(name).getAttr('fileName'));
        await Helper.fsUnlink(pageFilePath);
    }

    async createPageEditor(relFilePath) {
        const pageFilePath = path.join(this.appInfo.dirPath, relFilePath);
        const pageFile = new JsonFile(pageFilePath);
        await pageFile.read();
        return new PageEditor(this, pageFile);
    }

    async getPage(name) {
        const pageLinkEditor = this.createPageLinkEditor(name);
        const relFilePath = pageLinkEditor.getAttr('fileName');
        return await this.createPageEditor(relFilePath);
    }

    async createJs(params) {
        const customJsFilePath = await this.getCustomFilePath('js');
        const templateFilePath = path.join(__dirname, 'Application.js.ejs');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            application: this.getName(),
            _class     : this.constructor.name.replace('Editor', '')
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
        return this.appInfo.dirPath;
    }

    movePageLinkUp(name) {
        this.moveDataColItem('pageLinks', name, -1);
    }

    movePageLinkDown(name) {
        this.moveDataColItem('pageLinks', name, 1);
    }

    newDatabaseData(params) {
        const name = params['name'];
        if (this.getColItemData('databases', name)) {
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
        return new DatabaseEditor(this.getColItemData('databases', name), this);
    }

    newPageLinkData(params) {
        const name = params.name;
        if (this.getColItemData('pageLinks', name)) {
            throw new Error(`Page Link ${name} already exists.`);
        }
        const data = PageLinkEditor.createData(params);
        this.addModelData('pageLinks', data);
        return data;
    }

    newDataSourceData(params) {
        const name   = params['name'];
        const _class = params['class'];
        if (this.getColItemData('dataSources', name)) {
            throw new Error(`Data Source ${name} already exist.`);
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

module.exports = ApplicationEditor;
