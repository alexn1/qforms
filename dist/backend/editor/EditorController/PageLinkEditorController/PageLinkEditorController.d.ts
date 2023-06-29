import { EditorController } from '../EditorController';
export declare class PageLinkEditorController extends EditorController {
    save(params: any): Promise<null>;
    moveUp(params: any): Promise<string>;
    moveDown(params: any): Promise<string>;
}
