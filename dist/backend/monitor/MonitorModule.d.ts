import { BackHostApp } from '../BackHostApp';
export declare class MonitorModule {
    hostApp: BackHostApp;
    css: string[];
    js: string[];
    constructor(hostApp: BackHostApp);
    init(): Promise<void>;
    fill(): {
        nodeEnv: import("../..").Nullable<string>;
        uptime: number;
        applications: {
            route: string;
            version: string | null;
            pages: {
                name: string;
            }[];
            clients: {
                uuid: any;
                userId: any;
                ip: any;
                version: any;
            }[];
        }[];
    };
    getLinks(): string[];
    getScripts(): string[];
    checkCredentials(req: any): boolean;
    authorize(req: any): boolean;
    render(): string;
}
