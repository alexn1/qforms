declare const Editor: any;
declare class ParamEditor extends Editor {
    static createData(params: any): {
        '@class': string;
        '@attributes': {
            name: any;
            value: any;
        };
    };
}
export = ParamEditor;
