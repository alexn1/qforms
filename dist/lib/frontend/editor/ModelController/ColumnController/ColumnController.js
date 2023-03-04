"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnController = void 0;
const ModelController_1 = require("../ModelController");
const common_1 = require("../../../common");
const EditorFrontHostApp_1 = require("../../EditorFrontHostApp/EditorFrontHostApp");
class ColumnController extends ModelController_1.ModelController {
    /*constructor(model, parent) {
        super(model, parent);
    }*/
    getActions() {
        return [{ action: 'delete', caption: 'Delete' }];
    }
    async doAction(name) {
        switch (name) {
            case 'delete':
                await this.delete();
                break;
        }
    }
    static async getView(view) {
        return await common_1.FrontHostApp.doHttpRequest({
            controller: 'Column',
            action: 'getView',
            params: {
                view: view,
            },
        });
    }
    getPropList() {
        const propList = super.getPropList();
        propList.options['key'] = ['true', 'false'];
        propList.options['auto'] = ['true', 'false'];
        propList.options['nullable'] = ['true', 'false'];
        propList.options['type'] = ['', 'string', 'number', 'boolean', 'object', 'date'];
        /*propList.options['dbType']   = [
            '',
            'integer',
            'character varying',
            'boolean',
            'timestamp with time zone',
            'text',
            'json',
        ];*/
        return propList;
    }
    async delete() {
        await this.model.delete();
        this.parent.removeColumn(this);
        EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }
}
exports.ColumnController = ColumnController;
