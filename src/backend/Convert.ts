import JsonFile from './JsonFile';
import ApplicationEditor from './editor/Editor/ApplicationEditor/ApplicationEditor';
import BaseModel from './BaseModel';
import FormEditor from "./editor/Editor/FormEditor/FormEditor";

class Convert {
    static async convert(appFilePath) {
        console.log('Convert.convert', appFilePath);
        const appFile = new JsonFile(appFilePath);
        await appFile.read();
        const appEditor = new ApplicationEditor(appFile);
        // console.log('data:', appEditor.data);

        const pageNames = appEditor.data.pageLinks.map(data => BaseModel.getName(data));
        // console.log('pageNames:', pageNames);
        for (const pageName of pageNames) {
            const pageEditor = await appEditor.getPage(pageName);
            const formNames = pageEditor.data.forms.map(data => BaseModel.getName(data));
            // console.log('formNames:', formNames);
            for (const formName of formNames) {
                const formEditor: FormEditor = pageEditor.createItemEditor('forms', formName);
                const fieldNames = formEditor.data.fields.map(data => BaseModel.getName(data));
                // console.log('fieldNames:', fieldNames);
                for (const fieldName of fieldNames) {
                    console.log(`${pageName}.${formName}.${fieldName}`);
                    const fieldEditor = formEditor.createItemEditor('fields', fieldName);
                    // console.log('oldData:', fieldEditor.data);
                    const newData = fieldEditor.reformat();
                    // console.log('newData:', newData);
                }
            }
            await pageEditor.save();
        }
    }
}

export = Convert;
