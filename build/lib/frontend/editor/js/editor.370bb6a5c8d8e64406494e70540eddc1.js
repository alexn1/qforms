class EditorFrontHostApp extends FrontHostApp {
    constructor(data, runAppLink) {
        console.log('EditorFrontHostApp.constructor');
        super(data);
        EditorFrontHostApp.editorApp = this;
        // this.data = data;
        this.runAppLink = runAppLink;
        this.view = null;
        this.actionList = null;
        this.treeWidget2 = null;
        this.pg = null;                 // property grid
        this.items = null;              // treeWidget2 items
        this.tabWidget = null;
        this.documents = [];
        this.modal = null;
    }

    run() {
        console.log('EditorFrontHostApp.run', this.data);

        // app
        const app = new Application(this.data);
        app.init();
        // console.log('app:', app);

        // application controller
        const applicationController = new ApplicationController(app, this);
        applicationController.init();
        this.items = [applicationController];

        // view
        this.view = Helper.createReactComponent(document.querySelector('.editor__root'), EditorFrontHostAppView, {ctrl: this});
    }

    deinit() {
    }
    onItemOpen2 = async item => {
        console.log('EditorFrontHostApp.onItemOpen2', item.getTitle());
        // console.log('parent:', item.view.parent);
        if (item instanceof PageLinkController && !item.hasPage()) {
            await item.loadPage();
        }
    }
    onItemSelect2 = async item => {
        console.log('EditorFrontHostApp.onItemSelect2', item ? item.getTitle() : null);
        if (item instanceof ModelController) {
            if (item instanceof PageLinkController && !item.hasPage()) {
                await item.loadPage();
            }
            this.fillActions(item);
            this.fillPropertyGrid(item);
        } else {
            this.clearActions();
            this.endEdit();
        }
    }

    fillPropertyGrid(ctrl) {
        const propList = ctrl.getPropList();
        this.beginEdit(propList['list'], propList['options']);
    }

    onPropertyGrid2Change = (name, value) => {
        console.log('EditorFrontHostApp.onPropertyGrid2Change', name, value);
        const controller = this.treeWidget2.getSelectedItem();
        // console.log('controller', controller);
        controller.setProperty(name, value);
    }

    beginEdit(obj, options) {
        console.log('EditorFrontHostApp.beginEdit', obj, options);
        this.pg.setState({object: {obj, options}});
    }

    endEdit() {
        console.log('EditorFrontHostApp.endEdit');
        this.pg.setState({object: null});
    }

    static async fetchPageData(fileName) {
        console.log('EditorFrontHostApp.fetchPageData', fileName);
        return await FrontHostApp.doHttpRequest({
            controller: 'Page',
            action    : 'get',
            params    : Helper.encodeObject({fileName})
        });
    }

    fillActions(item) {
        // console.log('EditorFrontHostApp.fillActions');
        this.actionList.setState({item});
    }
    clearActions() {
        // console.log('EditorFrontHostApp.clearActions');
        this.actionList.setState({item: null});
    }

    onItemDoubleClick2 = async item => {
        console.log('EditorFrontHostApp.onItemDoubleClick2', item.getTitle());
        const controller = item instanceof PageLinkController ? item.pageController : item;
        if (!controller || !(controller instanceof DocumentController)) return;
        await this.openDocument(controller);
    }
    async openDocument(controller) {
        console.log('EditorFrontHostApp.openDocument', controller.getTitle());
        let document = this.findDocument(controller);
        if (!document) {
            document = await controller.createDocument();
            this.documents.push(document);
            // console.log('document:', document);
        }
        this.tabWidget.state.active = this.documents.indexOf(document);
        await this.view.rerender();
    }
    findDocument(controller) {
        return this.documents.find(document => document.controller === controller) || null;
    }
    onDocumentClose = i => {
        console.log('EditorFrontHostApp.onDocumentClose', i, this.tabWidget.state.active);
        const document = this.documents[i];
        const activeDocument = this.documents[this.tabWidget.state.active];
        this.documents.splice(i, 1);
        document.controller.onDocumentClose();
        if (document === activeDocument) {
            if (this.documents.length) {
                if (this.tabWidget.state.active >= this.documents.length) {
                    this.tabWidget.state.active = this.documents.length - 1;
                }
            } else {
                this.tabWidget.state.active = null;
            }
        } else {
            this.tabWidget.state.active = this.documents.indexOf(activeDocument);
        }
        this.view.rerender();
    }
    async openModal(modalController) {
        console.log('EditorFrontHostApp.openModal');
        this.modal = modalController;
        await this.view.rerender();
    }
    async onModalClose() {
        console.log('EditorFrontHostApp.onModalClose');
        this.modal = null;
        await this.view.rerender();
    }
    onActionClick = async actionName => {
        console.log('EditorFrontHostApp.onActionClick', actionName);
        const item = this.treeWidget2.getSelectedItem();
        // console.log('item', item);
        const controller = item instanceof PageLinkController ? item.pageController : item;
        await controller.doAction(actionName);
    }
}


class FormWizard {
    static create(params) {
        console.log('FormWizard.create', params);
        switch (params.model.database.getClassName()) {
            case 'MySqlDatabase'     : return new MySqlFormWizard(params);
            case 'PostgreSqlDatabase': return new PostgreSqlFormWizard(params);
            default: throw new Error(`unknown database class: ${params.model.database.getClassName()}`);
        }
    }

    constructor(params) {
        console.log('FormWizard.constructor', params);
        this.params        = params;
        this.model         = params.model;
        this.databaseName  = params.model.database.getName();
        this.tableName     = params.model.getName();
        this.tableColumns  = Object.keys(params.model.data.columns).map(name => params.model.data.columns[name]['@attributes']);
    }

    getDataSources() {
        return {
            default: {
                class     : 'SqlDataSource',
                name      : 'default',
                database  : this.databaseName,
                table     : this.tableName,
                limit     : this.params.className === 'TableForm' ? '100' : '',
                countQuery   : this.getCountQuery(),
                singleQuery  : this.getSingleQuery(),
                multipleQuery: this.getMultipleQuery()
            }
        };
    }

    getFieldClass(column) {
        if (column.type === 'date') return 'DatePickerField';
        if (column.type === 'boolean') return 'CheckBoxField';
        if (this.params.className === 'RowForm') {
            if (column.dbType === 'text') {
                return 'TextAreaField';
            }
            if (column.dbType === 'json') {
                return 'TextAreaField';
            }
        }
        return 'TextBoxField';
    }

    getField(column) {
        // console.log('FormWizard.getField', column);
        let field = {
            class: this.getFieldClass(column),
            name : column.name
        };
        if (column.caption) {
            field.caption = column.caption;
        }
        if (column.key === 'true') {
            if (column.auto === 'false') {
                field.notNull = 'true';
            }
        } else {
            if (column.nullable === 'false') {
                field.notNull = 'true';
                field.readOnly = 'false';
            }
        }
        if (column.auto === 'true') {
            field.readOnly = 'true';
        }
        return field;
    }

    getFields() {
        let fields = {};
        this.getColumns().forEach(column => {
            fields[column.name] = this.getField(column);
        });
        /*for (let i = 0; i < this.tableColumns.length; i++) {
            const column = this.tableColumns[i];
            fields[column.name] = this.getField(column);
        }*/
        return fields;
    }

    getColumns() {
        return this.tableColumns.filter(column => {
            if (this.params.className === 'TableForm') {
                if (column.dbType === 'text') return false;
                if (column.dbType === 'bytea') return false;
            }
            return true;
        });
    }

    getFormParams() {
        return {
            name       : this.params.formName,
            caption    : this.params.formCaption,
            class      : this.params.className,
            dataSources: this.getDataSources(),
            fields     : this.getFields()
        };
    }
}

class MySqlFormWizard extends FormWizard {

    getSingleQuery() {
        const columns = this.tableColumns.map(column => column.name);
        return 'select\n{columns}\nfrom `{table}`\nwhere id = {key}'
            .replace('{table}',   this.tableName)
            .replace('{columns}', columns.map(column => {return '    `' + column + '`';}).join(',\n'));
    }

    getMultipleQuery() {
        const columns = this.tableColumns.map(column => column.name);
        return 'select\n{columns}\nfrom `{table}`\nlimit {offset}, {limit}'
            .replace('{table}',   this.tableName)
            .replace('{columns}', columns.map(column => {return '    `' + column + '`';}).join(',\n'));
    }

    getCountQuery() {
        console.log('MySqlFormWizard.getCountQuery');
        return 'select count(*) from `{table}`'.replace('{table}', this.tableName);
    }
}

class PostgreSqlFormWizard extends FormWizard {

    getSingleQuery() {
        console.log('PostgreSqlFormWizard.getSingleQuery');
        const columns = this.getColumns().map(column => column.name);
        return 'select\n{columns}\nfrom "{table}"\nwhere id = {key}'
            .replace('{table}',   this.tableName)
            .replace('{columns}', columns.map(column => `    "${column}"`).join(',\n'));
    }

    getMultipleQuery() {
        console.log('PostgreSqlFormWizard.getMultipleQuery');
        const columns = this.getColumns().map(column => column.name);
        const _columns = columns.map(column => `    "${column}"`).join(',\n');
        return `select\n${_columns}\nfrom "${this.tableName}"\nlimit {limit}\noffset {offset}`;
    }

