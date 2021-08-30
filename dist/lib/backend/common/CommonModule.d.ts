import BackHostApp from '../BackHostApp';
declare class CommonModule {
    backHostApp: BackHostApp;
    css: string[];
    js: string[];
    constructor(backHostApp: BackHostApp);
    init(): Promise<void>;
}
export = CommonModule;
