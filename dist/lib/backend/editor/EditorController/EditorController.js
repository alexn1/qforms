"use strict";
const ApplicationEditor = require("../Editor/ApplicationEditor/ApplicationEditor");
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
        return new ApplicationEditor(this.appInfo.appFile);
    }
}
module.exports = EditorController;
