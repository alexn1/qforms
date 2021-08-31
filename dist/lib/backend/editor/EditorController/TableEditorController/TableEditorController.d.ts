declare const EditorController: any;
declare class TableEditorController extends EditorController {
    _new(params: any): Promise<any>;
    delete(params: any): Promise<any>;
    moveUp(params: any): Promise<any>;
    moveDown(params: any): Promise<any>;
}
export = TableEditorController;
