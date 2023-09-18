import { BackHostApp } from './BackHostApp';
export declare class Router {
    private hostApp;
    constructor(hostApp: BackHostApp);
    createRoutes(): void;
}
