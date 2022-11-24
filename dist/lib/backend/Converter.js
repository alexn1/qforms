"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converter = void 0;
const JsonFile_1 = require("./JsonFile");
const ApplicationEditor_1 = require("./editor/Editor/ApplicationEditor/ApplicationEditor");
const BaseModel_1 = require("./BaseModel");
class Converter {
    static async reformat(appFilePath) {
        console.log('Convert.reformat', appFilePath);
        const appFile = new JsonFile_1.JsonFile(appFilePath);
        await appFile.read();
        // app
        const appEditor = new ApplicationEditor_1.ApplicationEditor(appFile);
        appEditor.reformat();
        await appEditor.save();
        // pages
        const pageNames = appEditor.data.pageLinks.map(data => BaseModel_1.BaseModel.getName(data));
        // console.log('pageNames:', pageNames);
        // const pageName = pageNames[0];
        for (const pageName of pageNames) {
            const pageEditor = await appEditor.getPage(pageName);
            pageEditor.reformat();
            await pageEditor.save();
        }
    }
}
exports.Converter = Converter;
