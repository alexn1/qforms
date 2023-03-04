"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseController = void 0;
const DocumentController_1 = require("../DocumentController");
const ParamController_1 = require("../../ParamController/ParamController");
const TableController_1 = require("../TableController/TableController");
const DatabaseView_1 = require("./DatabaseView");
const EditorFrontHostApp_1 = require("../../../EditorFrontHostApp/EditorFrontHostApp");
const NewParamController_1 = require("../../../ModalController/NewParamController/NewParamController");
const NewTableController_1 = require("../../../ModalController/NewTableController/NewTableController");
class DatabaseController extends DocumentController_1.DocumentController {
    constructor(model, parent) {
        super(model, parent);
        this.onTableSelect2 = async (item) => {
            console.log('DatabaseController.onTableSelect2', item.getTitle());
            const tableName = item.getTitle();
            this.tableName = tableName;
            const data = await this.model.getTableInfo(tableName);
            this.tableInfo = data.tableInfo;
            this.document.view.rerender();
            // console.log('tableInfo:', this.tableInfo);
        };
        this.onCreateTableClick = (e) => {
            console.log('DatabaseController.onCreateTableClick');
            this.newTableAction(this.tableName, this.tableInfo);
        };
        this.tableName = null;
        this.tableInfo = null;
        this.params = [];
        this.tables = [];
        this.items = [
            {
                getTitle: () => 'Params',
                items: this.params,
            },
            {
                getTitle: () => 'Tables',
                items: this.tables,
            },
        ];
    }
    getTitle() {
        return `${this.model.getClassName()}: ${this.model.getName()}`;
    }
    getStyle() {
        return {
            // fontWeight: 'bold',
            color: 'purple',
        };
    }
    init() {
        this.model.params.forEach((param) => this.createParam(param));
        this.model.tables.forEach((table) => this.createTable2(table));
    }
    createParam(model) {
        const param = new ParamController_1.ParamController(model, this);
        param.init();
        this.params.push(param);
        return param;
    }
    createTable2(model) {
        const table = new TableController_1.TableController(model, this);
        table.init();
        this.tables.push(table);
        return table;
    }
    removeParam(paramController) {
        console.log('DatabaseController.removeParam', paramController.getTitle());
        const i = this.params.indexOf(paramController);
        if (i === -1)
            throw new Error('no such paramController');
        this.params.splice(i, 1);
    }
    removeTable2(tableController) {
        console.log('DatabaseController.removeTable2', tableController.getTitle());
        const i = this.tables.indexOf(tableController);
        if (i === -1)
            throw new Error('no such tableController');
        this.tables.splice(i, 1);
    }
    getActions() {
        return [
            { action: 'newParam', caption: 'New Param' },
            { action: 'newTable', caption: 'New Table' },
            { action: 'moveUp', caption: 'Move Up' },
            { action: 'moveDown', caption: 'Move Down' },
            { action: 'delete', caption: 'Delete' },
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
                EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
            case 'moveDown':
                await this.model.moveDown();
                this.parent.moveColItem('databases', this, 1);
                EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
            default:
                throw new Error(`unknown action: ${name}`);
        }
    }
    async actionNewParam() {
        await EditorFrontHostApp_1.EditorFrontHostApp.editorApp.openModal(new NewParamController_1.NewParamController({
            onCreate: async (values) => {
                const param = await this.model.newParam(values.name);
                const paramController = this.createParam(param);
                await EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.select(paramController);
                paramController.view.parent.open();
                this.view.rerender();
                EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
            },
        }));
    }
    async actionNewTable() {
        await EditorFrontHostApp_1.EditorFrontHostApp.editorApp.openModal(new NewTableController_1.NewTableController({
            onCreate: async (values) => {
                const table = await this.model.newTable({ name: values.name });
                const tableController = this.createTable2(table);
                await EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.select(tableController);
                tableController.view.parent.open();
                this.view.rerender();
                EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
            },
        }));
    }
    async createDocument() {
        const document = await super.createDocument();
        const result = await this.model.getView('DatabaseView/DatabaseView.html');
        // console.log('data:', result.data);
        // @ts-ignore
        document.treeWidgetItems = result.data.tables
            .sort()
            .map((tableName) => ({ getTitle: () => tableName }));
        return document;
    }
    async newTableAction(tableName, tableInfo) {
        console.log('DatabaseController.newTableAction', tableName, tableInfo);
        const table = await this.model.newTable({
            class: 'Table',
            name: tableName,
            columns: tableInfo.map((column) => ({
                class: 'Column',
                name: column.name,
                caption: column.name,
                type: column.type,
                dbType: column.dbType,
                key: column.key.toString(),
                auto: column.auto.toString(),
                nullable: column.nullable.toString(),
            })),
        });
        const tableController = this.createTable2(table);
        await EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.select(tableController);
        tableController.view.parent.open();
        this.view.rerender();
        // EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
    }
    async delete() {
        console.log('DatabaseController.delete', this.getTitle());
        await this.model.delete();
        this.parent.removeDatabase(this);
        EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }
    getDocumentViewClass() {
        return DatabaseView_1.DatabaseView;
    }
}
exports.DatabaseController = DatabaseController;
