import { AppInfo } from '../../AppInfo';
import Application from '../../viewer/Model/Application/Application';
declare class EditorController {
    appInfo: AppInfo;
    application: Application;
    constructor(appInfo: any, hostApp: any, application: any);
    getView(params: any): Promise<{
        view: any;
        data: {};
    }>;
    createApplicationEditor(): Promise<any>;
}
export = EditorController;
