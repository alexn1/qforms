import Context = require("../Context");
import BackHostApp = require('../BackHostApp');
declare class EditorModule {
    hostApp: BackHostApp;
    css: string[];
    js: string[];
    constructor(hostApp: BackHostApp);
    init(): Promise<void>;
    getLinks(): string[];
    getScripts(): string[];
    handleEditorGet(req: any, res: any, context: Context): Promise<void>;
    handleEditorPost(req: any, res: any, context: Context): Promise<void>;
}
export = EditorModule;
