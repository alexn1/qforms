"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnEditor = void 0;
const Editor_1 = require("../Editor");
const common_1 = require("../../../common");
class ColumnEditor extends Editor_1.Editor {
    constructor(data, table) {
        super(data, table);
        this.table = table;
    }
    async setValue(name, value) {
        //console.log('ColumnEditor.setValue', name + ' = ' + value);
        const data = await common_1.FrontHostApp.doHttpRequest({
            controller: 'Column',
            action: 'save',
            params: {
                database: this.table.database.getName(),
                table: this.table.getName(),
                column: this.getName(),
                attr: name,
                value: value,
            },
        });
        this.setAttr(name, value);
        return data;
    }
    async deleteData() {
        await common_1.FrontHostApp.doHttpRequest({
            controller: 'Column',
            action: 'delete',
            params: {
                database: this.table.database.getName(),
                table: this.table.getName(),
                column: this.getName(),
            },
        });
    }
    async delete() {
        await this.deleteData();
        this.parent.removeColumn(this);
    }
}
exports.ColumnEditor = ColumnEditor;
