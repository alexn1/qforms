import BackHostApp = require("../../BackHostApp");
import ApplicationEditor = require('../Editor/ApplicationEditor/ApplicationEditor');
import { AppInfo } from '../../AppInfo';
import { Context } from "../../Context";
declare class EditorController {
    appInfo: AppInfo;
    hostApp: BackHostApp;
    constructor(appInfo: AppInfo, hostApp: BackHostApp);
    init(context: Context): Promise<void>;
    getView(params: any): Promise<{
        data: {};
    }>;
    createApplicationEditor(): ApplicationEditor;
}
export = EditorController;
