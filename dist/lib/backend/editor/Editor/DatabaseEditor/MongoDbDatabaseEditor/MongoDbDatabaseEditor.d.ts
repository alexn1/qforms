import { DatabaseEditor } from '../DatabaseEditor';
export declare class MongoDbDatabaseEditor extends DatabaseEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': any;
        params: any[];
        tables: any[];
    };
}
