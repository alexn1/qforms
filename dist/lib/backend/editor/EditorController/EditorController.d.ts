import BackHostApp from "../../BackHostApp";
import { AppInfo } from '../../AppInfo';
import Application from '../../viewer/Model/Application/Application';
import Context from "../../Context";
declare class EditorController {
    appInfo: AppInfo;
    hostApp: BackHostApp;
    application: Application;
    constructor(appInfo: any, hostApp: any, application: any);
    init(context: Context): Promise<void>;
    getView(params: any): Promise<{
        view: any;
        data: {};
    }>;
    createApplicationEditor(): Promise<any>;
}
export = EditorController;
