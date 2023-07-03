"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdApplicationController = void 0;
const EdVisualController_1 = require("../EdVisualController");
const EdDatabaseController_1 = require("../../EdDatabaseController/EdDatabaseController");
const EdPageLinkController_1 = require("../../../EdPageLinkController/EdPageLinkController");
const EditorFrontHostApp_1 = require("../../../../EditorFrontHostApp/EditorFrontHostApp");
const NewDatabaseController_1 = require("../../../../EdModalController/NewDatabaseController/NewDatabaseController");
const NewDataSourceController_1 = require("../../../../EdModalController/NewDataSourceController/NewDataSourceController");
const NewPageController_1 = require("../../../../EdModalController/NewPageController/NewPageController");
const EdPageController_1 = require("../EdPageController/EdPageController");
const EdVisualView_1 = require("../EdVisualView");
class EdApplicationController extends EdVisualController_1.EdVisualController {
    constructor(model, editorApp) {
        super(model);
        this.editorApp = editorApp;
        this.databases = [];
        this.dataSources = [];
        this.actions = [];
        this.pageLinks = [];
        // items
        this.opened = true;
        this.items = [
            { getTitle: () => 'Databases', items: this.databases },
            { getTitle: () => 'Data Sources', items: this.dataSources },
            { getTitle: () => 'Actions', items: this.actions },
            { getTitle: () => 'Pages', items: this.pageLinks, opened: true },
        ];
    }
    init() {
        this.model.databases.forEach((database) => this.createDatabase(database));
        this.model.dataSources.forEach((dataSource) => this.createDataSource(dataSource));
        this.model.actions.forEach((action) => this.createAction(action));
        this.model.pageLinks.forEach((pageLink) => this.createPageLink(pageLink));
    }
    createDatabase(model) {
        const database = new EdDatabaseController_1.EdDatabaseController(model, this);
        database.init();
        this.databases.push(database);
        return database;
    }
    createPageLink(model) {
        const pageLink = new EdPageLinkController_1.EdPageLinkController(model, this);
        pageLink.init();
        this.pageLinks.push(pageLink);
        return pageLink;
    }
    removeDatabase(databaseController) {
        console.debug('ApplicationController.removeDatabase', databaseController.getTitle());
        const i = this.databases.indexOf(databaseController);
        if (i === -1)
            throw new Error('no such databaseController');
        this.databases.splice(i, 1);
    }
    removePageLink(pageLinkController) {
        const i = this.pageLinks.indexOf(pageLinkController);
        if (i === -1)
            throw new Error('no such pageLinkController');
        this.pageLinks.splice(i, 1);
    }
    getActions() {
        return [
            { action: 'newDatabase', caption: 'New Database' },
            { action: 'newDataSource', caption: 'New Data Source' },
            { action: 'newAction', caption: 'New Action' },
            { action: 'newPage', caption: 'New Page' },
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
                console.debug(name);
        }
    }
    async newDatabaseAction() {
        console.debug('ApplicationController.newDatabaseAction');
        // @ts-ignore
        await EditorFrontHostApp_1.EditorFrontHostApp.editorApp.openModal(new NewDatabaseController_1.NewDatabaseController({
            onCreate: async (values) => {
                // console.debug('values: ', values);
                const database = await this.model.newDatabase({
                    class: values.class,
                    name: values.name,
                    params: [
                        { class: 'Param', name: 'host', value: values.host },
                        { class: 'Param', name: 'database', value: values.database },
                        { class: 'Param', name: 'user', value: values.user },
                        { class: 'Param', name: 'password', value: values.password },
                    ],
                });
                const databaseController = this.createDatabase(database);
                await EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.select(databaseController);
                databaseController.view.parent.open();
                this.view.rerender();
                // @ts-ignore
                EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
            },
        }));
    }
    async newDataSourceAction() {
        await EditorFrontHostApp_1.EditorFrontHostApp.editorApp.openModal(new NewDataSourceController_1.NewDataSourceController({
            onCreate: async (values) => {
                const dataSource = await this.model.newDataSource({
                    name: values.name,
                    class: values.class,
                });
                const dataSourceController = this.createDataSource(dataSource);
                await EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.select(dataSourceController);
                dataSourceController.view.parent.open();
                this.view.rerender();
                EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
            },
        }));
    }
    async newPageAction() {
        await EditorFrontHostApp_1.EditorFrontHostApp.editorApp.openModal(new NewPageController_1.NewPageController({
            onCreate: async (values) => {
                const page = await this.model.newPage({
                    name: values.name,
                    caption: values.caption || values.name,
                    startup: values.startup,
                });
                const pageLinkController = this.createPageLink(page.pageLink);
                const pageController = new EdPageController_1.EdPageController(page, pageLinkController);
                pageController.init();
                pageLinkController.setPageController(pageController);
                EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.select(pageLinkController);
                EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
            },
        }));
    }
    getPropList() {
        const propList = super.getPropList();
        propList.options['authentication'] = ['true', 'false'];
        propList.options['lang'] = ['en', 'ru'];
        return propList;
    }
    findPageLink(name) {
        return this.pageLinks.find((pageLink) => pageLink.model.getName() === name);
    }
    getDocumentViewClass() {
        // @ts-ignore
        return EdVisualView_1.EdVisualView;
    }
}
exports.EdApplicationController = EdApplicationController;
