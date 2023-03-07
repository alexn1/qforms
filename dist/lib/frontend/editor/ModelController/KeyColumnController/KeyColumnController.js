"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyColumnController = void 0;
const ModelController_1 = require("../ModelController");
const common_1 = require("../../../common");
const EditorFrontHostApp_1 = require("../../EditorFrontHostApp/EditorFrontHostApp");
class KeyColumnController extends ModelController_1.ModelController {
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
            controller: 'KeyColumn',
            action: 'getView',
            params: {
                view: view,
            },
        });
    }
    async delete() {
        await this.model.delete();
        this.parent.removeKeyColumn(this);
        EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }
}
exports.KeyColumnController = KeyColumnController;