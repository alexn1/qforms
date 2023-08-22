import { Nullable } from '../types';
export declare class JsonFile {
    filePath: string;
    data: any;
    content: Nullable<string>;
    constructor(filePath: string, data?: any);
    create(): Promise<void>;
    read(): Promise<void>;
    save(): Promise<void>;
    getAttr(name: string): string;
}
