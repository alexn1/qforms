import BackHostApp from '../BackHostApp';
declare class MonitorModule {
    backHostApp: BackHostApp;
    css: string[];
    js: string[];
    constructor(backHostApp: BackHostApp);
    init(): Promise<void>;
    fill(): {
        nodeEnv: string;
        uptime: number;
        applications: {
            route: string;
            version: any;
            pages: {
                name: string;
            }[];
        }[];
    };
    getLinks(): string[];
    getScripts(): string[];
}
export = MonitorModule;
