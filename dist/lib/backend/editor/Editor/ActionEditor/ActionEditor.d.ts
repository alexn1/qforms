declare const Editor: any;
export declare class ActionEditor extends Editor {
    static createData(params: any): {
        '@class': string;
        '@attributes': {
            name: any;
            caption: any;
        };
    };
    getColName(): string;
}
export {};