    getCountQuery() {
        console.log('PostgreSqlFormWizard.getCountQuery');
        return `select count(*) from "${this.tableName}"`;
    }
}

class ModalController {
    constructor(options) {
        this.options = options;
    }
    onClose = async e => {
        console.log('ModalController.onClose');
        await this.close();
    }
    onCreate = async values => {
        console.log('ModalController.onCreate', values);
        await this.close();
        if (this.options.onCreate) {
            await this.options.onCreate(values);
        }
    }
    async close() {
        await EditorFrontHostApp.editorApp.onModalClose();
    }
    getViewClass() {
        throw new Error('ModalController.getViewClass not implemented');
    }
}

class ChangeClassController extends ModalController {
    getViewClass() {
        return ChangeClassView;
    }
}

class NewActionController extends ModalController {
    getViewClass() {
        return NewActionView;
    }
}

class NewColumnController extends ModalController {
    getViewClass() {
        return NewColumnView;
    }
}

class NewDataSourceController extends ModalController {
    getViewClass() {
        return NewDataSourceView;
    }
}

class NewDatabaseController extends ModalController {
    getViewClass() {
        return NewDatabaseView;
    }
}
class NewFieldController extends ModalController {
    getViewClass() {
        return NewFieldView;
    }
}

class NewFormController extends ModalController {
    getViewClass() {
        return NewFormView;
    }
}

class NewFormFromTableController extends ModalController {
    getViewClass() {
        return NewFormFromTableView;
    }
}

class NewKeyColumnController extends ModalController {
    getViewClass() {
        return NewKeyColumnView;
    }
}
class NewPageController extends ModalController {
    getViewClass() {
        return NewPageView;
    }
}

class NewParamController extends ModalController {
    getViewClass() {
        return NewParamView;
    }
}
class NewTableController extends ModalController {
    getViewClass() {
        return NewTableView;
    }
}

class Model {

    constructor(data, parent = null) {
        if (!data) throw new Error('no data');
        this.data   = data;
        this.parent = parent;
    }

    init() {
    }

    getClassName() {
        return this.data['@class'];
    }

    getName() {
        return this.getAttr('name');
    }

    getFullName(splitter = '.') {
        let name;
        if (this.form) {
            name = `${this.form.page.getName()}${splitter}${this.form.getName()}${splitter}${this.getName()}`;
        } else if (this.page) {
            name = `${this.page.getName()}${splitter}${this.getName()}`;
        } else {
            name = this.getName();
        }
        return name;
    }

    async setValue(name, value) {
        throw new Error(`${this.constructor.name}.setValue not implemented`);
    }

    getAttr(name) {
        return this.data['@attributes'][name];
    }
    getAttributes() {
        return this.data['@attributes'];
    }

    setAttr(name, value) {
        this.data['@attributes'][name] = value;
    }

    /*getObject(col, name) {
        return this[col].find(obj => obj.getName() === name);
    }*/
    createDataSource(data) {
        const dataSource = new DataSource(data, this);
        dataSource.init();
        this.dataSources.push(dataSource);
        return dataSource;
    }
    removeDataSource(dataSource) {
        // console.log('Model.removeDataSource', dataSource.getName());
        const i = this.dataSources.indexOf(dataSource);
        if (i === -1) throw new Error('no such dataSource');
        this.dataSources.splice(i, 1);
    }
    createAction(data) {
        const action = new Action(data, this);
        action.init();
        this.actions.push(action);
        return action;
    }
    removeAction(action) {
        // console.log('Model.removeField', action.getName());
        const i = this.actions.indexOf(action);
        if (i === -1) throw new Error('no such action');
        this.actions.splice(i, 1);
    }

}

class Action extends Model {
    /*constructor(data, parent) {
        super(data, parent);
    }*/

    /*async getView(view) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Action',
            action    : 'getView',
            params    : Helper.encodeObject({
                view : view,
                page : this.data !== undefined ? this.form.page.getName() : null,
                form : this.data !== undefined ? this.form.getName()      : null,
            })
        });
    }*/

    getParams() {
        if (this.parent instanceof Form) {
            return {
                pageFileName: this.parent.page.pageLink.getAttr('fileName'),
                form        : this.parent.getAttr('name'),
                action      : this.getAttr('name'),
            };
        } else if (this.parent instanceof Page) {
            return {
                pageFileName: this.parent.pageLink.getAttr('fileName'),
                action      : this.getAttr('name'),
            };
        }
        return {
            action: this.getAttr('name'),
        };
    }

    async setValue(name, value) {
        //console.log('Action.setValue', name + ' = ' + value);
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Action',
            action    : 'save',
            params    : Helper.encodeObject({
                ...this.getParams(),
                attr        : name,
                value       : value
            })
        });
        this.setAttr(name, value);
        return data;
    }

    async deleteData() {
        await FrontHostApp.doHttpRequest({
            controller: 'Action',
            action    : 'delete',
            params    : Helper.encodeObject({
                ...this.getParams(),
            })
        });
    }
    async delete() {
        console.log('Action.delete', this.getName());
        await this.deleteData();
        this.parent.removeAction(this);
    }
    moveUp() {
        return FrontHostApp.doHttpRequest({
            controller : 'Action',
            action     : 'moveUp',
            params     : Helper.encodeObject({
                ...this.getParams(),
            })
        });
    }
    moveDown() {
        return FrontHostApp.doHttpRequest({
            controller : 'Action',
            action     : 'moveDown',
            params     : Helper.encodeObject({
                ...this.getParams(),
            })
        });
    }

}

class Application extends Model {

    constructor(data) {
        super(data);
        this.databases   = [];
        this.dataSources = [];
        this.actions     = [];
        this.pageLinks   = [];
    }

    init() {
        console.log('Application.init', this.data);
        // databases
        for (const data of this.data.databases) {
            this.createDatabase(data);
        }

        // dataSources
        for (const data of this.data.dataSources) {
            this.createDataSource(data);
        }

        // actions
        for (const data of this.data.actions) {
            this.createAction(data);
        }

        // pageLinks
        for (const data of this.data.pageLinks) {
            this.createPageLink(data);
        }
    }
    createDatabase(data) {
        const database = new Database(data, this);
        database.init();
        this.databases.push(database);
        return database;
    }
    createPageLink(data) {
        const pageLink = new PageLink(data, this);
        pageLink.init();
        this.pageLinks.push(pageLink);
        return pageLink;
    }
    removeDatabase(database) {
        console.log('Application.removeDatabase', database.getName());
        const i = this.databases.indexOf(database);
        if (i === -1) throw new Error('no such database');
        this.databases.splice(i, 1);
    }

    removePageLink(pageLink) {
        console.log('Application.removePageLink', pageLink.getName());
        const i = this.pageLinks.indexOf(pageLink);
        if (i === -1) throw new Error('no such pageLink');
        this.pageLinks.splice(i, 1);
    }
    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Application',
            action    : 'save',
            params    : Helper.encodeObject({
                attr : name,
                value: value
            })
        });
        this.setAttr(name, value);
        return data;
    }

    async newPageAndPageLinkData(params) {
        params['menu'] = (params['startup'] === 'true') ? 'Pages' : '';
        return await FrontHostApp.doHttpRequest({
            controller: 'Page',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
    }

    async newPage(params) {
        const {page: pageData, pageLink: pageLinkData} = await this.newPageAndPageLinkData(params);
        const pageLink = this.createPageLink(pageLinkData);
        return new Page(pageData, pageLink);
    }

    async newDatabase(params) {
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Database',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
        return this.createDatabase(data);
    }

    async getView(view) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Application',
            action    : 'getView',
            params    : Helper.encodeObject({
                app : this.getName(),
                view: view
            })
        });
    }

    async saveView(text, view) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Application',
            action    : 'saveView',
            params    : Helper.encodeObject({
                app : this.getName(),
                view: view,
                text: text
            })
        });
    }

    async saveController(text) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Application',
            action    : 'saveController',
            params    : Helper.encodeObject({
                app : this.getName(),
                text: text
            })
        });
    }

    async createView() {
        return await FrontHostApp.doHttpRequest({
            controller: 'Application',
            action    : 'createView',
            params    : Helper.encodeObject({
                app: this.getName()
            })
        });
    }

    async createController() {
        return await FrontHostApp.doHttpRequest({
            controller: 'Application',
            action    : 'createController',
            params    : Helper.encodeObject({
                app: this.getName()
            })
        });
    }

    async createModelBackJs() {
        return await FrontHostApp.doHttpRequest({
            controller: 'Application',
            action    : 'createModelBackJs',
            params    : Helper.encodeObject({
                app: this.getName()
            })
        });
    }

    async newDataSource(params) {
        const data = await FrontHostApp.doHttpRequest({
            controller: 'DataSource',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
        return this.createDataSource(data);
    }

    async newAction(params) {
        // params['pageFileName'] = this.page.pageLink.getFileName();
        // params['form']         = this.getName();
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Action',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
        return this.createAction(data);
    }

}

class Column extends Model {

    constructor(data, table) {
        super(data, table);
        this.table = table;
    }

    async setValue(name, value) {
        //console.log('Column.setValue', name + ' = ' + value);
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Column',
            action    : 'save',
            params    : Helper.encodeObject({
                database: this.table.database.getName(),
                table   : this.table.getName(),
                column  : this.getName(),
                attr    : name,
                value   : value
            })
        });
        this.setAttr(name, value);
        return data;
    }

    async deleteData() {
        await FrontHostApp.doHttpRequest({
            controller: 'Column',
            action    : 'delete',
            params    : Helper.encodeObject({
                database: this.table.database.getName(),
                table   : this.table.getName(),
                column  : this.getName(),
            })
        });
    }
    async delete() {
        await this.deleteData();
        this.parent.removeColumn(this);
    }

}

