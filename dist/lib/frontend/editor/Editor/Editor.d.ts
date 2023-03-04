export declare class Editor {
    data: any;
    parent: any;
    form: any;
    page: any;
    dataSources: any[];
    actions: any[];
    constructor(data: any, parent?: any);
    init(): void;
    getClassName(): any;
    getName(): any;
    getFullName(splitter?: string): any;
    setValue(name: any, value: any): Promise<void>;
    getAttr(name: any): any;
    getAttributes(): any;
    setAttr(name: any, value: any): void;
    removeDataSource(dataSource: any): void;
    removeAction(action: any): void;
}
