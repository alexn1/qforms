declare const Editor: any;
declare class PageLinkEditor extends Editor {
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
export = PageLinkEditor;
