declare class IndexModule {
    backHostApp: any;
    css: string[];
    js: string[];
    constructor(backHostApp: any);
    init(): Promise<void>;
    fill(): Promise<{
        nodeEnv: any;
        appInfos: {
            fullName: any;
            envs: any;
        }[];
    }>;
    getLinks(): any[];
    getScripts(): any[];
}
export = IndexModule;
