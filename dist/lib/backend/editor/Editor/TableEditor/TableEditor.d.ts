declare const Editor: any;
export declare class TableEditor extends Editor {
    static createData(params: any): {
        '@class': string;
        '@attributes': {
            name: any;
        };
        columns: any[];
    };
    getColName(): string;
}
export {};