class DataSource extends Model {

    constructor(data, parent) {
        super(data, parent);
        this.keyColumns = [];
    }

    init() {
        for (const data of this.data.keyColumns) {
            this.createKeyColumn(data);
        }
    }

    createKeyColumn(data) {
        const keyColumn = new KeyColumn(data, this);
        keyColumn.init();
        this.keyColumns.push(keyColumn);
        return keyColumn;
    }
    removeKeyColumn(keyColumn) {
        console.log('Database.removeParam', keyColumn.getName());
        const i = this.keyColumns.indexOf(keyColumn);
        if (i === -1) throw new Error('no such keyColumn');
        this.keyColumns.splice(i, 1);
    }
    static async create(parent, params) {
        if (parent instanceof Form) {
            const form = parent;
            params['page']  = form.page.pageLink.getFileName();
            params['form']  = form.getName();
        }
        if (parent instanceof Page) {
            const page = parent;
            params['page']  = page.pageLink.getFileName();
        }
        return await FrontHostApp.doHttpRequest({
            controller: 'DataSource',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const args = {
            controller: 'DataSource',
            action    : 'save',
            params    : Helper.encodeObject({
                dataSource: this.getName(),
                attr      : name,
                value     : value
            })
        };
        if (this.parent instanceof Page) {
            args.params.pageFileName = Helper.encodeValue(this.parent.pageLink.getFileName());
        }
        if (this.parent instanceof Form) {
            args.params.form         = Helper.encodeValue(this.parent.getName());
            args.params.pageFileName = Helper.encodeValue(this.parent.page.pageLink.getFileName());
        }
        const data = await FrontHostApp.doHttpRequest(args);
        this.setAttr(name, value);
        return data;
    }

    async deleteData() {
        const args = {
            controller: 'DataSource',
            action    : 'delete',
            params    : Helper.encodeObject({
                dataSource: this.getName()
            })
        };
        if (this.parent instanceof Page) {
            args.params.page = Helper.encodeValue(this.parent.pageLink.getFileName());
        }
        if (this.parent instanceof Form) {
            args.params.form = Helper.encodeValue(this.parent.getName());
            args.params.page = Helper.encodeValue(this.parent.page.pageLink.getFileName());
        }
        await FrontHostApp.doHttpRequest(args);
    }
    async delete() {
        await this.deleteData();
        this.parent.removeDataSource(this);
    }

    async moveUp() {
        const args = {
            controller: 'DataSource',
            action    : 'moveUp',
            params    : Helper.encodeObject({
                dataSource: this.getName()
            })
        };
        if (this.parent instanceof Page) {
            args.params.page = Helper.encodeValue(this.parent.pageLink.getFileName());
        }
        if (this.parent instanceof Form) {
            args.params.form = Helper.encodeValue(this.parent.getName());
            args.params.page = Helper.encodeValue(this.parent.page.pageLink.getFileName());
        }
        return await FrontHostApp.doHttpRequest(args);
    }

    async moveDown() {
        const args = {
            controller: 'DataSource',
            action    : 'moveDown',
            params    : Helper.encodeObject({
                dataSource: this.getName()
            })
        };
        if (this.parent instanceof Page) {
            args.params.page = Helper.encodeValue(this.parent.pageLink.getFileName());
        }
        if (this.parent instanceof Form) {
            args.params.form = Helper.encodeValue(this.parent.getName());
            args.params.page = Helper.encodeValue(this.parent.page.pageLink.getFileName());
        }
        return await FrontHostApp.doHttpRequest(args);
    }

    async newKeyColumnData(name) {
        const args = {
            controller: 'KeyColumn',
            action    : '_new',
            params    : Helper.encodeObject({
                dataSource: this.getName(),
                name      : name
            })
        };
        if (this.parent instanceof Form) {
            args.params.page = Helper.encodeValue(this.parent.page.pageLink.getFileName());
            args.params.form = Helper.encodeValue(this.parent.getName());
        }
        if (this.parent instanceof Page) {
            args.params.page = Helper.encodeValue(this.parent.pageLink.getFileName());
        }
        return await FrontHostApp.doHttpRequest(args);
    }
    async newKeyColumn(name) {
        const data = await this.newKeyColumnData(name);
        return this.createKeyColumn(data);
    }
    async getView(view) {
        const args = {
            controller: 'DataSource',
            action    : 'getView',
            params    : Helper.encodeObject({
                dataSource: (this instanceof DataSource) ? this.getName() : undefined,
                view      : view
            })
        };
        if (this.parent instanceof Page) {

            args.params.pageFileName = Helper.encodeValue((this instanceof DataSource) ? this.parent.pageLink.getFileName() : undefined);
        }
        if (this.parent instanceof Form) {
            args.params.pageFileName = Helper.encodeValue((this instanceof DataSource) ? this.parent.page.pageLink.getFileName() : undefined);
            args.params.form         = Helper.encodeValue((this instanceof DataSource) ? this.parent.getName()                   : undefined);
        }
        return await FrontHostApp.doHttpRequest(args);
    }

    async saveController(text) {
        const args = {
            controller: 'DataSource',
            action    : 'saveController',
            params    : Helper.encodeObject({
                dataSource: this.getName(),
                text      : text
            })
        };
        if (this.parent instanceof Page) {
            args.params.pageFileName = Helper.encodeValue(this.parent.pageLink.getFileName());
        }
        if (this.parent instanceof Form) {
            args.params.pageFileName = Helper.encodeValue(this.parent.page.pageLink.getFileName());
            args.params.form         = Helper.encodeValue(this.parent.getName());
        }
        return await FrontHostApp.doHttpRequest(args);
    }

    async createController() {
        const args = {
            controller: 'DataSource',
            action    : 'createController',
            params    : Helper.encodeObject({
                page        : this.parent.page.getName(),
                pageFileName: this.parent.page.pageLink.getFileName(),
                form        : this.parent.getName(),
                dataSource  : this.getName()
            })
        };
        return await FrontHostApp.doHttpRequest(args);
    }

    getFullName() {
        if (this.parent instanceof Form) {
            return [this.parent.parent.getName(), this.parent.getName(), this.getName()].join('.');
        } else if (this.parent instanceof Page) {
            return [this.parent.getName(), this.getName()].join('.');
        } else if (this.parent instanceof Application) {
            return this.getName();
        }
    }

}

class Database extends Model {

    constructor(data, parent) {
        super(data, parent);
        this.params = [];
        this.tables = [];
    }

    init() {

        // params
        for (const data of this.data.params) {
            this.createParam(data);
        }

        // tables
        for (const data of this.data.tables) {
            this.createTable(data);
        }
    }

    createParam(data) {
        const param = new Param(data, this);
        param.init();
        this.params.push(param);
        return param;
    }

    createTable(data) {
        const table = new Table(data, this);
        table.init();
        this.tables.push(table);
        return table;
    }
    removeParam(param) {
        console.log('Database.removeParam', param.getName());
        const i = this.params.indexOf(param);
        if (i === -1) throw new Error('no such param');
        this.params.splice(i, 1);
    }
    removeTable(table) {
        console.log('Database.removeTable', table.getName());
        const i = this.tables.indexOf(table);
        if (i === -1) throw new Error('no such table');
        this.tables.splice(i, 1);
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Database',
            action    : 'save',
            params    : Helper.encodeObject({
                database: this.getName(),
                attr    : name,
                value   : value
            })
        });
        this.setAttr(name, value);
        return data;
    }

    async deleteData() {
        return await FrontHostApp.doHttpRequest({
            controller: 'Database',
            action    : 'delete',
            params    : Helper.encodeObject({
                database: this.getName()
            })
        });
    }

    async delete() {
        await this.deleteData();
        this.parent.removeDatabase(this);
    }

    async newParam(name) {
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Param',
            action    : '_new',
            params    : Helper.encodeObject({
                database: this.getName(),
                name    : name
            })
        });
        return this.createParam(data);
    }

    async newTable(params) {
        if (!params.name) throw new Error('newTable: no name');
        const data =  await FrontHostApp.doHttpRequest({
            controller: 'Table',
            action    : '_new',
            params    : Helper.encodeObject({
                database: this.getName(),
                name    : params.name,
                columns : params.columns
            })
        });
        return this.createTable(data);
    }

    async getView(view) {
        console.log('Database.getView', view);
        return await FrontHostApp.doHttpRequest({
            controller: 'Database',
            action    : 'getView',
            params    : Helper.encodeObject({
                view    : view,
                database: this.data !== undefined ? this.getName() : null
            })
        });
    }

    async getTableInfo(table) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Database',
            action    : 'getTableInfo',
            params    : Helper.encodeObject({
                database: this.data !== undefined ? this.getName() : null,
                table   : table
            })
        });
    }
    moveUp() {
        return FrontHostApp.doHttpRequest({
            controller : 'Database',
            action     : 'moveUp',
            params    : Helper.encodeObject({
                database: this.getName()
            })
        });
    }
    moveDown() {
        return FrontHostApp.doHttpRequest({
            controller : 'Database',
            action     : 'moveDown',
            params    : Helper.encodeObject({
                database: this.getName()
            })
        });
    }

}

