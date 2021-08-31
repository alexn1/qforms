import JsonFile from './JsonFile';
import ApplicationEditor from './editor/Editor/ApplicationEditor/ApplicationEditor';

class Convert {
    static async convert(appFilePath) {
        console.log('Convert.convert', appFilePath);
        const appFile = new JsonFile(appFilePath);
        await appFile.read();
        const appEditor = new ApplicationEditor(appFile);
    }
}

export = Convert;
