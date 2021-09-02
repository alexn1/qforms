"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const JsonFile_1 = __importDefault(require("./JsonFile"));
const ApplicationEditor_1 = __importDefault(require("./editor/Editor/ApplicationEditor/ApplicationEditor"));
class Convert {
    static async convert(appFilePath) {
        console.log('Convert.convert', appFilePath);
        const appFile = new JsonFile_1.default(appFilePath);
        await appFile.read();
        const appEditor = new ApplicationEditor_1.default(appFile);
        appEditor.data = appEditor.appFile.data = ApplicationEditor_1.default.createData(Object.assign(Object.assign({}, appEditor.attributes()), { env: appEditor.data.env, databases: appEditor.data.databases, dataSources: appEditor.data.dataSources, actions: appEditor.data.actions, pageLinks: appEditor.data.pageLinks }));
        await appEditor.save();
        /*const pageNames = appEditor.data.pageLinks.map(data => BaseModel.getName(data));
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
        }*/
    }
}
module.exports = Convert;
