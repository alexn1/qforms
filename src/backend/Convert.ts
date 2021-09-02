import JsonFile from './JsonFile';
import ApplicationEditor from './editor/Editor/ApplicationEditor/ApplicationEditor';
import BaseModel from './BaseModel';
import FormEditor from './editor/Editor/FormEditor/FormEditor';
import PageEditor from "./editor/Editor/PageEditor/PageEditor";

class Convert {
    static async convert(appFilePath) {
        console.log('Convert.convert', appFilePath);
        const appFile = new JsonFile(appFilePath);
        await appFile.read();

        // app
        const appEditor = new ApplicationEditor(appFile);
        appEditor.reformat();
        await appEditor.save();

        // pages
        const pageNames = appEditor.data.pageLinks.map(data => BaseModel.getName(data));
        // console.log('pageNames:', pageNames);
        // const pageName = pageNames[0];
        for (const pageName of pageNames) {
            const pageEditor = await appEditor.getPage(pageName);
            pageEditor.reformat();
            await pageEditor.save();
        }
    }
}

export = Convert;
