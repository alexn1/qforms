import { Editor } from '../Editor';
export declare class PageLinkEditor extends Editor {
    static createData(params: any): {
        '@class': string;
        '@attributes': {
            name: any;
            fileName: any;
            menu: any;
            startup: any;
        };
    };
    getColName(): string;
}
