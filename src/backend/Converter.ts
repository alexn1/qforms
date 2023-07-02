import { JsonFile } from './JsonFile';
import { ApplicationEditor } from './editor/Editor/ApplicationEditor/ApplicationEditor';
import { BaseModel } from './BaseModel';
import { BkModelData } from './viewer/BkModelData/BkModelData';

export class Converter {
    static async reformat(appFilePath: string) {
        console.log('Convert.reformat', appFilePath);
        const appFile = new JsonFile(appFilePath);
        await appFile.read();

        // app
        const appEditor = new ApplicationEditor(appFile);
        appEditor.reformat();
        await appEditor.save();

        // pages
        const pageNames = appEditor
            .getData()
            .pageLinks.map((data: BkModelData) => BaseModel.getName(data));
        // console.log('pageNames:', pageNames);
        // const pageName = pageNames[0];
        for (const pageName of pageNames) {
            const pageEditor = await appEditor.getPage(pageName);
            pageEditor.reformat();
            await pageEditor.save();
        }
    }
}
