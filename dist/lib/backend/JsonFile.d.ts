declare class JsonFile {
    filePath: string;
    content: string;
    data: any;
    constructor(filePath: any, data?: any);
    create(): Promise<void>;
    read(): Promise<void>;
    save(): Promise<void>;
    getAttr(name: any): any;
}
export = JsonFile;
