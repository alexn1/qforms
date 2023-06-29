import { EditorController } from '../EditorController';
export declare class ActionEditorController extends EditorController {
    _new(params: any): Promise<any>;
    save(params: any): Promise<null>;
    delete(params: any): Promise<any>;
    moveUp(params: any): Promise<null>;
    moveDown(params: any): Promise<null>;
}
