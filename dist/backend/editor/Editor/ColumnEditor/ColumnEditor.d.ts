import { Editor } from '../Editor';
export declare class ColumnEditor extends Editor {
    static createData(params: any): {
        '@class': string;
        '@attributes': {
            name: any;
            caption: any;
            type: any;
            dbType: any;
            key: any;
            auto: any;
            nullable: any;
        };
    };
    getColName(): string;
}
