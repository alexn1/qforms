"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdActionController = void 0;
const EdModelController_1 = require("../EdModelController");
const EditorFrontHostApp_1 = require("../../EditorFrontHostApp/EditorFrontHostApp");
class EdActionController extends EdModelController_1.EdModelController {
    /*constructor(model, parent) {
        super(model, parent);
    }*/
    getActions() {
        return [
            { action: 'moveUp', caption: 'Move Up' },
            { action: 'moveDown', caption: 'Move Down' },
            { action: 'delete', caption: 'Delete' },
        ];
    }
    async doAction(name) {
        switch (name) {
            case 'delete':
                await this.delete();
                break;
            case 'moveUp':
                await this.model.moveUp();
                this.parent.moveColItem('actions', this, -1);
                EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
            case 'moveDown':
                await this.model.moveDown();
                this.parent.moveColItem('actions', this, 1);
                EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
        }
    }
    async delete() {
        await this.model.delete();
        this.parent.removeAction(this);
        EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp_1.EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }
}
exports.EdActionController = EdActionController;