class Field extends Model {

    constructor(data, form) {
        super(data, form);
        this.form = form;
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Field',
            action    : 'save',
            params    : Helper.encodeObject({
                pageFileName: this.form.page.pageLink.getFileName(),
                form        : this.form.getName(),
                field       : this.getName(),
                attr        : name,
                value       : value
            })
        });
        this.setAttr(name, value);
        return data;
    }
    async deleteData() {
        await FrontHostApp.doHttpRequest({
            controller : 'Field',
            action     : 'delete',
            params     : Helper.encodeObject({
                pageFileName:this.form.page.pageLink.getFileName(),
                form        :this.form.getName(),
                field       :this.getName()
            })
        });
    }
    async delete() {
        await this.deleteData();
        this.parent.removeField(this);
    }
    async getView(view) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Field',
            action    : 'getView',
            params    : Helper.encodeObject({
                view : view,
                page : this.data !== undefined ? this.form.page.getName() : null,
                form : this.data !== undefined ? this.form.getName()      : null,
                field: this.data !== undefined ? this.getName()           : null
            })
        });
    }

    async saveView(text, view) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Field',
            action    : 'saveView',
            params    : Helper.encodeObject({
                page : this.form.page.getName(),
                form : this.form.getName(),
                field: this.getName(),
                view : view,
                text : text
            })
        });
    }

    async saveController(text) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Field',
            action    : 'saveController',
            params    : Helper.encodeObject({
                page : this.form.page.getName(),
                form : this.form.getName(),
                field: this.getName(),
                text : text
            })
        });
    }

    async createView() {
        return await FrontHostApp.doHttpRequest({
            controller: 'Field',
            action    : 'createView',
            params    : Helper.encodeObject({
                page : this.form.page.getName(),
                form : this.form.getName(),
                field: this.getName(),
                class: this.getClassName()
            })
        });
    }

    async createController() {
        return await FrontHostApp.doHttpRequest({
            controller: 'Field',
            action    : 'createController',
            params    : Helper.encodeObject({
                page : this.form.page.getName(),
                form : this.form.getName(),
                field: this.getName(),
                class: this.getClassName()
            })
        });
    }

    async changeClass(params) {
        params['page']  = this.form.page.getName();
        params['form']  = this.form.getName();
        params['field'] = this.getName();
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Field',
            action    : 'changeClass',
            params    : Helper.encodeObject(params)
        });
        return this.data = data;
    }

    moveUp() {
        return FrontHostApp.doHttpRequest({
            controller : 'Field',
            action     : 'moveUp',
            params     : Helper.encodeObject({
                pageFileName: this.form.page.pageLink.getFileName(),
                form        : this.form.getName(),
                field       : this.getName()
            })
        });
    }

    moveDown() {
        return FrontHostApp.doHttpRequest({
            controller : 'Field',
            action     : 'moveDown',
            params     : Helper.encodeObject({
                pageFileName: this.form.page.pageLink.getFileName(),
                form        : this.form.getName(),
                field       : this.getName()
            })
        });
    }

}

class Form extends Model {

    constructor(data, page) {
        super(data, page);
        this.page   = page;
        this.dataSources = [];
        this.fields      = [];
        this.actions     = [];
    }

    init() {
        // dataSources
        for (const data of this.data.dataSources) {
            this.createDataSource(data);
        }

        // actions
        for (const data of this.data.actions) {
            this.createAction(data);
        }

        // fields
        for (const data of this.data.fields) {
            this.createField(data);
        }
    }
    createField(data) {
        const field = new Field(data, this);
        field.init();
        this.fields.push(field);
        return field;
    }
    removeField(field) {
        console.log('Form.removeField', field.getName());
        const i = this.fields.indexOf(field);
        if (i === -1) throw new Error('no such field');
        this.fields.splice(i, 1);
    }
    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Form',
            action    : 'save',
            params    : Helper.encodeObject({
                pageFileName: this.page.pageLink.getFileName(),
                form        : this.getName(),
                attr        : name,
                value       : value
            })
        });
        this.setAttr(name, value);
        return data;
    }

    async deleteData() {
        await FrontHostApp.doHttpRequest({
            controller: 'Form',
            action    : 'delete',
            params    : Helper.encodeObject({
                pageFileName: this.page.pageLink.getFileName(),
                form        : this.getName()
            })
        });
    }
    async delete() {
        await this.deleteData();
        this.parent.removeForm(this);
    }
    moveUp() {
        const args = {
            controller: 'Form',
            action    : 'moveUp',
            params    : Helper.encodeObject({
                pageFileName: this.page.pageLink.getFileName(),
                form        : this.getName()
            })
        };
        return FrontHostApp.doHttpRequest(args);
    }

    moveDown() {
        const args = {
            controller: 'Form',
            action    : 'moveDown',
            params    : Helper.encodeObject({
                pageFileName: this.page.pageLink.getFileName(),
                form        : this.getName()
            })
        };
        return FrontHostApp.doHttpRequest(args);
    }

    async newField(params) {
        params['pageFileName'] = this.page.pageLink.getFileName();
        params['form']         = this.getName();
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Field',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
        return this.createField(data);
    }

    async newAction(params) {
        params['pageFileName'] = this.page.pageLink.getFileName();
        params['form']         = this.getName();
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Action',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
        return this.createAction(data);
    }

    async newDataSource(params) {
        params['page']  = this.page.pageLink.getFileName();
        params['form']  = this.getName();
        const data = await FrontHostApp.doHttpRequest({
            controller: 'DataSource',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
        return this.createDataSource(data);
    }

    async getView(view) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Form',
            action    : 'getView',
            params    : Helper.encodeObject({
                view: view,
                page: this.data !== undefined ? this.page.getName() : null,
                form: this.data !== undefined ? this.getName()      : null
            })
        });
    }

    async saveView(text, view) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Form',
            action    : 'saveView',
            params    : Helper.encodeObject({
                page: this.page.getName(),
                form: this.getName(),
                view: view,
                text: text
            })
        });
    }

    async saveController(text) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Form',
            action    : 'saveController',
            params    : Helper.encodeObject({
                page: this.page.getName(),
                form: this.getName(),
                text: text
            })
        });
    }

    async createModelBackJs() {
        return await FrontHostApp.doHttpRequest({
            controller: 'Form',
            action    : 'createModelBackJs',
            params    : Helper.encodeObject({
                page: this.page.getName(),
                form: this.getName(),
            })
        });
    }

    async createView() {
        return await FrontHostApp.doHttpRequest({
            controller: 'Form',
            action    : 'createView',
            params    : Helper.encodeObject({
                page : this.page.getName(),
                form : this.getName(),
                class: this.getClassName()
            })
        });
    }

    async createController() {
        return await FrontHostApp.doHttpRequest({
            controller: 'Form',
            action    : 'createController',
            params    : Helper.encodeObject({
                page : this.page.getName(),
                form : this.getName(),
                class: this.getClassName()
            })
        });
    }

}

class KeyColumn extends Model {

    constructor(data, dataSource) {
        super(data, dataSource);
        this.dataSource = dataSource;
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await FrontHostApp.doHttpRequest({
            controller: 'KeyColumn',
            action    : 'save',
            params    : Helper.encodeObject({
                form        : this.dataSource.parent.getName(),
                pageFileName: this.dataSource.parent.page.pageLink.getFileName(),
                dataSource  : this.dataSource.getName(),
                keyColumn   : this.getName(),
                attr        : name,
                value       : value
            })
        });
        this.setAttr(name, value);
        return data;
    }

    async deleteData() {
        await FrontHostApp.doHttpRequest({
            controller: 'KeyColumn',
            action    : 'delete',
            params    : Helper.encodeObject({
                page      : this.dataSource.parent.page.pageLink.getFileName(),
                form      : this.dataSource.parent.getName(),
                dataSource: this.dataSource.getName(),
                keyColumn : this.getName()
            })
        });
    }
    async delete() {
        await this.deleteData();
        this.parent.removeKeyColumn(this);
    }


}

class Page extends Model {

    constructor(data, pageLink) {
        super(data);
        this.pageLink    = pageLink;
        this.dataSources = [];
        this.actions     = [];
        this.forms       = [];
    }

