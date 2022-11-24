import { VisualEditorController } from '../VisualEditorController';
declare class PageEditorController extends VisualEditorController {
    get(params: any): Promise<any>;
    save(params: any): Promise<any>;
    _new(params: any): Promise<{
        page: {
            '@class': string;
            '@attributes': {
                formatVersion: string;
                name: any;
                caption: any;
                cssBlock: any;
                viewClass: any;
            };
            dataSources: any[];
            actions: any[];
            forms: any[];
        };
        pageLink: any;
    }>;
    delete(params: any): Promise<any>;
    getView(params: any): Promise<{
        data: {};
    }>;
    createController(params: any): Promise<{
        js: any;
    }>;
    createView(params: any): Promise<{
        jsx: any;
    }>;
    createStyle(params: any): Promise<{
        less: any;
    }>;
    saveController(params: any): Promise<{
        js: any;
    }>;
    createModelBackJs(params: any): Promise<{
        js: any;
    }>;
}
export = PageEditorController;
