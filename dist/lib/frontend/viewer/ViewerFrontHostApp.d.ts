import { FrontHostApp } from '../common';
export declare class ViewerFrontHostApp extends FrontHostApp {
    options: any;
    applicationController: any;
    constructor(options?: any);
    run(): Promise<void>;
    onWindowPopState(e: any): Promise<void>;
    logError(err: any): void;
    getData(): any;
    alert(options: any): Promise<unknown>;
    confirm(options: any): Promise<unknown>;
}