    init() {
        // data sources
        for (const data of this.data.dataSources) {
            this.createDataSource(data);
        }

        // actions
        for (const data of this.data.actions) {
            this.createAction(data);
        }

        // forms
        for (const data of this.data.forms) {
            this.createForm(data);
        }
    }
    createForm(data) {
        const form = new Form(data, this);
        form.init();
        this.forms.push(form);
        return form;
    }
    removeForm(form) {
        console.log('Page.removeForm', form.getName());
        const i = this.forms.indexOf(form);
        if (i === -1) throw new Error('no such form');
        this.forms.splice(i, 1);
    }
    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Page',
            action    : 'save',
            params    : Helper.encodeObject({
                fileName: this.pageLink.getFileName(),
                attr    : name,
                value   : value
            })
        });
        this.setAttr(name, value);
        return data;
    }

    async deleteData() {
        await FrontHostApp.doHttpRequest({
            controller: 'Page',
            action    : 'delete',
            params    : Helper.encodeObject({
                page: this.getName()
            })
        });
    }

    async delete() {
        console.log('Page.delete', this.getName());
        await this.deleteData();
        this.pageLink.remove();
    }

    async newForm(params) {
        params['pageFileName'] = this.pageLink.getFileName();
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Form',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
        return this.createForm(data);
    }

    async getView(view) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Page',
            action    : 'getView',
            params    : Helper.encodeObject({
                view: view,
                page: this.data !== undefined ? this.getName() : null
            })
        });
    }

    async saveView(text, view) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Page',
            action    : 'saveView',
            params    : Helper.encodeObject({
                page: this.getName(),
                view: view,
                text: text
            })
        });
    }

    async saveController(text) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Page',
            action    : 'saveController',
            params    : Helper.encodeObject({
                page: this.getName(),
                text: text
            })
        });
    }

    async createView() {
        return await FrontHostApp.doHttpRequest({
            controller: 'Page',
            action    : 'createView',
            params    : Helper.encodeObject({
                page: this.getName()
            })
        });
    }

    async createController() {
        return await FrontHostApp.doHttpRequest({
            controller: 'Page',
            action    : 'createController',
            params    : Helper.encodeObject({
                page: this.getName()
            })
        });
    }

    async createModelBackJs() {
        return await FrontHostApp.doHttpRequest({
            controller: 'Page',
            action    : 'createModelBackJs',
            params    : Helper.encodeObject({
                page: this.getName()
            })
        });
    }

    async newAction(params) {
        params['pageFileName'] = this.pageLink.getFileName();
        // params['form']         = this.getName();
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Action',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
        return this.createAction(data);
    }

}

class PageLink extends Model {

    constructor(data, parent) {
        super(data, parent);
        this.application = parent;
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await FrontHostApp.doHttpRequest({
            controller: 'PageLink',
            action    : 'save',
            params    : Helper.encodeObject({
                pageLink: this.getName(),
                attr    : name,
                value   : value
            })
        });
        this.setAttr(name, value);
        return data;
    }

    async moveUp() {
        return await FrontHostApp.doHttpRequest({
            controller: 'PageLink',
            action    : 'moveUp',
            params    : Helper.encodeObject({
                page: this.getName()
            })
        });
    }

    async moveDown() {
        return await FrontHostApp.doHttpRequest({
            controller: 'PageLink',
            action    : 'moveDown',
            params    : Helper.encodeObject({
                page: this.getName()
            })
        });
    }

    getFileName() {
        return this.data['@attributes'].fileName;
    }
    remove() {
        console.log('PageLink.remove', this.getName());
        this.parent.removePageLink(this);
    }

}

class Param extends Model {

    constructor(data, database) {
        super(data, database);
        this.database = database;
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Param',
            action    : 'save',
            params    : Helper.encodeObject({
                database: this.database.getName(),
                param   : this.getName(),
                attr    : name,
                value   : value
            })
        });
        this.setAttr(name, value);
        return data;
    }

    async deleteData() {
        await FrontHostApp.doHttpRequest({
            controller: 'Param',
            action    : 'delete',
            params    : Helper.encodeObject({
                database: this.database.getName(),
                param   : this.getName()
            })
        });
    }
    async delete() {
        await this.deleteData();
        this.parent.removeParam(this);
    }
}

class Table extends Model {
    constructor(data, database) {
        super(data, database);
        this.database = database;
        this.columns = [];
    }

    init() {
        for (const data of this.data.columns) {
            this.createColumn(data);
        }
    }

    createColumn(data) {
        const column = new Column(data, this);
        column.init();
        this.columns.push(column);
        return column;
    }
    removeColumn(column) {
        console.log('Table.removeColumn', column.getName());
        const i = this.columns.indexOf(column);
        if (i === -1) throw new Error('no such column');
        this.columns.splice(i, 1);
    }

    async newColumn(name) {
        if (!name) throw new Error(`newColumn: no name`);
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Column',
            action    : '_new',
            params    : Helper.encodeObject({
                database: this.database.getName(),
                table   : this.getName(),
                name    : name
            })
        });
        return this.createColumn(data);
    }
    async deleteData() {
        await FrontHostApp.doHttpRequest({
            controller: 'Table',
            action    : 'delete',
            params    : Helper.encodeObject({
                database: this.database.getName(),
                table   : this.getName()
            })
        });
    }
    async delete() {
        await this.deleteData();
        this.parent.removeTable(this);
    }

    moveUp() {
        return FrontHostApp.doHttpRequest({
            controller : 'Table',
            action     : 'moveUp',
            params     : Helper.encodeObject({
                database: this.database.getName(),
                table   : this.getName()
            })
        });
    }

    moveDown() {
        return FrontHostApp.doHttpRequest({
            controller : 'Table',
            action     : 'moveDown',
            params     : Helper.encodeObject({
                database: this.database.getName(),
                table   : this.getName()
            })
        });
    }

}

class ModelController /*extends EventEmitter*/ {
    constructor(model, parent = null) {
        // super();
        this.model = model;
        this.parent = parent;
        this.view = null;
    }
    init() {
    }
    getTitle() {
        return this.model.getName();
    }
    getStyle() {
        return {
            // fontWeight: 'bold',
        };
    }
    getPropList() {
        return {
            list   : this.model.data['@attributes'],
            options: {}
        };
    }
    async setProperty(name, value) {
        await this.model.setValue(name, value);
    }
    /*getObject(col, name) {
        return this[col].find(obj => obj.model.getName() === name);
    }*/
    async doAction(name) {
        throw new Error(`${this.constructor.name}.doAction('${name}') not implemented`);
    }
    getDocumentViewClass() {
        console.log(`${this.constructor.name}.getDocumentViewClass`);
        return null;
    }
    moveColItem(colName, item, offset) {
        Helper.moveArrItem(this[colName], item, offset);
    }
}

class ActionController extends ModelController {
    /*constructor(model, parent) {
        super(model, parent);
    }*/
    getActions() {
        return [
            {'action': 'moveUp'     , 'caption': 'Move Up'     },
            {'action': 'moveDown'   , 'caption': 'Move Down'   },
            {'action': 'delete', 'caption': 'Delete'}
        ];
    }
    async doAction(name) {
        switch (name) {
            case 'delete':
                await this.delete();
                break;
            case 'moveUp':
                await this.model.moveUp();
                this.parent.moveColItem('actions', this, -1);
                EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
            case 'moveDown':
                await this.model.moveDown();
                this.parent.moveColItem('actions', this, 1);
                EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
        }
    }
    async delete() {
        await this.model.delete();
        this.parent.removeAction(this);
        EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }
}

class ColumnController extends ModelController {
    /*constructor(model, parent) {
        super(model, parent);
    }*/
    getActions() {
        return [
            {'action': 'delete', 'caption': 'Delete'}
        ];
    }
    async doAction(name) {
        switch (name) {
            case 'delete':
                await this.delete();
                break;
        }
    }
    static async getView(view) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Column',
            action    : 'getView',
            params    : Helper.encodeObject({
                view: view
            })
        });
    }
    getPropList() {
        const propList = super.getPropList();
        propList.options['key']      = ['true', 'false'];
        propList.options['auto']     = ['true', 'false'];
        propList.options['nullable'] = ['true', 'false'];
        return propList;
    }
    async delete() {
        await this.model.delete();
        this.parent.removeColumn(this);
        EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }
}

class DocumentController extends ModelController {
    constructor(model, parent) {
        super(model, parent);
        this.document = null;
    }
    async createDocument() {
        const document = {
            controller: this,
            view      : null,
        };
        return this.document = document;
    }
    onDocumentClose() {
        console.log('DocumentController.onDocumentClose', this.getTitle());
        this.document = null;
    }
}

class DataSourceController extends DocumentController {
    constructor(model, parent) {
        super(model, parent);
        this.keyColumns = [];
        this.items = [
            {
                getTitle: () => 'Key Columns',
                items: this.keyColumns
            }
        ];
    }
    getTitle() {
        return `${this.model.getClassName()}: ${this.model.getName()}`;
    }
    getStyle() {
        return {
            // fontWeight: 'bold',
            color: 'brown'
        };
    }
    init() {
        this.model.keyColumns.forEach(keyColumn => this.createKeyColumn(keyColumn));
    }
    createKeyColumn(model) {
        const keyColumn = new KeyColumnController(model, this);
        keyColumn.init();
        this.keyColumns.push(keyColumn);
        return keyColumn;
    }
    removeKeyColumn(keyColumnController) {
        console.log('DataSourceController.removeKeyColumn', keyColumnController.getTitle());
        const i = this.keyColumns.indexOf(keyColumnController);
        if (i === -1) throw new Error('no such keyColumnController');
        this.keyColumns.splice(i, 1);
    }
    getActions() {
        return [
            {'action' : 'newItem', 'caption': 'New Key Column'},
            {'action':  'moveUp', 'caption':   'Move Up'},
            {'action':'moveDown', 'caption': 'Move Down'},
            {'action' : 'delete', 'caption': 'Delete'}
        ];
    }

    async doAction(name) {
        switch (name) {
            case 'newItem':
                await this.actionNewKeyColumn();
                break;
            case 'delete':
                await this.delete();
                break;
            case 'moveUp':
                await this.model.moveUp();
                this.parent.moveColItem('dataSources', this, -1);
                EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
            case 'moveDown':
                await this.model.moveDown();
                this.parent.moveColItem('dataSources', this, 1);
                EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
        }
    }

