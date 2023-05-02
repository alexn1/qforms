"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionEditor = void 0;
const Editor_1 = require("../Editor");
const FormEditor_1 = require("../FormEditor/FormEditor");
const PageEditor_1 = require("../PageEditor/PageEditor");
const common_1 = require("../../../common");
class ActionEditor extends Editor_1.Editor {
    /* constructor(data, parent) {
        super(data, parent);
    } */
    /* async getView(view) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Action',
            action    : 'getView',
            params    : {
                view : view,
                page : this.data !== undefined ? this.form.page.getName() : null,
                form : this.data !== undefined ? this.form.getName()      : null,
            }
        });
    } */
    getParams() {
        if (this.parent instanceof FormEditor_1.FormEditor) {
            return {
                pageFileName: this.parent.page.pageLink.getAttr('fileName'),
                form: this.parent.getAttr('name'),
                action: this.getAttr('name'),
            };
        }
        else if (this.parent instanceof PageEditor_1.PageEditor) {
            return {
                pageFileName: this.parent.pageLink.getAttr('fileName'),
                action: this.getAttr('name'),
            };
        }
        return {
            action: this.getAttr('name'),
        };
    }
    async setValue(name, value) {
        //console.log('ActionEditor.setValue', name + ' = ' + value);
        const data = await common_1.FrontHostApp.doHttpRequest({
            controller: 'Action',
            action: 'save',
            params: Object.assign(Object.assign({}, this.getParams()), { attr: name, value: value }),
        });
        this.setAttr(name, value);
        return data;
    }
    async deleteData() {
        await common_1.FrontHostApp.doHttpRequest({
            controller: 'Action',
            action: 'delete',
            params: Object.assign({}, this.getParams()),
        });
    }
    async delete() {
        console.log('ActionEditor.delete', this.getName());
        await this.deleteData();
        this.parent.removeAction(this);
    }
    moveUp() {
        return common_1.FrontHostApp.doHttpRequest({
            controller: 'Action',
            action: 'moveUp',
            params: Object.assign({}, this.getParams()),
        });
    }
    moveDown() {
        return common_1.FrontHostApp.doHttpRequest({
            controller: 'Action',
            action: 'moveDown',
            params: Object.assign({}, this.getParams()),
        });
    }
}
exports.ActionEditor = ActionEditor;
