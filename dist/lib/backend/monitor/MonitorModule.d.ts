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
            clients: any;
        }[];
    };
    getLinks(): string[];
    getScripts(): string[];
    checkCredentials(req: any): boolean;
    authorize(req: any): boolean;
}
export = MonitorModule;