    async actionNewKeyColumn() {
        await EditorFrontHostApp.editorApp.openModal(new NewKeyColumnController({onCreate: async values => {
            const keyColumn = await this.model.newKeyColumn(values.name);
            const keyColumnController = this.createKeyColumn(keyColumn);
            await EditorFrontHostApp.editorApp.treeWidget2.select(keyColumnController);
            keyColumnController.view.parent.open();
            this.view.rerender();
            EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
        }}));
    }

    getPropList() {
        const propList = {
            list   : {},
            options: {}
        };

        // list
        for (const name in this.model.data['@attributes']) {
            if (!['countQuery', 'singleQuery', 'multipleQuery'].includes(name)) {
                propList.list[name] = this.model.data['@attributes'][name];
            }
        }

        // options
        // propList.options['insertNewKey'] = ['true', 'false'];
        return propList;
    }
    getDocumentViewClass() {
        if (this.model.getClassName() === 'SqlDataSource') return SqlDataSourceView;
        return super.getDocumentViewClass();
    }
    async onSaveClick(name, value) {
        // console.log('DataSourceController.onSaveClick', name, value);
        await this.model.setValue(name, value);
    }
    async delete() {
        await this.model.delete();
        this.parent.removeDataSource(this);
        EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }
}

class DatabaseController extends DocumentController {
    constructor(model, parent) {
        super(model, parent);
        this.tableName = null;
        this.tableInfo = null;
        this.params  = [];
        this.tables = [];
        this.items = [
            {
                getTitle: () => 'Params',
                items: this.params
            },
            {
                getTitle: () => 'Tables',
                items: this.tables
            }
        ];
    }
    getTitle() {
        return `${this.model.getClassName()}: ${this.model.getName()}`;
    }
    getStyle() {
        return {
            // fontWeight: 'bold',
            color: 'purple'
        };
    }
    init() {
        this.model.params.forEach(param => this.createParam(param));
        this.model.tables.forEach(table => this.createTable2(table));
    }
    createParam(model) {
        const param = new ParamController(model, this);
        param.init();
        this.params.push(param);
        return param;
    }
    createTable2(model) {
        const table = new TableController(model, this);
        table.init();
        this.tables.push(table);
        return table;
    }
    removeParam(paramController) {
        console.log('DatabaseController.removeParam', paramController.getTitle());
        const i = this.params.indexOf(paramController);
        if (i === -1) throw new Error('no such paramController');
        this.params.splice(i, 1);
    }
    removeTable2(tableController) {
        console.log('DatabaseController.removeTable2', tableController.getTitle());
        const i = this.tables.indexOf(tableController);
        if (i === -1) throw new Error('no such tableController');
        this.tables.splice(i, 1);
    }
    getActions() {
        return [
            {'action': 'newParam', 'caption': 'New Param'},
            {'action': 'newTable', 'caption': 'New Table'},
            {'action': 'moveUp'  , 'caption': 'Move Up'  },
            {'action': 'moveDown', 'caption': 'Move Down'},
            {'action': 'delete'  , 'caption': 'Delete'   }
        ];
    }
    async doAction(name) {
        switch (name) {
            case 'newParam':
                await this.actionNewParam();
                break;
            case 'newTable':
                await this.actionNewTable();
                break;
            case 'delete':
                await this.delete();
                break;
            case 'moveUp':
                await this.model.moveUp();
                this.parent.moveColItem('databases', this, -1);
                EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
            case 'moveDown':
                await this.model.moveDown();
                this.parent.moveColItem('databases', this, 1);
                EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
            default:
                throw new Error(`unknown action: ${name}`);
        }
    }
    async actionNewParam() {
        await EditorFrontHostApp.editorApp.openModal(new NewParamController({onCreate: async values => {
            const param = await this.model.newParam(values.name);
            const paramController = this.createParam(param);
            await EditorFrontHostApp.editorApp.treeWidget2.select(paramController);
            paramController.view.parent.open();
            this.view.rerender();
            EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
        }}));
    }
    async actionNewTable() {
        await EditorFrontHostApp.editorApp.openModal(new NewTableController({onCreate: async values => {
            const table = await this.model.newTable({name: values.name});
            const tableController = this.createTable2(table);
            await EditorFrontHostApp.editorApp.treeWidget2.select(tableController);
            tableController.view.parent.open();
            this.view.rerender();
            EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
        }}));
    }
    async createDocument() {
        const document = await super.createDocument();
        const result = await this.model.getView('DatabaseView/DatabaseView.html');
        // console.log('data:', result.data);
        document.treeWidgetItems = result.data.tables.sort().map(tableName => ({getTitle: () => tableName}))
        return document;
    }
    onTableSelect2 = async item => {
        console.log('DatabaseController.onTableSelect2', item.getTitle());
        const tableName = item.getTitle();
        this.tableName = tableName;
        const data = await this.model.getTableInfo(tableName);
        this.tableInfo = data.tableInfo;
        this.document.view.rerender();
        // console.log('tableInfo:', this.tableInfo);
    }
    onCreateTableClick = e => {
        console.log('DatabaseController.onCreateTableClick');
        this.newTableAction(this.tableName, this.tableInfo);
    }
    async newTableAction(tableName, tableInfo) {
        console.log('DatabaseController.newTableAction', tableName, tableInfo);
        const table = await this.model.newTable({
            name   : tableName,
            columns: tableInfo.map(column => ({
                name    : column.name,
                caption : column.name,
                type    : column.type,
                dbType  : column.dbType,
                key     : column.key,
                auto    : column.auto,
                nullable: column.nullable,
            }))
        });
        const tableController = this.createTable2(table);
        await EditorFrontHostApp.editorApp.treeWidget2.select(tableController);
        tableController.view.parent.open();
        this.view.rerender();
        // EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
    }
    async delete() {
        console.log('DatabaseController.delete', this.getTitle());
        await this.model.delete();
        this.parent.removeDatabase(this);
        EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }
    getDocumentViewClass() {
        return DatabaseView;
    }
}

class TableController extends DocumentController {

    constructor(model, parent) {
        super(model, parent);
        this.columns = [];
        this.items = [
            {
                getTitle: () => 'Columns',
                items: this.columns
            }
        ];
    }

    init() {
        this.model.columns.forEach(column => this.createColumn(column));
    }
    createColumn(model) {
        const column = new ColumnController(model, this);
        column.init();
        this.columns.push(column);
        return column;
    }
    removeColumn(columnController) {
        console.log('TableController.removeColumn', columnController.getTitle());
        const i = this.columns.indexOf(columnController);
        if (i === -1) throw new Error('no such columnController');
        this.columns.splice(i, 1);
    }

    getActions() {
        return [
            {'action': 'newColumn', 'caption': 'New Column'},
            {'action': 'moveUp'     , 'caption': 'Move Up'     },
            {'action': 'moveDown'   , 'caption': 'Move Down'   },
            {'action': 'delete', 'caption': 'Delete'},
        ];
    }

    async doAction(name) {
        switch (name) {
            case 'delete':
                await this.delete();
                break;
            case 'newColumn':
                await this.actionNewColumn();
                break;
            case 'moveUp':
                await this.model.moveUp();
                this.parent.moveColItem('tables', this, -1);
                EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
            case 'moveDown':
                await this.model.moveDown();
                this.parent.moveColItem('tables', this, 1);
                EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
            default:
                throw new Error(`unknown action: ${name}`);
        }
    }

    static async getView(view) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Table',
            action    : 'getView',
            params    : Helper.encodeObject({
                view: view
            })
        });
    }

    async actionNewColumn() {
        await EditorFrontHostApp.editorApp.openModal(new NewColumnController({onCreate: async values => {
            const column = await this.model.newColumn(values.name);
            const columnController = this.createColumn(column);
            await EditorFrontHostApp.editorApp.treeWidget2.select(columnController);
            columnController.view.parent.open();
            this.view.rerender();
                EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
        }}));
    }
    onCreateFormButtonClick = async e => {
        console.log('TableController.onCreateFormButtonClick');
        await this.createFormAction();
    }
    static async getView(view) {
        console.log('TableController.getView', view);
        return FrontHostApp.doHttpRequest({
            controller: 'Table',
            action    : 'getView',
            params    : Helper.encodeObject({view : view})
        });
    }

    async createFormAction() {
        console.log('TableController.createFormAction');
        await EditorFrontHostApp.editorApp.openModal(new NewFormFromTableController({
            tableController: this,
            onCreate: async values => {
                const formWizard = FormWizard.create({
                    model       : this.model,
                    pageName    : values.page,
                    className   : values.class,
                    formName    : values.name,
                    formCaption : values.caption,
                });
                const params = formWizard.getFormParams();
                // console.log('params:', params);
                const databaseController = this.parent;
                const applicationController = databaseController.parent;
                const pageLinkController = applicationController.findPageLink(values.page);
                if (!pageLinkController.pageController) {
                    await pageLinkController.loadPage();
                }
                const pageController = pageLinkController.pageController;
                // console.log('pageController:', pageController);
                const form = await pageController.model.newForm(params);
                // console.log('form:', form);
                const formController = pageController.createForm(form);
                await EditorFrontHostApp.editorApp.treeWidget2.select(formController);
                formController.view.parent.open();
                pageLinkController.view.rerender();
                EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
        }}));
    }
    async delete() {
        console.log('TableController.delete', this.getTitle());
        await this.model.delete();
        this.parent.removeTable2(this);
        EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }
    getDocumentViewClass() {
        return TableView;
    }
}

