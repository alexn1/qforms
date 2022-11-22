declare const EditorController: any;
declare class PageLinkEditorController extends EditorController {
    save(params: any): Promise<any>;
    moveUp(params: any): Promise<string>;
    moveDown(params: any): Promise<string>;
}
export = PageLinkEditorController;
