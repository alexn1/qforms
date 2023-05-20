export declare class EdModelController {
    model: any;
    parent: any;
    view: any;
    constructor(model: any, parent?: any);
    init(): void;
    getTitle(): any;
    getStyle(): {};
    getPropList(): {
        list: any;
        options: {};
    };
    setProperty(name: any, value: any): Promise<void>;
    doAction(name: any): Promise<void>;
    getDocumentViewClass(): any;
    moveColItem(colName: any, item: any, offset: any): void;
}
