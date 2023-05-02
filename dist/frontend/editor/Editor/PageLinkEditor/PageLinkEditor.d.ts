import { Editor } from '../Editor';
export declare class PageLinkEditor extends Editor {
    application: any;
    constructor(data: any, parent: any);
    setValue(name: any, value: any): Promise<any>;
    moveUp(): Promise<any>;
    moveDown(): Promise<any>;
    getFileName(): any;
    remove(): void;
}
