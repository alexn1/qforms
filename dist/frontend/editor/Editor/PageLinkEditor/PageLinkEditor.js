"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageLinkEditor = void 0;
const Editor_1 = require("../Editor");
const common_1 = require("../../../common");
class PageLinkEditor extends Editor_1.Editor {
    constructor(data, parent) {
        super(data, parent);
        this.application = parent;
    }
    async setValue(name, value) {
        //console.debug(name + ' = ' + value);
        const data = await common_1.FrontHostApp.doHttpRequest({
            controller: 'PageLink',
            action: 'save',
            params: {
                pageLink: this.getName(),
                attr: name,
                value: value,
            },
        });
        this.setAttr(name, value);
        return data;
    }
    async moveUp() {
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'PageLink',
            action: 'moveUp',
            params: {
                page: this.getName(),
            },
        });
    }
    async moveDown() {
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'PageLink',
            action: 'moveDown',
            params: {
                page: this.getName(),
            },
        });
    }
    getFileName() {
        return this.data['@attributes'].fileName;
    }
    remove() {
        console.debug('PageLinkEditor.remove', this.getName());
        this.parent.removePageLink(this);
    }
}
exports.PageLinkEditor = PageLinkEditor;
