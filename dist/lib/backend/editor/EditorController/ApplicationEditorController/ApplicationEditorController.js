"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationEditorController = void 0;
const VisualEditorController_1 = require("../VisualEditorController");
class ApplicationEditorController extends VisualEditorController_1.VisualEditorController {
    /*constructor(...args) {
        super(...args);
    }*/
    async save(params) {
        const appEditor = this.createApplicationEditor();
        appEditor.setAttr(params.attr, params.value);
        await appEditor.save();
        return null;
    }
    async getView(params) {
        const result = await super.getView(params);
        if (params.view === 'VisualView.html') {
            const appEditor = this.createApplicationEditor();
            // @ts-ignore
            result.data.js = await appEditor.getCustomFile('js');
        }
        return result;
    }
    async createController(params) {
        const appEditor = this.createApplicationEditor();
        const js = await appEditor.createJs(params);
        return { js };
    }
    async createModelBackJs(params) {
        const appEditor = this.createApplicationEditor();
        const js = await appEditor.createModelBackJs(params);
        return { js };
    }
    async saveController(params) {
        const appEditor = this.createApplicationEditor();
        await appEditor.saveCustomFile('js', params.text);
        return { js: params.text };
    }
}
exports.ApplicationEditorController = ApplicationEditorController;
