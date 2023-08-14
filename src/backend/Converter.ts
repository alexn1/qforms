import path from 'path';
import { JsonFile } from './JsonFile';
import { ApplicationEditor } from './editor/Editor/ApplicationEditor/ApplicationEditor';
import { BaseModel } from './BaseModel';
import { BkModelScheme } from './common/BkModelScheme/BkModelScheme';
import { debug } from '../console';

const BACKEND_DIR_PATH = path.join(__dirname, 'backend');

export class Converter {
    static async reformat(appFilePath: string) {
        debug('Convert.reformat', appFilePath);
        const appFile = new JsonFile(appFilePath);
        await appFile.read();

        // app
        const appEditor = new ApplicationEditor(appFile, path.join(BACKEND_DIR_PATH, 'editor'));
        appEditor.reformat();
        await appEditor.save();

        // pages
        const pageNames = appEditor
            .getData()
            .pageLinks.map((data: BkModelScheme) => BaseModel.getName(data));
        // debug('pageNames:', pageNames);
        // const pageName = pageNames[0];
        for (const pageName of pageNames) {
            const pageEditor = await appEditor.getPage(pageName);
            pageEditor.reformat();
            await pageEditor.save();
        }
    }
}
