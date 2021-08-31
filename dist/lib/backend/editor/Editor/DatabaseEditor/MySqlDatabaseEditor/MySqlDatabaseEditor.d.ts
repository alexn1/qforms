declare const DatabaseEditor: any;
declare class MySqlDatabaseEditor extends DatabaseEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': {
            name: any;
        };
        params: any[];
        tables: any[];
    };
}
export = MySqlDatabaseEditor;
