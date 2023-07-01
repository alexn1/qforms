import { FrontHostApp } from '../common';
export declare class LoginFrontHostApp extends FrontHostApp {
    private data;
    constructor(data: any);
    run(): Promise<void>;
    getText(): any;
    getData(): any;
}
