declare const Editor: any;
declare class DatabaseEditor extends Editor {
    static createData(params: any): void;
    getColName(): string;
}
export = DatabaseEditor;
