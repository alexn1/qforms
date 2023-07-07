"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorController = void 0;
const path_1 = __importDefault(require("path"));
const ApplicationEditor_1 = require("../Editor/ApplicationEditor/ApplicationEditor");
class EditorController {
    constructor(appInfo, hostApp) {
        this.appInfo = appInfo;
        this.hostApp = hostApp;
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
        return new ApplicationEditor_1.ApplicationEditor(this.appInfo.appFile, path_1.default.join(this.hostApp.backendDirPath, 'editor'));
    }
}
exports.EditorController = EditorController;
