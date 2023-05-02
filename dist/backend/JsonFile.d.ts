export declare class JsonFile {
    filePath: string;
    data: any;
    content: string | null;
    constructor(filePath: string, data?: any);
    create(): Promise<void>;
    read(): Promise<void>;
    save(): Promise<void>;
    getAttr(name: any): string;
}
