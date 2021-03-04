const path = require('path');
const qforms = require('../../qforms');

class EditorController {
    constructor(appInfo, hostApp, application) {
        if (!hostApp) throw new Error(`no hostApp for ${this.constructor.name}`);
        if (!application) throw new Error(`no application for ${this.constructor.name}`);
        this.appInfo     = appInfo;
        this.hostApp     = hostApp;
        this.application = application;
        // this.viewDirPath = null;
    }

    async getView(params) {
        console.log('EditorController.getView');
        let view = null;

        /*if (!this.viewDirPath) throw new Error('viewDirPath is null');
        const viewFilePath = path.join(this.viewDirPath, params.view);
        const exists = await qforms.Helper.exists(viewFilePath);
        if (exists) {
            console.log(`view file exists: ${viewFilePath}`);
        } else {
            console.warn(`view file does not exist: ${viewFilePath}`);
        }
        if (exists) view = await qforms.Helper.readTextFile(viewFilePath);*/
        return {
            view,
            data: {}
        };
    }

    async createApplicationEditor() {
        console.log('EditorController.createApplicationEditor');
        const appFile = new qforms.JsonFile(this.appInfo.filePath);
        await appFile.read();
        return new qforms.ApplicationEditor(appFile, this.hostApp, this.application.getEnv());
    }
}

module.exports = EditorController;
