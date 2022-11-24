import { BackHostApp } from "../../BackHostApp";
import { ApplicationEditor } from '../Editor/ApplicationEditor/ApplicationEditor';
import { AppInfo } from '../../AppInfo';
import { Context } from "../../Context";
export declare class EditorController {
    appInfo: AppInfo;
    hostApp: BackHostApp;
    constructor(appInfo: AppInfo, hostApp: BackHostApp);
    init(context: Context): Promise<void>;
    getView(params: any): Promise<{
        data: {};
    }>;
    createApplicationEditor(): ApplicationEditor;
}
