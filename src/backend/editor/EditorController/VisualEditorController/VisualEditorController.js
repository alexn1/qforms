'use strict';

const path = require('path');
const qforms           = require('../../../qforms');
const EditorController = require('../EditorController');

class VisualEditorController extends EditorController {

    async getView(params) {
        console.log('VisualEditorController.getView');
        const result = await super.getView(params);
        if (params.view === 'VisualView.html') {
            const viewFilePath = path.join(
                this.hostApp.publicDirPath,
                'editor/class/Controller/ModelController/DocumentController/VisualController/view/VisualView.html'
            );
            result.view = await qforms.Helper.readFile(viewFilePath);
        }
        return result;
    }

}

module.exports = VisualEditorController;
