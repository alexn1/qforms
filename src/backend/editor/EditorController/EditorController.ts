import path from 'path';
import { BackHostApp } from '../../BackHostApp';
import { ApplicationEditor } from '../Editor/ApplicationEditor/ApplicationEditor';
import { AppInfo } from '../../AppInfo';
import { Context } from '../../Context';

export class EditorController {
    constructor(public appInfo: AppInfo, public hostApp: BackHostApp) {}

    async init(context: Context) {}

    async getView(params) {
        console.debug('EditorController.getView');
        return {
            data: {},
        };
    }

    createApplicationEditor() {
        console.debug('EditorController.createApplicationEditor');
        return new ApplicationEditor(
            this.appInfo.appFile,
            path.join(this.hostApp.backendDirPath, 'editor'),
        );
    }
}
