import { Context } from "../../../Context";
import { Application } from "../../../viewer/Model/Application/Application";
import { EditorController } from '../EditorController';
export declare class DatabaseEditorController extends EditorController {
    application: Application;
    init(context: Context): Promise<void>;
    _new(params: any): Promise<any>;
    save(params: any): Promise<string>;
    delete(params: any): Promise<any>;
    getView(params: any): Promise<{
        data: {};
    }>;
    getTableInfo(params: any): Promise<{
        tableInfo: any[];
    }>;
    moveUp(params: any): Promise<string>;
    moveDown(params: any): Promise<string>;
}
