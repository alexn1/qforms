import { EdModelController } from '../EdModelController';
import { FrontHostApp } from '../../../common';
import { EditorFrontHostApp } from '../../EditorFrontHostApp/EditorFrontHostApp';

export class EdParamController extends EdModelController {
    /*constructor(model, parent) {
        super(model, parent);
    }*/

    getActions() {
        return [{ action: 'delete', caption: 'Delete' }];
    }

    async doAction(name) {
        switch (name) {
            case 'delete':
                await this.delete();
                break;
        }
    }

    static async getView(view) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Param',
            action: 'getView',
            params: {
                view: view,
            },
        });
    }

    async delete() {
        await this.model.delete();
        this.parent.removeParam(this);
        EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }
}
