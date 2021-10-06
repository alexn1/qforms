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
        return {
            data: {}
        };
    }
    createApplicationEditor() {
        console.log('EditorController.createApplicationEditor');
        return new ApplicationEditor_1.default(this.appInfo.appFile);
    }
}
module.exports = EditorController;
