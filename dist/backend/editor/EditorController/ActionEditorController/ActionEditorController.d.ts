import { EditorController } from '../EditorController';
export declare class ActionEditorController extends EditorController {
    _new(params: any): Promise<any>;
    save(params: any): Promise<any>;
    delete(params: any): Promise<any>;
    moveUp(params: any): Promise<any>;
    moveDown(params: any): Promise<any>;
}
