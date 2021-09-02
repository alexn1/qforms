"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ApplicationEditor_1 = __importDefault(require("../Editor/ApplicationEditor/ApplicationEditor"));
class EditorController {
    constructor(appInfo, hostApp) {
        if (!hostApp)
            throw new Error(`no hostApp for ${this.constructor.name}`);
        this.appInfo = appInfo;
        this.hostApp = hostApp;
    }
    async init(context) {
    }
    async getView(params) {
        console.log('EditorController.getView');
        let view = null;
        /*if (!this.viewDirPath) throw new Error('viewDirPath is null');
        const viewFilePath = path.join(this.viewDirPath, params.view);
        const exists = await Helper.exists(viewFilePath);
        if (exists) {
            console.log(`view file exists: ${viewFilePath}`);
        } else {
            console.warn(`view file does not exist: ${viewFilePath}`);
        }
        if (exists) view = await Helper.readTextFile(viewFilePath);*/
        return {
            view,
            data: {}
        };
    }
    async createApplicationEditor() {
        console.log('EditorController.createApplicationEditor');
        return new ApplicationEditor_1.default(this.appInfo.appFile);
    }
}
module.exports = EditorController;
