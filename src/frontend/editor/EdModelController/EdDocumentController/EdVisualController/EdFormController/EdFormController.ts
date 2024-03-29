import { EdVisualController } from '../EdVisualController';
import { EdFieldController } from '../EdFieldController/EdFieldController';
import { EditorFrontHostApp } from '../../../../EditorFrontHostApp/EditorFrontHostApp';
import { NewDataSourceController } from '../../../../EdModalController/NewDataSourceController/NewDataSourceController';
import { NewFieldController } from '../../../../EdModalController/NewFieldController/NewFieldController';
import { EdVisualView } from '../EdVisualView';

export class EdFormController extends EdVisualController {
    fields: any[];
    items: any[];

    constructor(model, parent) {
        super(model, parent);
        this.dataSources = [];
        this.actions = [];
        this.fields = [];
        this.items = [
            { getTitle: () => 'Data Sources', items: this.dataSources },
            { getTitle: () => 'Actions', items: this.actions },
            { getTitle: () => 'Fields', items: this.fields },
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
        this.model.dataSources.forEach((dataSource) => this.createDataSource(dataSource));
        this.model.fields.forEach((field) => this.createField(field));
        this.model.actions.forEach((action) => this.createAction(action));
    }

    createField(model) {
        const field = new EdFieldController(model, this);
        field.init();
        this.fields.push(field);
        return field;
    }

    removeField(fieldController) {
        console.debug('FormController.removeField', fieldController.getTitle());
        const i = this.fields.indexOf(fieldController);
        if (i === -1) throw new Error('no such fieldController');
        this.fields.splice(i, 1);
    }

    getActions() {
        return [
            { action: 'newDataSource', caption: 'New Data Source' },
            { action: 'newField', caption: 'New Field' },
            { action: 'newAction', caption: 'New Action' },
            { action: 'moveUp', caption: 'Move Up' },
            { action: 'moveDown', caption: 'Move Down' },
            { action: 'delete', caption: 'Delete' },
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
        await EditorFrontHostApp.editorApp.openModal(
            new NewDataSourceController({
                onCreate: async (values) => {
                    const dataSource = await this.model.newDataSource({
                        name: values.name,
                        class: values.class,
                    });
                    const dataSourceController = this.createDataSource(dataSource);
                    await EditorFrontHostApp.editorApp.treeWidget2.select(dataSourceController);
                    dataSourceController.view.parent.open();
                    this.view.rerender();
                    EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
                },
            }),
        );
    }

    async actionNewField() {
        await EditorFrontHostApp.editorApp.openModal(
            new NewFieldController({
                onCreate: async (values) => {
                    const field = await this.model.newField({
                        class: values.class,
                        name: values.name,
                        caption: values.caption,
                        type: values.type,
                    });
                    const fieldController = this.createField(field);
                    await EditorFrontHostApp.editorApp.treeWidget2.select(fieldController);
                    fieldController.view.parent.open();
                    this.view.rerender();
                    EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
                },
            }),
        );
    }

    getPropList() {
        return {
            list: this.model.data['@attributes'],
            options: {
                editMethod: ['disabled', 'table', 'form'],
                newRowMode: [
                    'disabled',
                    'oneclick',
                    'editform',
                    'createform',
                    'oneclick editform',
                    'oneclick createform',
                ],
                deleteRowMode: ['disabled', 'enabled'],
                refreshButton: ['true', 'false'],
                visible: ['true', 'false'],
                newMode: ['', 'true', 'false'],
                backOnly: ['true', 'false'],
            },
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
        return EdVisualView;
    }
}
