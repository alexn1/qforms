"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdVisualController = void 0;
const EdDocumentController_1 = require("../EdDocumentController");
const EdDataSourceController_1 = require("../EdDataSourceController/EdDataSourceController");
const EdActionController_1 = require("../../EdActionController/EdActionController");
const EditorFrontHostApp_1 = require("../../../EditorFrontHostApp/EditorFrontHostApp");
const NewActionController_1 = require("../../../EdModalController/NewActionController/NewActionController");
class EdVisualController extends EdDocumentController_1.EdDocumentController {
    constructor(model, parent = null) {
        super(model, parent);
        this.onCreateCustomController = async (e) => {
            console.log('ApplicationController.onCreateCustomController');
            const data = await this.model.createController();
            this.data.js = data.js;
            this.document.view.rerender();
        };
        this.onCreateCustomView = async (e) => {
            console.log('VisualController.onCreateCustomView');
            const data = await this.model.createView();
            this.data.jsx = data.jsx;
            this.document.view.rerender();
        };
        this.onCreateCustomStyle = async (e) => {
            console.log('VisualController.onCreateCustomStyle');
            const data = await this.model.createStyle();
            this.data.less = data.less;
            this.document.view.rerender();
        };
        this.onCreateModelBack = async (e) => {
            const data = await this.model.createModelBackJs();
        };
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
        console.log('ApplicationController.onControllerSave' /*, value*/);
        const result = await this.model.saveController(value);
        this.data.js = result.js;
        this.document.view.rerender();
    }
    createDataSource(model) {
        console.log('VisualController.createDataSource', model);
        const dataSource = new EdDataSourceController_1.EdDataSourceController(model, this);
        dataSource.init();
        this.dataSources.push(dataSource);
        return dataSource;
    }
    removeDataSource(dataSourceController) {
        // console.log('VisualController.removeDataSource', dataSourceController.getTitle());
        const i = this.dataSources.indexOf(dataSourceController);
        if (i === -1)
            throw new Error('no such dataSourceController');
        this.dataSources.splice(i, 1);
    }
    createAction(model) {
        const action = new EdActionController_1.EdActionController(model, this);
        action.init();
        this.actions.push(action);
        return action;
    }
    removeAction(actionController) {
        // console.log('VisualController.removeAction', actionController.getTitle());
        const i = this.actions.indexOf(actionController);
        if (i === -1)
            throw new Error('no such actionController');
        this.actions.splice(i, 1);
    }
    async actionNewAction() {
        console.log('VisualController.actionNewAction');
        await EditorFrontHostApp_1.EditorFrontHostApp.editorApp.openModal(new NewActionController_1.NewActionController({
            onCreate: async (values) => {
                const action = await this.model.newAction({
                    name: values.name,
                    caption: values.caption,
                });
                const actionController = this.createAction(action);
                await EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.select(actionController);
                actionController.view.parent.open();
                if (this.pageLinkController) {
                    this.pageLinkController.view.rerender();
                }
                else {
                    this.view.rerender();
                }
                EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
            },
        }));
    }
}
exports.EdVisualController = EdVisualController;
