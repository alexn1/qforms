declare const VisualEditorController: any;
declare class ApplicationEditorController extends VisualEditorController {
    save(params: any): Promise<any>;
    getView(params: any): Promise<any>;
    createController(params: any): Promise<{
        js: any;
    }>;
    createModelBackJs(params: any): Promise<{
        js: any;
    }>;
    saveController(params: any): Promise<any>;
}
export = ApplicationEditorController;
