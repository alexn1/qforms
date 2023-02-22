import { BackHostApp } from '../BackHostApp';
export declare class IndexModule {
    hostApp: BackHostApp;
    css: string[];
    js: string[];
    constructor(hostApp: BackHostApp);
    init(): Promise<void>;
    fill(): Promise<{
        nodeEnv: string;
        appInfos: {
            fullName: string;
            envs: string[];
        }[];
    }>;
    getLinks(): string[];
    getScripts(): string[];
    render(): Promise<string>;
}
