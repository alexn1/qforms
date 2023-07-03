"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyColumnEditor = void 0;
const Editor_1 = require("../Editor");
const common_1 = require("../../../common");
class KeyColumnEditor extends Editor_1.Editor {
    constructor(data, dataSource) {
        super(data, dataSource);
        this.dataSource = dataSource;
    }
    async setValue(name, value) {
        //console.debug(name + ' = ' + value);
        const data = await common_1.FrontHostApp.doHttpRequest({
            controller: 'KeyColumn',
            action: 'save',
            params: {
                form: this.dataSource.parent.getName(),
                pageFileName: this.dataSource.parent.page.pageLink.getFileName(),
                dataSource: this.dataSource.getName(),
                keyColumn: this.getName(),
                attr: name,
                value: value,
            },
        });
        this.setAttr(name, value);
        return data;
    }
    async deleteData() {
        await common_1.FrontHostApp.doHttpRequest({
            controller: 'KeyColumn',
            action: 'delete',
            params: Object.assign(Object.assign(Object.assign({}, (this.getPage() ? { page: this.getPage().pageLink.getFileName() } : {})), (this.getForm() ? { form: this.getForm().getName() } : {})), { dataSource: this.dataSource.getName(), keyColumn: this.getName() }),
        });
    }
    getPage() {
        if (this.dataSource.parent.constructor.name === 'FormEditor') {
            return this.dataSource.parent.page;
        }
        if (this.dataSource.parent.constructor.name === 'PageEditor') {
            return this.dataSource.parent;
        }
        return null;
    }
    getForm() {
        if (this.dataSource.parent.constructor.name === 'FormEditor') {
            return this.dataSource.parent;
        }
        return null;
    }
    async delete() {
        await this.deleteData();
        this.parent.removeKeyColumn(this);
    }
}
exports.KeyColumnEditor = KeyColumnEditor;
