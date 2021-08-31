declare const EditorController: any;
declare class ColumnEditorController extends EditorController {
    save(params: any): Promise<any>;
    _new(params: any): Promise<any>;
    delete(params: any): Promise<any>;
}
export = ColumnEditorController;
