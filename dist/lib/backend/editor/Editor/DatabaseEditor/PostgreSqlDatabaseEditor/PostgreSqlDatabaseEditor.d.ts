declare const DatabaseEditor: any;
declare class PostgreSqlDatabaseEditor extends DatabaseEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': {
            name: any;
        };
        params: any[];
        tables: any[];
    };
}
export = PostgreSqlDatabaseEditor;
