"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseEditor = void 0;
const Editor_1 = require("../Editor");
const ParamEditor_1 = require("../ParamEditor/ParamEditor");
const TableEditor_1 = require("../TableEditor/TableEditor");
const common_1 = require("../../../common");
class DatabaseEditor extends Editor_1.Editor {
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
        const param = new ParamEditor_1.ParamEditor(data, this);
        param.init();
        this.params.push(param);
        return param;
    }
    createTable(data) {
        const table = new TableEditor_1.TableEditor(data, this);
        table.init();
        this.tables.push(table);
        return table;
    }
    removeParam(param) {
        console.log('DatabaseEditor.removeParam', param.getName());
        const i = this.params.indexOf(param);
        if (i === -1)
            throw new Error('no such param');
        this.params.splice(i, 1);
    }
    removeTable(table) {
        console.log('DatabaseEditor.removeTable', table.getName());
        const i = this.tables.indexOf(table);
        if (i === -1)
            throw new Error('no such table');
        this.tables.splice(i, 1);
    }
    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await common_1.FrontHostApp.doHttpRequest({
            controller: 'Database',
            action: 'save',
            params: {
                database: this.getName(),
                attr: name,
                value: value,
            },
        });
        this.setAttr(name, value);
        return data;
    }
    async deleteData() {
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'Database',
            action: 'delete',
            params: {
                database: this.getName(),
            },
        });
    }
    async delete() {
        await this.deleteData();
        this.parent.removeDatabase(this);
    }
    async newParam(name) {
        const data = await common_1.FrontHostApp.doHttpRequest({
            controller: 'Param',
            action: '_new',
            params: {
                database: this.getName(),
                class: 'Param',
                name: name,
            },
        });
        return this.createParam(data);
    }
    async newTable(params) {
        if (!params.name)
            throw new Error('newTable: no name');
        const data = await common_1.FrontHostApp.doHttpRequest({
            controller: 'Table',
            action: '_new',
            params: {
                database: this.getName(),
                class: 'Table',
                name: params.name,
                columns: params.columns,
            },
        });
        return this.createTable(data);
    }
    async getView(view) {
        console.log('DatabaseEditor.getView', view);
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'Database',
            action: 'getView',
            params: {
                view: view,
                database: this.data !== undefined ? this.getName() : null,
            },
        });
    }
    async getTableInfo(table) {
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'Database',
            action: 'getTableInfo',
            params: {
                database: this.data !== undefined ? this.getName() : null,
                table: table,
            },
        });
    }
    moveUp() {
        return common_1.FrontHostApp.doHttpRequest({
            controller: 'Database',
            action: 'moveUp',
            params: {
                database: this.getName(),
            },
        });
    }
    moveDown() {
        return common_1.FrontHostApp.doHttpRequest({
            controller: 'Database',
            action: 'moveDown',
            params: {
                database: this.getName(),
            },
        });
    }
}
exports.DatabaseEditor = DatabaseEditor;