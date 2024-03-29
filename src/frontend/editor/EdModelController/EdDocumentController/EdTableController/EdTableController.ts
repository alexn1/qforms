import { EdDocumentController } from '../EdDocumentController';
import { EdColumnController } from '../../EdColumnController/EdColumnController';
import { EditorFrontHostApp } from '../../../EditorFrontHostApp/EditorFrontHostApp';
import { FrontHostApp } from '../../../../common';
import { NewColumnController } from '../../../EdModalController/NewColumnController/NewColumnController';
import { NewFormFromTableController } from '../../../EdModalController/NewFormFromTableController/NewFormFromTableController';
import { EditorHelper } from '../../../EditorHelper';
import { EdTableView } from './EdTableView';

export class EdTableController extends EdDocumentController {
    columns: any[];
    items: any[];

    constructor(model, parent) {
        super(model, parent);
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
        const column = new EdColumnController(model, this);
        column.init();
        this.columns.push(column);
        return column;
    }

    removeColumn(columnController) {
        console.debug('TableController.removeColumn', columnController.getTitle());
        const i = this.columns.indexOf(columnController);
        if (i === -1) throw new Error('no such columnController');
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

    async actionNewColumn() {
        await EditorFrontHostApp.editorApp.openModal(
            new NewColumnController({
                onCreate: async (values) => {
                    const column = await this.model.newColumn(values.name);
                    const columnController = this.createColumn(column);
                    await EditorFrontHostApp.editorApp.treeWidget2.select(columnController);
                    columnController.view.parent.open();
                    this.view.rerender();
                    EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
                },
            }),
        );
    }

    onCreateFormButtonClick = async (e) => {
        console.debug('TableController.onCreateFormButtonClick');
        await this.createFormAction();
    };

    /*static async getView(view) {
        console.debug('TableController.getView', view);
        return FrontHostApp.doHttpRequest({
            controller: 'Table',
            action    : 'getView',
            params    : {view : view}
        });
    }*/

    static async getView(view) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Table',
            action: 'getView',
            params: {
                view: view,
            },
        });
    }

    async createFormAction() {
        console.debug('TableController.createFormAction');
        await EditorFrontHostApp.editorApp.openModal(
            new NewFormFromTableController({
                tableController: this,
                onCreate: async (values) => {
                    const formWizard = EditorHelper.create({
                        model: this.model,
                        pageName: values.page,
                        className: values.class,
                        formName: values.name,
                        formCaption: values.caption || values.name,
                    });
                    const params = formWizard.getFormParams();
                    // console.debug('params:', params);
                    const databaseController = this.parent;
                    const applicationController = databaseController.parent;
                    const pageLinkController = applicationController.findPageLink(values.page);
                    if (!pageLinkController.pageController) {
                        await pageLinkController.loadPage();
                    }
                    const pageController = pageLinkController.pageController;
                    // console.debug('pageController:', pageController);
                    const form = await pageController.model.newForm(params);
                    // console.debug('form:', form);
                    const formController = pageController.createForm(form);
                    await EditorFrontHostApp.editorApp.treeWidget2.select(formController);
                    formController.view.parent.open();
                    pageLinkController.view.rerender();
                    EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
                },
            }),
        );
    }

    async delete() {
        console.debug('TableController.delete', this.getTitle());
        await this.model.delete();
        this.parent.removeTable2(this);
        EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }

    getDocumentViewClass() {
        return EdTableView;
    }
}
