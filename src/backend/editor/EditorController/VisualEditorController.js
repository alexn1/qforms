const EditorController = require('./EditorController');

class VisualEditorController extends EditorController {

    /*async getView(params) {
        console.log('VisualEditorController.getView');
        const result = await super.getView(params);
        if (params.view === 'VisualView.html') {
            const viewFilePath = path.join(
                this.hostApp.publicDirPath,
                'editor/class/Controller/ModelController/DocumentController/VisualController/view/VisualView.html'
            );
            result.view = await Helper.readTextFile(viewFilePath);
        }
        return result;
    }*/

}

module.exports = VisualEditorController;
