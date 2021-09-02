import BackHostApp from "../../BackHostApp";

// const JsonFile = require('../../JsonFile');
const ApplicationEditor = require('../Editor/ApplicationEditor/ApplicationEditor');

import {AppInfo} from '../../AppInfo';
import Application from '../../viewer/Model/Application/Application';
import Context from "../../Context";

class EditorController {
    appInfo: AppInfo;
    hostApp: BackHostApp;
    application: Application;
    constructor(appInfo, hostApp) {
        if (!hostApp) throw new Error(`no hostApp for ${this.constructor.name}`);
        this.appInfo     = appInfo;
        this.hostApp     = hostApp;
        this.application = null;
    }
    async init(context: Context) {

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
        return new ApplicationEditor(this.appInfo.appFile);
    }
}

export = EditorController;
