declare const Editor: any;
declare class KeyColumnEditor extends Editor {
    static createData(params: any): {
        '@class': string;
        '@attributes': {
            name: any;
        };
    };
    getColName(): string;
}
export = KeyColumnEditor;
