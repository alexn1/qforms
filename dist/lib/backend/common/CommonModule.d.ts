import { BackHostApp } from '../BackHostApp';
export declare class CommonModule {
    hostApp: BackHostApp;
    css: string[];
    js: string[];
    constructor(hostApp: BackHostApp);
    init(): Promise<void>;
}
