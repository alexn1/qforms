"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const JsonFile_1 = __importDefault(require("./JsonFile"));
const ApplicationEditor_1 = __importDefault(require("./editor/Editor/ApplicationEditor/ApplicationEditor"));
const BaseModel_1 = __importDefault(require("./BaseModel"));
class Converter {
    static async reformat(appFilePath) {
        console.log('Convert.reformat', appFilePath);
        const appFile = new JsonFile_1.default(appFilePath);
        await appFile.read();
        // app
        const appEditor = new ApplicationEditor_1.default(appFile);
        appEditor.reformat();
        await appEditor.save();
        // pages
        const pageNames = appEditor.data.pageLinks.map(data => BaseModel_1.default.getName(data));
        // console.log('pageNames:', pageNames);
        // const pageName = pageNames[0];
        for (const pageName of pageNames) {
            const pageEditor = await appEditor.getPage(pageName);
            pageEditor.reformat();
            await pageEditor.save();
        }
    }
}
module.exports = Converter;
