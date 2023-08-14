import { VisualEditorController } from '../VisualEditorController';
export declare class PageEditorController extends VisualEditorController {
    get(params: any): Promise<any>;
    save(params: any): Promise<null>;
    _new(params: any): Promise<{
        page: import("../../../common/Scheme/PageScheme").PageScheme;
        pageLink: import("../../../common/Scheme/PageLinkScheme").PageLinkScheme;
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
