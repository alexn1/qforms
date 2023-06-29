import { VisualEditorController } from '../VisualEditorController';
export declare class FieldEditorController extends VisualEditorController {
    _new(params: any): Promise<any>;
    save(params: any): Promise<null>;
    delete(params: any): Promise<any>;
    changeClass(params: any): Promise<any>;
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
    moveUp(params: any): Promise<string>;
    moveDown(params: any): Promise<string>;
}
