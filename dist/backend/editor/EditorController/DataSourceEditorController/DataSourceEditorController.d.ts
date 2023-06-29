import { EditorController } from '../EditorController';
export declare class DataSourceEditorController extends EditorController {
    createDataSourceEditor(params: any): Promise<any>;
    _new(params: any): Promise<any>;
    delete(params: any): Promise<any>;
    moveUp(params: any): Promise<null>;
    moveDown(params: any): Promise<null>;
    save(params: any): Promise<null>;
    createModelBackJs(params: any): Promise<{
        js: any;
    }>;
    getView(params: any): Promise<{
        data: {};
    }>;
}
