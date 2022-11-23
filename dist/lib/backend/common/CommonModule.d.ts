import BackHostApp = require('../BackHostApp');
declare class CommonModule {
    hostApp: BackHostApp;
    css: string[];
    js: string[];
    constructor(hostApp: BackHostApp);
    init(): Promise<void>;
}
export = CommonModule;
