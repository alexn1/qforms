"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorController = void 0;
const ApplicationEditor_1 = require("../Editor/ApplicationEditor/ApplicationEditor");
class EditorController {
    // appInfo: AppInfo;
    // hostApp: BackHostApp;
    constructor(appInfo, hostApp) {
        this.appInfo = appInfo;
        this.hostApp = hostApp;
        // if (!hostApp) throw new Error(`no hostApp for ${this.constructor.name}`);
        // this.appInfo = appInfo;
        // this.hostApp = hostApp;
    }
    async init(context) { }
    async getView(params) {
        console.debug('EditorController.getView');
        return {
            data: {},
        };
    }
    createApplicationEditor() {
        console.debug('EditorController.createApplicationEditor');
        return new ApplicationEditor_1.ApplicationEditor(this.appInfo.appFile);
    }
}
exports.EditorController = EditorController;