class VisualController extends DocumentController {
    constructor(model, parent) {
        super(model, parent);
        this.data = null;
    }
    async createDocument() {
        console.log('VisualController.createDocument');
        const document = await super.createDocument();
        const result = await this.model.getView('VisualView.html');
        this.data = result.data;
        return document;
    }
    async onControllerSave(value) {
        console.log('ApplicationController.onControllerSave'/*, value*/);
        await this.model.saveController(value);
    }
    onCreateCustomController = async e => {
        console.log('ApplicationController.onCreateCustomController');
        const data = await this.model.createController();
        this.data.js = data.js;
        this.document.view.rerender();
    }
    onCreateModelBack = async e => {
        const data = await this.model.createModelBackJs();
    }
    createDataSource(model) {
        const dataSource = new DataSourceController(model, this);
        dataSource.init();
        this.dataSources.push(dataSource);
        return dataSource;
    }
    removeDataSource(dataSourceController) {
        // console.log('VisualController.removeDataSource', dataSourceController.getTitle());
        const i = this.dataSources.indexOf(dataSourceController);
        if (i === -1) throw new Error('no such dataSourceController');
        this.dataSources.splice(i, 1);
    }
    createAction(model) {
        const action = new ActionController(model, this);
        action.init();
        this.actions.push(action);
        return action;
    }
    removeAction(actionController) {
        // console.log('VisualController.removeAction', actionController.getTitle());
        const i = this.actions.indexOf(actionController);
        if (i === -1) throw new Error('no such actionController');
        this.actions.splice(i, 1);
    }
    async actionNewAction() {
        console.log('VisualController.actionNewAction');
        await EditorFrontHostApp.editorApp.openModal(new NewActionController({onCreate: async values => {
            const action = await this.model.newAction({
                name   : values.name,
                caption: values.caption
            });
            const actionController = this.createAction(action);
            await EditorFrontHostApp.editorApp.treeWidget2.select(actionController);
            actionController.view.parent.open();
            if (this.pageLinkController) {
                this.pageLinkController.view.rerender();
            } else {
                this.view.rerender();
            }
            EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
        }}));
    }
}

class ApplicationController extends VisualController {

    constructor(model, editorApp) {
        super(model);
        this.editorApp = editorApp;
        this.databases   = [];
        this.dataSources = [];
        this.actions     = [];
        this.pageLinks   = [];

        // items
        this.opened = true;
        this.items = [
            {getTitle: () => 'Databases'   , items: this.databases},
            {getTitle: () => 'Data Sources', items: this.dataSources},
            {getTitle: () => 'Actions'     , items: this.actions},
            {getTitle: () => 'Pages'       , items: this.pageLinks, opened: true}
        ];
    }
    init() {
        this.model.databases.forEach(database => this.createDatabase(database));
        this.model.dataSources.forEach(dataSource => this.createDataSource(dataSource));
        this.model.actions.forEach(action => this.createAction(action));
        this.model.pageLinks.forEach(pageLink => this.createPageLink(pageLink));
    }

    createDatabase(model) {
        const database = new DatabaseController(model, this);
        database.init();
        this.databases.push(database);
        return database;
    }
    createPageLink(model) {
        const pageLink = new PageLinkController(model, this);
        pageLink.init();
        this.pageLinks.push(pageLink);
        return pageLink;
    }
    removeDatabase(databaseController) {
        console.log('ApplicationController.removeDatabase', databaseController.getTitle());
        const i = this.databases.indexOf(databaseController);
        if (i === -1) throw new Error('no such databaseController');
        this.databases.splice(i, 1);
    }
    removePageLink(pageLinkController) {
        const i = this.pageLinks.indexOf(pageLinkController);
        if (i === -1) throw new Error('no such pageLinkController');
        this.pageLinks.splice(i, 1);
    }

    getActions() {
        return [
            {'action': 'newDatabase'  , 'caption': 'New Database'   },
            {'action': 'newDataSource', 'caption': 'New Data Source'},
            {'action': 'newAction'    , 'caption': 'New Action'},
            {'action': 'newPage'      , 'caption': 'New Page'       }
        ];
    }

    async doAction(name) {
        switch (name) {
            case 'newDatabase':
                await this.newDatabaseAction();
                break;
            case 'newDataSource':
                await this.newDataSourceAction();
                break;
            case 'newPage':
                await this.newPageAction();
                break;
            case 'newAction':
                await this.actionNewAction();
                break;
            default:
                console.log(name);
        }
    }

    async newDatabaseAction() {
        console.log('ApplicationController.newDatabaseAction');
        await EditorFrontHostApp.editorApp.openModal(new NewDatabaseController({onCreate: async values => {
            // console.log('values: ', values);
            const database = await this.model.newDatabase({
                _class: values.class,
                name  : values.name,
                params: {
                    host    : {name: 'host'    , value: values.host    },
                    database: {name: 'database', value: values.database},
                    user    : {name: 'user'    , value: values.user    },
                    password: {name: 'password', value: values.password}
                }
            });
            const databaseController = this.createDatabase(database);
            await EditorFrontHostApp.editorApp.treeWidget2.select(databaseController);
            databaseController.view.parent.open();
            this.view.rerender();
            EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
        }}));
    }

    async newDataSourceAction() {
        await EditorFrontHostApp.editorApp.openModal(new NewDataSourceController({onCreate: async values => {
            const dataSource = await this.model.newDataSource({
                name : values.name,
                class: values.class
            });
            const dataSourceController = this.createDataSource(dataSource);
            await EditorFrontHostApp.editorApp.treeWidget2.select(dataSourceController);
            dataSourceController.view.parent.open();
            this.view.rerender();
            EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
        }}));
    }

    async newPageAction() {
        await EditorFrontHostApp.editorApp.openModal(new NewPageController({onCreate: async values => {
            const page = await this.model.newPage({
                name   : values.name,
                caption: values.caption,
                startup: values.startup
            });
            const pageLinkController = this.createPageLink(page.pageLink);
            const pageController = new PageController(page, pageLinkController);
            pageController.init();
            pageLinkController.setPageController(pageController);
            EditorFrontHostApp.editorApp.treeWidget2.select(pageLinkController);
            EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
        }}));
    }

    getPropList() {
        const propList = super.getPropList();
        propList.options['authentication'] = ['true', 'false'];
        propList.options['lang']           = ['en'  , 'ru'   ];
        return propList;
    }
    findPageLink(name) {
        return this.pageLinks.find(pageLink => pageLink.model.getName() === name);
    }
    getDocumentViewClass() {
        return VisualView;
    }
}

class FieldController extends VisualController {
    /*constructor(model, parent) {
        super(model, parent);
    }*/
    getTitle() {
        return `${this.model.getClassName()}: ${this.model.getName()}`;
    }
    getStyle() {
        return {
            // fontWeight: 'bold',
            color: 'blue'
        };
    }
    getActions() {
        return [
            {'action': 'changeClass', 'caption': 'Change Class'},
            {'action': 'moveUp'     , 'caption': 'Move Up'     },
            {'action': 'moveDown'   , 'caption': 'Move Down'   },
            {'action': 'delete'     , 'caption': 'Delete'      }
        ];
    }

    async doAction(name) {
        switch (name) {
            case 'changeClass':
                await this.actionChangeClass();
                break;
            case 'delete':
                await this.delete();
                break;
            case 'moveUp':
                await this.model.moveUp();
                this.parent.moveColItem('fields', this, -1);
                EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
            case 'moveDown':
                await this.model.moveDown();
                this.parent.moveColItem('fields', this, 1);
                EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
        }
    }

    async actionChangeClass() {
        await EditorFrontHostApp.editorApp.openModal(new ChangeClassController({
            fieldCtrl: this,
            onCreate: async values => {
                const data = await this.model.changeClass({class: values.class});
                console.log(data);
                EditorFrontHostApp.editorApp.fillPropertyGrid(this);
                this.view.rerender();
            }
        }));
    }

    getPropList() {
        const list = this.model.data['@attributes'];
        const options = {};
        options['isVisible']        = ['true', 'false'];
        options['readOnly']         = ['true', 'false'];
        options['notNull']          = ['true', 'false'];
        options['align']            = ['left', 'right'];
        options['param']            = ['true', 'false'];
        options['validateOnChange'] = ['true', 'false'];
        options['validateOnBlur']   = ['true', 'false'];
        return {list: list, options: options};
    }
    async delete() {
        await this.model.delete();
        this.parent.removeField(this);
        EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }
    getDocumentViewClass() {
        return VisualView;
    }
}

class FormController extends VisualController {
    constructor(model, parent) {
        super(model, parent);
        this.dataSources = [];
        this.actions     = [];
        this.fields      = [];
        this.items = [
            {getTitle: () => 'Data Sources', items: this.dataSources},
            {getTitle: () => 'Actions'     , items: this.actions},
            {getTitle: () => 'Fields'      , items: this.fields}
        ];
    }
    getTitle() {
        return `${this.model.getClassName()}: ${this.model.getName()}`;
    }
    getStyle() {
        return {
            // fontWeight: 'bold',
            color: 'green',
        };
    }
    init() {
        this.model.dataSources.forEach(dataSource => this.createDataSource(dataSource));
        this.model.fields.forEach(field => this.createField(field));
        this.model.actions.forEach(action => this.createAction(action));
    }
    createField(model) {
        const field = new FieldController(model, this);
        field.init();
        this.fields.push(field);
        return field;
    }


