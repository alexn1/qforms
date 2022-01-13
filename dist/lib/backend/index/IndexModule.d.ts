declare class IndexModule {
    hostApp: any;
    css: string[];
    js: string[];
    constructor(hostApp: any);
    init(): Promise<void>;
    fill(): Promise<{
        nodeEnv: any;
        appInfos: {
            fullName: string;
            envs: string[];
        }[];
    }>;
    getLinks(): any[];
    getScripts(): any[];
}
export = IndexModule;
