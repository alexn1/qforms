import BackHostApp from '../BackHostApp';
declare class ViewerModule {
    backHostApp: BackHostApp;
    css: string[];
    js: string[];
    constructor(backHostApp: BackHostApp);
    init(): Promise<void>;
    getLinks(): string[];
    getScripts(): string[];
}
export = ViewerModule;
