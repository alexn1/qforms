"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdFormController = void 0;
const EdVisualController_1 = require("../EdVisualController");
const EdFieldController_1 = require("../EdFieldController/EdFieldController");
const EditorFrontHostApp_1 = require("../../../../EditorFrontHostApp/EditorFrontHostApp");
const NewDataSourceController_1 = require("../../../../EdModalController/NewDataSourceController/NewDataSourceController");
const NewFieldController_1 = require("../../../../EdModalController/NewFieldController/NewFieldController");
const EdVisualView_1 = require("../EdVisualView");
class EdFormController extends EdVisualController_1.EdVisualController {
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
        const field = new EdFieldController_1.EdFieldController(model, this);
        field.init();
        this.fields.push(field);
        return field;
    }
    removeField(fieldController) {
        console.log('FormController.removeField', fieldController.getTitle());
        const i = this.fields.indexOf(fieldController);
        if (i === -1)
            throw new Error('no such fieldController');
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
                EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
            case 'moveDown':
                await this.model.moveDown();
                this.parent.moveColItem('forms', this, 1);
                EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
        }
    }
    async actionNewDataSource() {
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
    async actionNewField() {
        await EditorFrontHostApp_1.EditorFrontHostApp.editorApp.openModal(new NewFieldController_1.NewFieldController({
            onCreate: async (values) => {
                const field = await this.model.newField({
                    class: values.class,
                    name: values.name,
                    caption: values.caption,
                    type: values.type,
                });
                const fieldController = this.createField(field);
                await EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.select(fieldController);
                fieldController.view.parent.open();
                this.view.rerender();
                EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
            },
        }));
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
        EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }
    getDocumentViewClass() {
        return EdVisualView_1.EdVisualView;
    }
}
exports.EdFormController = EdFormController;