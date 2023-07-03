import { EditorController } from './EditorController';

export class VisualEditorController extends EditorController {
    /* async getView(params) {
        console.debug('VisualEditorController.getView');
        const result = await super.getView(params);
        if (params.view === 'VisualView.html') {
            const viewFilePath = path.join(
                this.hostApp.getFrontendDirPath(),
                'editor/class/Controller/ModelController/DocumentController/VisualController/view/VisualView.html'
            );
            result.view = await BkHelper.readTextFile(viewFilePath);
        }
        return result;
    } */
}
