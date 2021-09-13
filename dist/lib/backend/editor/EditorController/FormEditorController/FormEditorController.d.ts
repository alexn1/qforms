declare const VisualEditorController: any;
declare class FormEditorController extends VisualEditorController {
    _new(params: any): Promise<any>;
    save(params: any): Promise<any>;
    delete(params: any): Promise<any>;
    moveUp(params: any): Promise<string>;
    moveDown(params: any): Promise<string>;
    getView(params: any): Promise<any>;
    createController(params: any): Promise<{
        js: any;
    }>;
    saveController(params: any): Promise<any>;
    createModelBackJs(params: any): Promise<{
        js: any;
    }>;
}
export = FormEditorController;
