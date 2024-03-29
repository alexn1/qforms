import { EdVisualController } from '../EdVisualController';
import { EdFormController } from '../EdFormController/EdFormController';
import { EditorFrontHostApp } from '../../../../EditorFrontHostApp/EditorFrontHostApp';
import { NewDataSourceController } from '../../../../EdModalController/NewDataSourceController/NewDataSourceController';
import { DataSourceEditor } from '../../../../Editor/DataSourceEditor/DataSourceEditor';
import { NewFormController } from '../../../../EdModalController/NewFormController/NewFormController';
import { EdVisualView } from '../EdVisualView';
import { EdModelController } from '../../../EdModelController';
import { EdPageLinkController } from '../../../EdPageLinkController/EdPageLinkController';

export class EdPageController extends EdVisualController {
    options: any;
    forms: any[];
    items: any[];

    constructor(model, pageLinkController: EdPageLinkController | null = null, options = {}) {
        super(model);
        this.options = options;
        this.pageLinkController = pageLinkController;
        this.dataSources = [];
        this.actions = [];
        this.forms = [];
        this.items = [
            { getTitle: () => 'Data Sources', items: this.dataSources },
            { getTitle: () => 'Actions', items: this.actions },
            { getTitle: () => 'Forms', items: this.forms },
        ];
    }

    init() {
        // console.debug('PageController.init');
        this.model.dataSources.forEach((dataSource) => this.createDataSource(dataSource));
        this.model.actions.forEach((action) => this.createAction(action));
        this.model.forms.forEach((form) => this.createForm(form));
    }

    createForm(model) {
        const form = new EdFormController(model, this);
        form.init();
        this.forms.push(form);
        return form;
    }
    removeForm(formController) {
        console.debug('PageController.removeForm', formController.getTitle());
        const i = this.forms.indexOf(formController);
        if (i === -1) throw new Error('no such formController');
        this.forms.splice(i, 1);
    }

    getActions() {
        return [
            { action: 'newDataSource', caption: 'New Data Source' },
            { action: 'newAction', caption: 'New Action' },
            { action: 'newForm', caption: 'New Form' },
            { action: 'moveUp', caption: 'Move Up' },
            { action: 'moveDown', caption: 'Move Down' },
            { action: 'delete', caption: 'Delete' },
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
                this.pageLinkController.parent.moveColItem(
                    'pageLinks',
                    this.pageLinkController,
                    -1,
                );
                EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
            case 'moveDown':
                await this.model.pageLink.moveDown();
                this.pageLinkController.parent.moveColItem('pageLinks', this.pageLinkController, 1);
                EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
            default:
                console.debug(name);
        }
    }

    async newDataSourceAction() {
        await EditorFrontHostApp.editorApp.openModal(
            new NewDataSourceController({
                onCreate: async (values) => {
                    const dataSourceData = await DataSourceEditor.create(this.model, {
                        name: values.name,
                        class: values.class,
                    });
                    const dataSource = this.model.createDataSource(dataSourceData);
                    const dataSourceController = this.createDataSource(dataSource);
                    await EditorFrontHostApp.editorApp.treeWidget2.select(dataSourceController);
                    dataSourceController.view.parent.open();
                    this.pageLinkController.view.rerender();
                    EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
                },
            }),
        );
    }

    async actionNewForm() {
        await EditorFrontHostApp.editorApp.openModal(
            new NewFormController({
                onCreate: async (values) => {
                    const form = await this.model.newForm({
                        name: values.name,
                        caption: values.caption || values.name,
                        class: values.class,
                    });
                    const formController = this.createForm(form);
                    await EditorFrontHostApp.editorApp.treeWidget2.select(formController);
                    formController.view.parent.open();
                    this.pageLinkController.view.rerender();
                    EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
                },
            }),
        );
    }

    getPropList() {
        const propList = super.getPropList();
        propList.list['menu'] = this.getPageLink().getAttr('menu');
        propList.list['startup'] = this.getPageLink().getAttr('startup');
        propList.options['startup'] = ['true', 'false'];
        propList.options['formInTab'] = ['true', 'false'];
        return propList;
    }

    async setProperty(name, value) {
        if (name === 'startup' || name === 'menu') {
            this.getPageLink().setValue(name, value);
        } else {
            EdModelController.prototype.setProperty.call(this, name, value);
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
        return EdVisualView;
    }
}
