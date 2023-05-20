"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdTableController = void 0;
const EdDocumentController_1 = require("../EdDocumentController");
const EdColumnController_1 = require("../../EdColumnController/EdColumnController");
const EditorFrontHostApp_1 = require("../../../EditorFrontHostApp/EditorFrontHostApp");
const common_1 = require("../../../../common");
const NewColumnController_1 = require("../../../EdModalController/NewColumnController/NewColumnController");
const NewFormFromTableController_1 = require("../../../EdModalController/NewFormFromTableController/NewFormFromTableController");
const EditorHelper_1 = require("../../../EditorHelper");
const EdTableView_1 = require("./EdTableView");
class EdTableController extends EdDocumentController_1.EdDocumentController {
    constructor(model, parent) {
        super(model, parent);
        this.onCreateFormButtonClick = async (e) => {
            console.log('TableController.onCreateFormButtonClick');
            await this.createFormAction();
        };
        this.columns = [];
        this.items = [
            {
                getTitle: () => 'Columns',
                items: this.columns,
            },
        ];
    }
    init() {
        this.model.columns.forEach((column) => this.createColumn(column));
    }
    createColumn(model) {
        const column = new EdColumnController_1.EdColumnController(model, this);
        column.init();
        this.columns.push(column);
        return column;
    }
    removeColumn(columnController) {
        console.log('TableController.removeColumn', columnController.getTitle());
        const i = this.columns.indexOf(columnController);
        if (i === -1)
            throw new Error('no such columnController');
        this.columns.splice(i, 1);
    }
    getActions() {
        return [
            { action: 'newColumn', caption: 'New Column' },
            { action: 'moveUp', caption: 'Move Up' },
            { action: 'moveDown', caption: 'Move Down' },
            { action: 'delete', caption: 'Delete' },
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
                EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
            case 'moveDown':
                await this.model.moveDown();
                this.parent.moveColItem('tables', this, 1);
                EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
            default:
                throw new Error(`unknown action: ${name}`);
        }
    }
    async actionNewColumn() {
        await EditorFrontHostApp_1.EditorFrontHostApp.editorApp.openModal(new NewColumnController_1.NewColumnController({
            onCreate: async (values) => {
                const column = await this.model.newColumn(values.name);
                const columnController = this.createColumn(column);
                await EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.select(columnController);
                columnController.view.parent.open();
                this.view.rerender();
                EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
            },
        }));
    }
    /*static async getView(view) {
        console.log('TableController.getView', view);
        return FrontHostApp.doHttpRequest({
            controller: 'Table',
            action    : 'getView',
            params    : {view : view}
        });
    }*/
    static async getView(view) {
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'Table',
            action: 'getView',
            params: {
                view: view,
            },
        });
    }
    async createFormAction() {
        console.log('TableController.createFormAction');
        await EditorFrontHostApp_1.EditorFrontHostApp.editorApp.openModal(new NewFormFromTableController_1.NewFormFromTableController({
            tableController: this,
            onCreate: async (values) => {
                const formWizard = EditorHelper_1.EditorHelper.create({
                    model: this.model,
                    pageName: values.page,
                    className: values.class,
                    formName: values.name,
                    formCaption: values.caption || values.name,
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
                await EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.select(formController);
                formController.view.parent.open();
                pageLinkController.view.rerender();
                EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
            },
        }));
    }
    async delete() {
        console.log('TableController.delete', this.getTitle());
        await this.model.delete();
        this.parent.removeTable2(this);
        EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }
    getDocumentViewClass() {
        return EdTableView_1.EdTableView;
    }
}
exports.EdTableController = EdTableController;
