declare const Editor: any;
declare class ColumnEditor extends Editor {
    static createData(params: any): {
        '@class': string;
        '@attributes': {
            name: any;
            caption: any;
            type: any;
            dbType: any;
            key: string;
            auto: string;
            nullable: string;
        };
    };
    getColName(): string;
}
export = ColumnEditor;
