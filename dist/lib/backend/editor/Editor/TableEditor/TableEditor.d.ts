declare const Editor: any;
declare class TableEditor extends Editor {
    static createData(params: any): {
        '@class': string;
        '@attributes': {
            name: any;
        };
        columns: any[];
    };
    newColumnData(params: any): any;
    createColumnEditor(name: any): any;
}
export = TableEditor;
