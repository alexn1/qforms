import Context from "../Context";
import BackHostApp from '../BackHostApp';
declare class EditorModule {
    backHostApp: BackHostApp;
    css: string[];
    js: string[];
    constructor(backHostApp: BackHostApp);
    init(): Promise<void>;
    getLinks(): string[];
    getScripts(): string[];
    handleEditorGet(req: any, res: any, context: Context): Promise<void>;
}
export = EditorModule;
