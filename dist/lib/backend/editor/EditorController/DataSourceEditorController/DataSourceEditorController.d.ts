declare const EditorController: any;
declare class DataSourceEditorController extends EditorController {
    createDataSourceEditor(params: any): Promise<any>;
    _new(params: any): Promise<any>;
    delete(params: any): Promise<any>;
    moveUp(params: any): Promise<any>;
    moveDown(params: any): Promise<any>;
    save(params: any): Promise<any>;
    createModelBackJs(params: any): Promise<{
        js: any;
    }>;
    getView(params: any): Promise<any>;
}
export = DataSourceEditorController;
