declare const Editor: any;
declare class ActionEditor extends Editor {
    static createData(params: any): {
        '@class': string;
        '@attributes': {
            name: any;
            caption: any;
        };
    };
}
export = ActionEditor;
