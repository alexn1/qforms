"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdDataSourceController = void 0;
const EdDocumentController_1 = require("../EdDocumentController");
const EdKeyColumnController_1 = require("../../EdKeyColumnController/EdKeyColumnController");
const EditorFrontHostApp_1 = require("../../../EditorFrontHostApp/EditorFrontHostApp");
const NewKeyColumnController_1 = require("../../../EdModalController/NewKeyColumnController/NewKeyColumnController");
const EdSqlDataSourceView_1 = require("./EdSqlDataSourceView");
const EdNoSqlDataSourceView_1 = require("./EdNoSqlDataSourceView");
class EdDataSourceController extends EdDocumentController_1.EdDocumentController {
    constructor(model, parent) {
        super(model, parent);
        this.onCreateModelBack = async (e) => {
            const data = await this.model.createModelBackJs();
        };
        this.keyColumns = [];
        this.items = [
            {
                getTitle: () => 'Key Columns',
                items: this.keyColumns,
            },
        ];
    }
    getTitle() {
        return `${this.model.getClassName()}: ${this.model.getName()}`;
    }
    getStyle() {
        return {
            // fontWeight: 'bold',
            color: 'brown',
        };
    }
    init() {
        this.model.keyColumns.forEach((keyColumn) => this.createKeyColumn(keyColumn));
    }
    createKeyColumn(model) {
        const keyColumn = new EdKeyColumnController_1.EdKeyColumnController(model, this);
        keyColumn.init();
        this.keyColumns.push(keyColumn);
        return keyColumn;
    }
    removeKeyColumn(keyColumnController) {
        console.debug('DataSourceController.removeKeyColumn', keyColumnController.getTitle());
        const i = this.keyColumns.indexOf(keyColumnController);
        if (i === -1)
            throw new Error('no such keyColumnController');
        this.keyColumns.splice(i, 1);
    }
    getActions() {
        return [
            { action: 'newItem', caption: 'New Key Column' },
            { action: 'moveUp', caption: 'Move Up' },
            { action: 'moveDown', caption: 'Move Down' },
            { action: 'delete', caption: 'Delete' },
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
                EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
            case 'moveDown':
                await this.model.moveDown();
                this.parent.moveColItem('dataSources', this, 1);
                EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
        }
    }
    async actionNewKeyColumn() {
        await EditorFrontHostApp_1.EditorFrontHostApp.editorApp.openModal(new NewKeyColumnController_1.NewKeyColumnController({
            onCreate: async (values) => {
                const keyColumn = await this.model.newKeyColumn(values.name);
                const keyColumnController = this.createKeyColumn(keyColumn);
                await EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.select(keyColumnController);
                keyColumnController.view.parent.open();
                this.view.rerender();
                EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
            },
        }));
    }
    getPropList() {
        const propList = {
            list: {},
            options: {},
        };
        // list
        for (const name in this.model.data['@attributes']) {
            if (!['countQuery', 'singleQuery', 'multipleQuery', 'selectQuery'].includes(name)) {
                propList.list[name] = this.model.data['@attributes'][name];
            }
        }
        return propList;
    }
    getDocumentViewClass() {
        if (this.model.getClassName() === 'SqlDataSource')
            return EdSqlDataSourceView_1.EdSqlDataSourceView;
        if (this.model.getClassName() === 'NoSqlDataSource')
            return EdNoSqlDataSourceView_1.EdNoSqlDataSourceView;
        return super.getDocumentViewClass();
    }
    async onSaveClick(name, value) {
        // console.debug('DataSourceController.onSaveClick', name, value);
        await this.model.setValue(name, value);
    }
    async delete() {
        await this.model.delete();
        this.parent.removeDataSource(this);
        EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }
}
exports.EdDataSourceController = EdDataSourceController;
