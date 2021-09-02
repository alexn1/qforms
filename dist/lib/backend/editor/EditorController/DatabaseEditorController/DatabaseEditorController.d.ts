import Context from "../../../Context";
declare const EditorController: any;
declare class DatabaseEditorController extends EditorController {
    init(context: Context): Promise<void>;
    _new(params: any): Promise<any>;
    save(params: any): Promise<string>;
    delete(params: any): Promise<any>;
    getView(params: any): Promise<any>;
    getTableInfo(params: any): Promise<{
        tableInfo: any;
    }>;
    moveUp(params: any): Promise<string>;
    moveDown(params: any): Promise<string>;
}
export = DatabaseEditorController;
