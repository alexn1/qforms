declare const EditorController: any;
declare class KeyColumnEditorController extends EditorController {
    _new(params: any): Promise<any>;
    save(params: any): Promise<any>;
    delete(params: any): Promise<any>;
}
export = KeyColumnEditorController;
