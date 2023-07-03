"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamEditor = void 0;
const Editor_1 = require("../Editor");
const common_1 = require("../../../common");
class ParamEditor extends Editor_1.Editor {
    constructor(data, database) {
        super(data, database);
        this.database = database;
    }
    async setValue(name, value) {
        //console.debug(name + ' = ' + value);
        const data = await common_1.FrontHostApp.doHttpRequest({
            controller: 'Param',
            action: 'save',
            params: {
                database: this.database.getName(),
                param: this.getName(),
                attr: name,
                value: value,
            },
        });
        this.setAttr(name, value);
        return data;
    }
    async deleteData() {
        await common_1.FrontHostApp.doHttpRequest({
            controller: 'Param',
            action: 'delete',
            params: {
                database: this.database.getName(),
                param: this.getName(),
            },
        });
    }
    async delete() {
        await this.deleteData();
        this.parent.removeParam(this);
    }
}
exports.ParamEditor = ParamEditor;