    removeField(fieldController) {
        console.log('FormController.removeField', fieldController.getTitle());
        const i = this.fields.indexOf(fieldController);
        if (i === -1) throw new Error('no such fieldController');
        this.fields.splice(i, 1);
    }


    getActions() {
        return [
            {'action': 'newDataSource', 'caption': 'New Data Source'},
            {'action': 'newField'     , 'caption': 'New Field'      },
            {'action': 'newAction'    , 'caption': 'New Action'     },
            {'action': 'moveUp'       , 'caption': 'Move Up'        },
            {'action': 'moveDown'     , 'caption': 'Move Down'      },
            {'action': 'delete'       , 'caption': 'Delete'         }
        ];
    }

    async doAction(name) {
        switch (name) {
            case 'newDataSource':
                await this.actionNewDataSource();
                break;
            case 'newField':
                await this.actionNewField();
                break;
            case 'newAction':
                await this.actionNewAction();
                break;
            case 'delete':
                await this.delete();
                break;
            case 'moveUp':
                await this.model.moveUp();
                this.parent.moveColItem('forms', this, -1);
                EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
            case 'moveDown':
                await this.model.moveDown();
                this.parent.moveColItem('forms', this, 1);
                EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
        }
    }

    async actionNewDataSource() {
        await EditorFrontHostApp.editorApp.openModal(new NewDataSourceController({onCreate: async values => {
            const dataSource = await this.model.newDataSource({
                name : values.name,
                class: values.class
            });
            const dataSourceController = this.createDataSource(dataSource);
            await EditorFrontHostApp.editorApp.treeWidget2.select(dataSourceController);
            dataSourceController.view.parent.open();
            this.view.rerender();
            EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
        }}));
    }

    async actionNewField() {
        await EditorFrontHostApp.editorApp.openModal(new NewFieldController({onCreate: async values => {
            const field = await this.model.newField({
                class  : values.class,
                name   : values.name,
                caption: values.caption,
                type   : values.type
            });
            const fieldController = this.createField(field);
            await EditorFrontHostApp.editorApp.treeWidget2.select(fieldController);
            fieldController.view.parent.open();
            this.view.rerender();
            EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
        }}));
    }



    getPropList() {
        return {
            list   : this.model.data['@attributes'],
            options: {
                editMethod: [
                    'disabled',
                    'table',
                    'form'
                ],
                newRowMode: [
                    'disabled',
                    'oneclick',
                    'editform',
                    'createform',
                    'oneclick editform',
                    'oneclick createform'
                ],
                deleteRowMode: [
                    'disabled',
                    'enabled'
                ],
                refreshButton: [
                    'true',
                    'false'
                ],
                visible: ['true', 'false'],
                newMode: ['', 'true', 'false'],
                backOnly : ['true', 'false'],
            }
        };
    }

    async setProperty(name, value) {
        await this.model.setValue(name, value);
    }

    async delete() {
        await this.model.delete();
        this.parent.removeForm(this);
        EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }
    getDocumentViewClass() {
        return VisualView;
    }
}

class PageController extends VisualController {

    constructor(model, pageLinkController = null) {
        super(model);
        this.pageLinkController = pageLinkController;
        this.dataSources = [];
        this.actions     = [];
        this.forms       = [];
        this.items = [
            {getTitle: () => 'Data Sources', items: this.dataSources},
            {getTitle: () => 'Actions'     , items: this.actions},
            {getTitle: () => 'Forms'       , items: this.forms}
        ];
    }

    init() {
        // console.log('PageController.init');
        this.model.dataSources.forEach(dataSource => this.createDataSource(dataSource));
        this.model.actions.forEach(action => this.createAction(action));
        this.model.forms.forEach(form => this.createForm(form));
    }

    createForm(model) {
        const form = new FormController(model, this);
        form.init();
        this.forms.push(form);
        return form;
    }
    removeForm(formController) {
        console.log('PageController.removeForm', formController.getTitle());
        const i = this.forms.indexOf(formController);
        if (i === -1) throw new Error('no such formController');
        this.forms.splice(i, 1);
    }

    getActions() {
        return [
            {'action': 'newDataSource', 'caption': 'New Data Source'},
            {'action': 'newAction'    , 'caption': 'New Action'       },
            {'action': 'newForm'      , 'caption': 'New Form'       },
            {'action': 'moveUp'       , 'caption': 'Move Up'        },
            {'action': 'moveDown'     , 'caption': 'Move Down'      },
            {'action': 'delete'       , 'caption': 'Delete'         }
        ];
    }

    async doAction(name) {
        switch (name) {
            case 'newForm':
                await this.actionNewForm();
                break;
            case 'newDataSource':
                await this.newDataSourceAction();
                break;
            case 'newAction':
                await this.actionNewAction();
                break;
            case 'delete':
                await this.delete();
                break;
            case 'moveUp':
                await this.model.pageLink.moveUp();
                this.pageLinkController.parent.moveColItem('pageLinks', this.pageLinkController, -1);
                EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
            case 'moveDown':
                await this.model.pageLink.moveDown();
                this.pageLinkController.parent.moveColItem('pageLinks', this.pageLinkController, 1);
                EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
            default:
                console.log(name);
        }
    }

    async newDataSourceAction() {
        await EditorFrontHostApp.editorApp.openModal(new NewDataSourceController({onCreate: async values => {
            const dataSourceData = await DataSource.create(this.model, {
                name : values.name,
                class: values.class
            });
            const dataSource = this.model.createDataSource(dataSourceData);
            const dataSourceController = this.createDataSource(dataSource);
            await EditorFrontHostApp.editorApp.treeWidget2.select(dataSourceController);
            dataSourceController.view.parent.open();
            this.pageLinkController.view.rerender();
            EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
        }}));
    }

    async actionNewForm() {
        await EditorFrontHostApp.editorApp.openModal(new NewFormController({onCreate: async values => {
            const form = await this.model.newForm({
                name   : values.name,
                caption: values.caption,
                class  : values.class
            });
            const formController = this.createForm(form);
            await EditorFrontHostApp.editorApp.treeWidget2.select(formController);
            formController.view.parent.open();
            this.pageLinkController.view.rerender();
            EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
        }}));
    }

    getPropList() {
        const propList = super.getPropList();
        propList.list['menu']    = this.getPageLink().getAttr('menu');
        propList.list['startup'] = this.getPageLink().getAttr('startup');
        propList.options['startup'] = ['true', 'false'];
        return propList;
    }

    setProperty(name, value) {
        if (name === 'startup' || name === 'menu') {
            this.getPageLink().setValue(name, value);
        } else  {
            ModelController.prototype.setProperty.call(this, name, value);
        }
    }

    getPageLink() {
        return this.model.pageLink;
    }

    async delete() {
        await this.model.delete();
        this.pageLinkController.parent.removePageLink(this.pageLinkController);
        EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }

    getDocumentViewClass() {
        return VisualView;
    }
}

class KeyColumnController extends ModelController {

    /*constructor(model, parent) {
        super(model, parent);
    }*/

    getActions() {
        return [
            {'action':'delete', 'caption':'Delete'}
        ];
    }

    async doAction(name) {
        switch (name) {
            case 'delete':
                await this.delete();
                break;
        }
    }

    static async getView(view) {
        return await FrontHostApp.doHttpRequest({
            controller: 'KeyColumn',
            action    : 'getView',
            params    : Helper.encodeObject({
                view: view
            })
        });
    }
    async delete() {
        await this.model.delete();
        this.parent.removeKeyColumn(this);
        EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }
}

class PageLinkController extends ModelController {
    constructor(model, parent) {
        super(model, parent);
        this.node = true;
        this.pageController = null;
        this.items = null;
    }
    getTitle() {
        if (this.pageController) return this.pageController.getTitle();
        return super.getTitle();
    }
    getStyle() {
        return {
            // fontWeight: 'bold',
            color: 'red'
        };
    }
    hasPage() {
        return this.pageController != null;
    }
    async loadPage() {
        console.log('PageLinkController.loadPage', this.getTitle());
        if (this.pageController) throw new Error('page already loaded');
        const pageLink = this.model;
        const pageData = await EditorFrontHostApp.fetchPageData(pageLink.getFileName());

        // page
        const page = new Page(pageData, pageLink);
        page.init();

        // pageController
        const pageController = new PageController(page, this);
        pageController.init();
        this.setPageController(pageController);
        // console.log('pageController:', pageController);

        this.view.rerender();
    }
    getActions() {
        return this.pageController.getActions();
    }
    getPropList() {
        return this.pageController.getPropList();
    }
    async setProperty(name, value) {
        this.pageController.setProperty(name, value);
    }
    setPageController(pageController) {
        if (this.pageController) throw new Error('pageLinkController already has pageController');
        this.pageController = pageController;
        this.items = pageController.items;
    }
    remove() {
        console.log('PageLinkController.remove', this.getTitle());
        this.parent.removePageLink(this);
    }
}

class ParamController extends ModelController {

    /*constructor(model, parent) {
        super(model, parent);
    }*/

    getActions() {
        return [
            {'action': 'delete', 'caption': 'Delete'}
        ];
    }

    async doAction(name) {
        switch (name) {
            case 'delete':
                await this.delete();
                break;
        }
    }

    static async getView(view) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Param',
            action    : 'getView',
            params    : Helper.encodeObject({
                view: view
            })
        });
    }
    async delete() {
        await this.model.delete();
        this.parent.removeParam(this);
        EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }
}
