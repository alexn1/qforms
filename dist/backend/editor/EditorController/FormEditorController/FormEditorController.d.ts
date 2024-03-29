import { VisualEditorController } from '../VisualEditorController';
export declare class FormEditorController extends VisualEditorController {
    _new(params: any): Promise<any>;
    save(params: any): Promise<null>;
    delete(params: any): Promise<any>;
    moveUp(params: any): Promise<string>;
    moveDown(params: any): Promise<string>;
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
