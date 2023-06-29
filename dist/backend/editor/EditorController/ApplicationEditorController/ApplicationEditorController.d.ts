import { VisualEditorController } from '../VisualEditorController';
export declare class ApplicationEditorController extends VisualEditorController {
    save(params: any): Promise<null>;
    getView(params: any): Promise<{
        data: {};
    }>;
    createController(params: any): Promise<{
        js: any;
    }>;
    createModelBackJs(params: any): Promise<{
        js: any;
    }>;
    saveController(params: any): Promise<{
        js: any;
    }>;
}
