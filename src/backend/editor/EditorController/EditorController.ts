import BackHostApp from "../../BackHostApp";
import ApplicationEditor from '../Editor/ApplicationEditor/ApplicationEditor';
import {AppInfo} from '../../AppInfo';
import Context from "../../Context";

class EditorController {
    appInfo: AppInfo;
    hostApp: BackHostApp;
    constructor(appInfo, hostApp) {
        if (!hostApp) throw new Error(`no hostApp for ${this.constructor.name}`);
        this.appInfo = appInfo;
        this.hostApp = hostApp;
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
    createApplicationEditor() {
        console.log('EditorController.createApplicationEditor');
        return new ApplicationEditor(this.appInfo.appFile);
    }
}

export = EditorController;
